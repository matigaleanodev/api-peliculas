import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthTokens } from './types/auth-token.interface';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<AuthTokens> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthTokens> {
    return this.authService.login(dto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh')
  refresh(
    @Req()
    req: {
      headers: { authorization?: string };
      user?: { userId?: string };
    },
  ): Promise<AuthTokens> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new BadRequestException('Missing Authorization header');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid Authorization format');
    }

    const refreshToken = authHeader.replace('Bearer ', '').trim();
    if (!refreshToken) {
      throw new BadRequestException('Missing refresh token');
    }

    if (!req.user || !req.user.userId) {
      throw new BadRequestException('Invalid refresh payload');
    }

    return this.authService.refresh(req.user.userId, refreshToken);
  }
}
