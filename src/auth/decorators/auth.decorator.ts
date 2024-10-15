import { applyDecorators, UseGuards } from '@nestjs/common';
import { TypeRole } from '../auth.interface';
import { OnlyAdminGuard } from '../guards/admin.guard';
import { OnlyDistributorGuard } from '../guards/distributor.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function Auth(role: TypeRole = 'user') {
  return applyDecorators(
    role === 'admin'
      ? UseGuards(JwtAuthGuard, OnlyAdminGuard)
      : role === 'distributor'
        ? UseGuards(JwtAuthGuard, OnlyDistributorGuard)
        : UseGuards(JwtAuthGuard),
  );
}
