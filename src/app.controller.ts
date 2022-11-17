import {Controller, Get, Request, Post, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() request) {
    return request.user
  }
}
