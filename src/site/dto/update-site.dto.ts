import { PartialType } from '@nestjs/mapped-types';
import { CreateSiteDto } from './create-site.dto';

export class UpdateSiteDto extends PartialType(CreateSiteDto) {
    fio : string
    description:string
    achivements:string[]
    fotos:string[]
    adminLogin:string


}
