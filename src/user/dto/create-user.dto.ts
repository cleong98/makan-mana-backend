import { Gender, Role, UserType } from "@prisma/client"

export class CreateUserDto {
    email: string
    phone: string
    userType: UserType
    role: Role
    password: string
    genderId: number
}
