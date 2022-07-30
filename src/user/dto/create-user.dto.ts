import { Role, UserType } from "@prisma/client"

export class CreateUserDto {
    email: string
    phone: string
    userType: UserType
    role: Role
    password: string
    oauthId?: string
    username?: string
    avatar?: {
        url: string,
        width?: string,
        height?: string,
    }
}
