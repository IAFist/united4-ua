import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/schemas/user.schema';

export class OnlyDistributorGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const user = request.user;

    if (!user.isDistributor && !user.isAdmin)
      throw new ForbiddenException('You have not rights');

    return user.isDistributor;
  }
}
