import { Injectable } from '@nestjs/common';
import { UserDTo } from './user.dto';
import { v4 as uuidv4 } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDTo[] = []

    create(newUser: UserDTo){
        newUser.id = uuidv4()
        newUser.password = bcryptHashSync(newUser.password, 10)
        this.users.push(newUser)
    }

    findByUsername(username: string): UserDTo | undefined {
      const usuario = this.users.find(user => user.username === username)
      return usuario
    }
}
