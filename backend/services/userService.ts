import { NextFunction, Request, Response } from "express";
import { Users } from "../models/users";
import { CustomErrorHandler } from "../utils/errorHandler";
import httpStatus from "http-status";
import { sendToken } from "../utils/jwtToken";
import { AuthenticatedRequest } from "../interface/IUserSchema";

export class UserService {
    static createUserService = async (req: Request, res: Response) => {
        const user = await Users.create(req.body);
        if (!user) throw new CustomErrorHandler(httpStatus.CREATED, "Failed to create a user");
        return sendToken(user, 201, res);
    }
    static loginUserService = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!email || !password)
            throw new CustomErrorHandler(httpStatus.BAD_REQUEST, "both email and password is required")

        const user = await Users.findOne({ email }).select("+password")
        if (!user)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ");
        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect)
            throw new CustomErrorHandler(httpStatus.FORBIDDEN, "invalid email or password ");

        return sendToken(user, 200, res);
    }
    static logoutService = async (req: Request, res: Response, next: NextFunction) => {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        return "ok"
    }
    static updateProfileService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        let userId = req.user.id as string;
        if (!userId) {
            return new CustomErrorHandler(httpStatus.UNAUTHORIZED, "No User Found")
        }
        const user = await Users.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return new CustomErrorHandler(httpStatus.NOT_FOUND, 'No User Found');
        }
        return user
    }
    static getnearByUserService = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        console.log(req.query.lat, req.query.lng, "qqqqqqqqq")
        const loggedInUserLatitude = Number(req.query.lat);
        const loggedInUserLongitude = Number(req.query.lng);

        const nearbyUsers = await Users.find({
            lat: { $ne: null },
            lang: { $ne: null },
            $expr: {
                $let: {
                    vars: {
                        distance: {
                            $sqrt: {
                                $add: [
                                    { $pow: [{ $subtract: ["$lat", loggedInUserLatitude] }, 2] },
                                    { $pow: [{ $subtract: ["$lang", loggedInUserLongitude] }, 2] }
                                ]
                            }
                        }
                    },
                    in: { $lt: ["$$distance", 0.000009] }
                }
            }
        }).limit(5);
        return nearbyUsers;
    }
}