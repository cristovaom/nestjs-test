import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from './jwt-payload-interface';



@Injectable()
export class ClientGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (user.role !== UserRole.CLIENT) {
            throw new UnauthorizedException('Only clients can access this resource');
        }

        return true;
    }
}
