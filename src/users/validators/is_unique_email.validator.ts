import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsersService } from "../users.service";
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({async:true})
@Injectable()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface{

    constructor(private readonly userService:UsersService){}

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const user=await this.userService.findByEmail(email)
        if(!user){
            return true
        }
        return false
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `Email already exist`
    }
    
}