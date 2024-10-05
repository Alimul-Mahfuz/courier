import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { IsUniqueConstraintInput } from "./is-unique";
import { EntityManager } from "typeorm";

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {

    constructor(private readonly entityManager: EntityManager) { }


    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const { tablename, column }: IsUniqueConstraintInput = validationArguments.constraints[0]
        const record = await this.entityManager.getRepository(tablename).createQueryBuilder(tablename).where({ [column]: value }).getExists()
        return !record

    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "The email is exist already"
    }

}