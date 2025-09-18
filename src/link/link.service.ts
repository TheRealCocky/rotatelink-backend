import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async createLink(
    userId: string,
    originalUrl: string,
    alternativeUrls: string[],
    weights?: number[],
  ) {
    const finalWeights =
      weights?.length === alternativeUrls.length
        ? weights
        : alternativeUrls.map(() => 1);
    return this.prisma.link.create({
      data: {
        userId,
        originalUrl,
        alternativeUrls,
        weights: finalWeights,
        clicksPerUrl: finalWeights.map(() => 0),
      },
    });
  }

  async getLinks(userId: string) {
    return this.prisma.link.findMany({ where: { userId } });
  }

  async getMetrics(userId: string, linkId: string) {
    const link = await this.prisma.link.findFirst({
      where: { id: linkId, userId },
    });
    if (!link) throw new NotFoundException('Link não encontrado');

    return {
      id: link.id,
      originalUrl: link.originalUrl,
      alternativeUrls: link.alternativeUrls ?? [],
      clicksPerUrl: link.clicksPerUrl ?? [],
      weights: link.weights ?? [],
      accessCount: link.accessCount ?? 0,
      createdAt: link.createdAt,
      updatedAt: link.updatedAt,
    };
  }


  async rotate(linkId: string) {
    const link = await this.prisma.link.findUnique({ where: { id: linkId } });
    if (!link) throw new NotFoundException('Link não encontrado');

    // Escolher link baseado em pesos
    const totalWeight = link.weights.reduce((a, b) => a + b, 0);
    let rnd = Math.floor(Math.random() * totalWeight);
    let chosenIndex = 0;
    for (let i = 0; i < link.weights.length; i++) {
      rnd -= link.weights[i];
      if (rnd < 0) {
        chosenIndex = i;
        break;
      }
    }

    // Atualizar métricas
    link.accessCount += 1;
    link.clicksPerUrl[chosenIndex] += 1;

    await this.prisma.link.update({
      where: { id: link.id },
      data: { accessCount: link.accessCount, clicksPerUrl: link.clicksPerUrl },
    });

    return link.alternativeUrls[chosenIndex];
  }
}
