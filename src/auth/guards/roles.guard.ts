
import { CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./admin-auth.decorator";
@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService,
        private reflactor: Reflector) { }
    async canActivate(context: ExecutionContext){
        try {
            const requiredRoles = this.reflactor.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRoles) {
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException();
            }
            const user = await this.jwtService.verify(token)
            req.user = user;
            if(user.user.role === 'ADMIN'){
                return true
            }

            return false
        }
        catch (e) {
            throw new HttpException(e.message, HttpStatus.FORBIDDEN)
        }
    }

}
