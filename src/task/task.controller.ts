import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateTaskDto, FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Post()
    async create(@Body() task: CreateTaskDto){
        this.taskService.create(task)
    }

    @Get('/:id')
    async findByID(@Param('id') id:number): Promise<TaskDto>{
        return this.taskService.findByID(id)
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
        return this.taskService.findAll(params)
    }

    @Put()
    async update(@Body() task: TaskDto){
        this.taskService.update(task)
    }

    @Delete('/:id')
    async revome(@Param('id') id: string){
        const numId = parseInt(id, 10)
        return this.taskService.remove(numId)
    }
}