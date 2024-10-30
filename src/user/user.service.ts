import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prismaService';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from "bcrypt"
import { NotFoundError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma:PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService
  ){}

  private async generateTokens(login:string) {
    console.log(process.env.JWT_SECRET)
    const access = await this.jwt.signAsync({
        login
    }, {
        expiresIn: this.config.get("JWT_ACCESS_EXPIRES")
    })

    const refresh = await this.jwt.signAsync({
        login
    }, {
        expiresIn: this.config.get("JWT_REFRESH_EXPIRES")
    })

    return { access, refresh }
  }


  async registration(user: CreateUserDto) {

    const isUser = await this.prisma.user.findUnique({
      where:{
        login:user.login
      }
    })
    console.log(isUser)
    

    if(isUser){
      throw new BadRequestException("Такой логин занят")
    }
    console.log("48",user)
    await this.prisma.user.create({
      data:{
        login:user.login,
        password:bcrypt.hashSync(user.password,12)
      }
    })

    return this.generateTokens(user.login)
  }

  async login(user:CreateUserDto){
    console.log(process.env)
    const findUser = await this.prisma.user.findUnique({
      where:{
        login:user.login
      }
    })
    console.log(user)
    if(findUser && await bcrypt.compareSync(user.password,findUser.password,12)){
      return this.generateTokens(user.login)
    }
    throw new NotFoundException("Неправильный логин или пароль")
  }

  async getUserInfo(request: any) {
    const token = request.headers.authorization.split("Bearer ").join("")
    const login = await this.jwt.decode(token).login
    const site = await this.prisma.site.findUnique({
      where:{
        adminLogin:login
      }
    })
    if(!site){
      return{
        siteIsCreated : false
      }
    }
    return {
      siteIsCreated : true,
      siteId :site.id,
      userCount: site.usersCount
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
