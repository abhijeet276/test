import { Document } from "mongoose";
import { Request } from "express";

export interface IUserDocument extends Document {
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    phone?: string;
    mobile: string;
    zipCode: string;
    lat?: number;
    lang?: number;
    resetPasswordToken: string,
    resetPasswordExpire: Date,
    getJwtToken(): string;
    comparePassword(enterdPassword: string): string
}


export interface AuthenticatedRequest extends Request {
    user?: IUserDocument;
}