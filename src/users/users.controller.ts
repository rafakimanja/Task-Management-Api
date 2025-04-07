import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTo } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    create(@Body() user: UserDTo){
        this.userService.create(user)
    }
}
