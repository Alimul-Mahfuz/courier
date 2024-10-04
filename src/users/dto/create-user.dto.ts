import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { IsUniqueEmail } from "../decorators/is_unique_email.decorator";
import { UserType } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name:string

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsUniqueEmail({message:"duplicate email"})
    email:string

    phone:string

    user_type:UserType



}
