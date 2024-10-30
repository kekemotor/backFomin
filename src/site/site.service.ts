import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prismaService';

@Injectable()
export class SiteService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma : PrismaService
  )
  {}
  create(createSiteDto: CreateSiteDto) {
    return 'This action adds a new site';
  }

  async getToEdit(req:any) {
    const token = req.headers.authorization.split("Bearer ").join("")
    const login = await this.jwt.decode(token).login

    const site = await this.prisma.site.findUnique({
      where:{
        adminLogin:login
      }
    })
    if(!site){
      return {
        fotos:[],
        fio:'',
        description:'',
        achievements:[]
      }
    }
    return site
  }

  async findOne(id: number) {
    console.log("awa",
      await this.prisma.site.findUnique({
        where:{
          id:id
        }
      })
    )
    return await this.prisma.site.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(req, updateSiteDto: UpdateSiteDto) {
    const token = req.headers.authorization.split("Bearer ").join("")
    const login = await this.jwt.decode(token).login
    
    const site = await this.prisma.site.findUnique({
      where:{
        adminLogin:login
      }
    })
    console.log(site)
    if(!site){  
      console.log(updateSiteDto)
      await this.prisma.site.create({data:{
        fotos:updateSiteDto.fotos,
        fio:updateSiteDto.fio,
        description:updateSiteDto.description,
        achivenments:updateSiteDto.achievements,
        adminLogin:login
      }})
      return
    }
    await this.prisma.site.update({
      data:{
        fotos:updateSiteDto.fotos,
        fio:updateSiteDto.fio,
        description:updateSiteDto.description,
        achivenments:updateSiteDto.achievements,
        adminLogin:login
      },
      where:{
        adminLogin:login
      }
    })
  }

  remove(id: number) {
    return `This action removes a #${id} site`;
  }
}
