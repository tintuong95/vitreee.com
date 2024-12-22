import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AccountDetail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);

export class AccountDetailDTO {
  id: string;
  iat: number;
  exp: number;
}