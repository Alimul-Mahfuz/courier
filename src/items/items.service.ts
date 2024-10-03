import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { EntityManager, Repository } from 'typeorm';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsReposity: Repository<Item>,
    private readonly entityManager: EntityManager) { }

  create(createItemDto: CreateItemDto) {
    const item = new Item(createItemDto)
    this.entityManager.save(item);
  }

  async findAll() {
    return this.itemsReposity.find()
  }

  findOne(id: number) {
    return this.itemsReposity.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemsReposity.findOneBy({ id })
    item.name=updateItemDto.name
    item.public=updateItemDto.public
    await this.entityManager.save(item)

  }

  async remove(id: number) {
    const item=await this.itemsReposity.findOneBy({id})
    if(item){
      await this.itemsReposity.delete(id);
    }
    else{
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
