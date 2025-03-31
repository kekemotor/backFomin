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



  async liked(createSiteDto: {site:number, material:number, count:number}) {
      const site = await this.prisma.findUnique({
        where:{
          id:createSiteDto.site
        }
      })
      console.log(site)
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
    console.log( await this.prisma.site.findUnique({
      where:{
        id:id
      }
    }))
    await this.prisma.site.update({
      where: {
        id:id
      },
      data: {
        usersCount: {
          increment: 1
        }
      }
    });
    return await this.prisma.site.findUnique({
      where:{
        id:id
      }
    })
  }

  async update(req, updateSiteDto: UpdateSiteDto) {
    console.log(updateSiteDto)
    const token = req.headers.authorization.split("Bearer ").join("")
    console.log(token, req.headers)
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
        achivenments:updateSiteDto.achivenments,
        adminLogin:login
      }})
      return
    }
    await this.prisma.site.update({
      data:{
        fotos:updateSiteDto.fotos,
        fio:updateSiteDto.fio,
        description:updateSiteDto.description,
        achivenments:updateSiteDto.achivenments,
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
