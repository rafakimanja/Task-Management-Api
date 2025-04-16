import { IsEnum, IsInt, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export enum TaskStatusUnum {
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class CreateTaskDto{
    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    description: string
}

export class TaskDto{
    @IsInt()
    @IsOptional()
    id: number

    @IsString()
    @MinLength(3)
    @MaxLength(256)
    title: string

    @IsString()
    @MinLength(5)
    @MaxLength(512)
    description: string

    @IsEnum(TaskStatusUnum)
    @IsOptional()
    status: TaskStatusUnum

    constructor(id: number, title: string, description: string, status: string){
        this.id = id
        this.title = title
        this.description = description
        if (Object.values(TaskStatusUnum).includes(status as TaskStatusUnum))
            this.status = status as TaskStatusUnum
    }
}

export interface FindAllParameters {
    title: string
    status: string
}