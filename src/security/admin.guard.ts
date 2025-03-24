import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRole } from './jwt-payload-interface';


@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;
        console.log(user);
        if (!user) {
            throw new UnauthorizedException('User not authenticated');
        }

        if (user.role !== UserRole.ADMIN) {
            throw new UnauthorizedException('Only administrators can access this resource');
        }

        return true;
    }
}
