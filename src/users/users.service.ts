import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userEntityManager: EntityManager
  ) { }


  async create(createUserDto: CreateUserDto) {
    const newUser = new User(createUserDto)
    return await this.userEntityManager.save(newUser)
  }


  async findAll(page: number, limit: number) {
    const [result, total] = await this.userRepository.findAndCount({
      take: limit, 
      skip: (page - 1) * limit,
    });
  
    return {
      data: result,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
  

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      return "User not found!"
    }
    Object.assign(user, updateUserDto)
    await this.userEntityManager.save(user)
    return "User saved"
  }

  async remove(id: number) {
    await this.userRepository.delete(+id)
  }

  async bulkUserCreate(createUserDtos:CreateUserDto[]){

    if(createUserDtos.length===0){
      return "Field is empty"
    }

    const users=createUserDtos.map((dto)=>new User(dto))

    try {
      const entries=await this.userRepository.insert(users)
      return "Data inserted successfully"
    } catch (error) {
      return "error"
    }

  }

  async findByEmail(email:string):Promise<User>{
    try {
      const user=await this.userRepository.findOneBy({email:email})
      if(!user){
        throw NotFoundException
      }
      return user;
    } catch (error) {
      throw new Error("Something went wrong")
    }
  }


}
