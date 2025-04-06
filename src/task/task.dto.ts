export class TaskDto{
    id: string
    title: string
    description: string
    status: boolean
    expirationDate: Date
}

export interface FindAllParameters {
    title: string
    status: boolean
}