import { Req,Controller, Get, Post, Body, Put, Param, Delete, } from '@nestjs/common';
import { SiteService } from './site.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  @Post()
  create(@Body() createSiteDto: CreateSiteDto) {
    return this.siteService.create(createSiteDto);
  }

  @Get("getToEdit")
  getToEdit(@Req() req:Request) {
    return this.siteService.getToEdit(req);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.siteService.findOne(+id);
  }

  @Put('')
  update(@Body() updateSiteDto: UpdateSiteDto, @Req() req:Request) {
    return this.siteService.update(req,updateSiteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.siteService.remove(+id);
  }
}
