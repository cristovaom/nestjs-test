import { Injectable } from '@nestjs/common';
import { UserPrismaRepository } from './user.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserPrismaRepository) {}
    async register(user: Prisma.UserCreateInput) {
        if (!user) {
            throw new Error('User data is required');
        }

        return await this.userRepository.register(user);
    }

    async findByEmail(email: string) {
        console.log(email);
        if (!email) {
            throw new Error('Email is required');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}
