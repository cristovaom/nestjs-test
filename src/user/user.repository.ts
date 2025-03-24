
import * as bcrypt from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/db-prisma/prisma.service";
import { User } from "@prisma/client";
import { Prisma  } from "@prisma/client";

@Injectable()
export class UserPrismaRepository{
    constructor(private readonly prisma: PrismaService) {}
    async register(user: Prisma.UserCreateInput) {
        const findExistingUser = await this.prisma.user.findUnique({
            where:{
                email: user.email
            }
        })
        if(findExistingUser){
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        })
        return newUser;
    }
    async findByEmail(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },

        })
        if (!user) {
            return null;
        }
        return user
    }

}
