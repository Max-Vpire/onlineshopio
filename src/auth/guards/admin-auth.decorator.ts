
import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = 'secret'
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles)
