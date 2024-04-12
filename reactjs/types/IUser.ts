export interface UserResponse {
    success: boolean;
    user: User;
    token: string;
}

export interface commonUserDetails {
    name: string;
    email: string;
    password: string;
    phone: string;
    mobile: string;
    zipCode: string;
    lat?: number;
    lang?: number;
}

export interface User extends commonUserDetails {
    createdAt: Date;
}

export interface loginPayload{
    email:string;
    password:string
}