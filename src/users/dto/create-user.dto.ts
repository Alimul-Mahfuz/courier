import { IsEmail, IsNotEmpty, IsString, Validate } from "class-validator";
import { UserType } from "../entities/user.entity";
import { IsUnique } from "src/shared/validation/is-unique";
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsUnique({tablename:"user",column:"email"})
    email:string

    phone:string

    user_type:UserType



}
