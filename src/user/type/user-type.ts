import { Role } from "@prisma/client";

export class UserType {
    uuid: string;
        email: string;
        phone: string;
        avatar: string;
        userType: UserType;
        role: Role;
        createdAt: Date;
        updatedAt: Date;
        gender: {
            title: string;
        };
}