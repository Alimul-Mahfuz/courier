import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AbstractEntity<T>{
    @PrimaryGeneratedColumn()
    id:number

    constructor(item:Partial<T>){
        Object.assign(this,item)
    }
}