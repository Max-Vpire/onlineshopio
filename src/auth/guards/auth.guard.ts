
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  // import {BannedService} from "../../banned/banned.service";
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
        // private bannedService: BannedService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      // const user = await this.jwtService.verify(token)
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          {
            secret: 'secret'
          }
        );
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      // let checked = this.bannedService.GetByUserId(user.id)
      // if(checked){
      //   throw new UnauthorizedException();
      // } 
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
