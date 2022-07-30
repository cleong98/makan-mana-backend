import { Role } from "@prisma/client";

export class UserType {
    uniqueId: string;
    email: string;
    phone: string;
    avatar: string;
    userType: UserType;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}