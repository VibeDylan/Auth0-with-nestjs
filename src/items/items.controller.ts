import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Item } from 'src/item';
import { Items } from 'src/items';
import { PermissionsGuard } from 'src/permissions.guard';
import { Permissions } from '../permissions.decorator';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService){}

    @Get()
    async findAll(): Promise<Items> {
        return this.itemsService.findAll();
    }

    @Get(':id')
    async find(@Param('id') id: number): Promise<Item> { 
        return this.itemsService.find(id);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('create:items')
    @Post()
    async create(@Body('item') item: Item): Promise<void> {
        this.itemsService.create(item);
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('update:items')
    @Put()
    async update(@Body('item') item: Item): Promise<void> {
        this.itemsService.update(item)
    }

    @UseGuards(AuthGuard('jwt'), PermissionsGuard)
    @Permissions('delete:items')
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        this.itemsService.delete(id)
    }
}
