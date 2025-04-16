import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, FindAllParameters, TaskDto, TaskStatusUnum } from './task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Task } from 'generated/prisma';

@Injectable()
export class TaskService {

    constructor(private prisma: PrismaService) { }

    async create(task: CreateTaskDto) {
        return await this.prisma.task.create({
            data: {
                title: task.title,
                description: task.description,
                status: TaskStatusUnum.TO_DO
            }
        })
    }

    async findByID(id: number): Promise<TaskDto> {
        const task = await this.prisma.task.findUnique({
            where: {id},
        })
        if(!task)
            throw new NotFoundException(`Task with id ${id} not found`)    
        
        return new TaskDto(task.id, task.title, task.description, task.status)
    }

    async findAll(params: FindAllParameters): Promise<TaskDto[]> {

        const where: Prisma.TaskWhereInput = {};
        const tarefas: TaskDto[] = []

        if (params.title !== undefined) {
            where.title = {
                contains: params.title,
                mode: 'insensitive', // opcional: busca sem case-sensitive
            };
        }

        if (params.status !== undefined) {
            where.status = params.status;
        }

        const tasks = await this.prisma.task.findMany({
            where,
        })

        tasks.forEach(task => {
            tarefas.push(new TaskDto(task.id, task.title, task.description, task.status))
        })

        return tarefas;
    }


    async update(task: TaskDto) {
        const id = task.id
        try{
            await this.prisma.task.update({
                where: {id},
                data: {
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    updatedAt: new Date()
                }
            })
            return
        } catch(error){
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
        }
    }

    async remove(id: number) {
        try{
            await this.prisma.task.delete({where: {id}})
            return
        }catch(error){
            throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST)
        }
    }
}
