import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService){}

    @Post()
    create(@Body() task: TaskDto){
        this.taskService.create(task)
    }

    @Get('/:id')
    findByID(@Param('id') id:string): TaskDto{
        return this.taskService.findByID(id)
    }

    @Put()
    update(@Body() task: TaskDto){
        this.taskService.update(task)
    }
}
