import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly userEntityManager:EntityManager
  ){}


  async create(createUserDto: CreateUserDto) {
    const newUser=new User(createUserDto)
    return await this.userEntityManager.save(newUser)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({where:{id}})
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user= await this.userRepository.findOneBy({id})
    if(!user){
      return "User not found!"
    }
    Object.assign(user,updateUserDto)
    await this.userEntityManager.save(user)
    return "User saved"
  }

  async remove(id: number) {
    await this.userRepository.delete(+id)
  }

  async findByEmail(email:string){
    return await this.userRepository.findOne({where:{email}})
  }
}
