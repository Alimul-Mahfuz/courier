
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { IsUniqueConstraint } from './unique-constraint';

export type IsUniqueConstraintInput={
    tablename:string
    column:string
}

export function IsUnique(isUniqueConstraintInput:IsUniqueConstraintInput,validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'is-unique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints:[isUniqueConstraintInput],
      validator:IsUniqueConstraint
    });
  };
}