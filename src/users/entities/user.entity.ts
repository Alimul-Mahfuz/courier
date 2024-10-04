import { AbstractEntity } from "src/database/abstractEntity .entity";
import { Column, Entity, Unique } from "typeorm";

export enum UserType{
    ADMIN='ADMIN',
    USER='USER'
}

@Entity()
export class User extends AbstractEntity<User> {
    @Column()
    name:string

    @Unique(['email'])
    @Column({length:35,nullable:false})
    email:string

    @Column()
    phone:string

    @Column({
        type:'enum',
        enum:UserType,
        default:UserType.USER
    })
    user_type:UserType
}
