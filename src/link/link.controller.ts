import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LinkService } from './link.service';
import type { Response } from 'express';
import { CreateLinkDto } from './dto/create-link.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';

@Controller('links')
@UseGuards(JwtAuthGuard) // garante que req.user esteja definido
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Post()
  create(@Request() req: any, @Body() dto: CreateLinkDto) {
    // req.user é definido pelo JwtAuthGuard
    return this.linkService.createLink(
      req.user.userId,
      dto.originalUrl,
      dto.alternativeUrls,
      dto.weights,
    );
  }

  @Get()
  getAll(@Request() req: any) {
    return this.linkService.getLinks(req.user.userId);
  }

  @Get(':id/metrics')
  getMetrics(@Request() req: any, @Param('id') id: string) {
    return this.linkService.getMetrics(req.user.userId, id);
  }

  @Get(':id/rotate')
  @Public()
  async rotate(@Param('id') id: string, @Res() res: Response) {
    const url = await this.linkService.rotate(id);
    return res.redirect(url);
  }
}
