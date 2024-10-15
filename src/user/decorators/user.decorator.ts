import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../schemas/user.schema';

type TypeData = keyof UserDocument;

export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: UserDocument }>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
