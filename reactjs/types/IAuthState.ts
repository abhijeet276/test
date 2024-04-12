import { commonUserDetails } from "./IUser";

export interface userState {
    user: commonUserDetails,
    isAuthenticated: boolean,
    status: 'loading' | 'succeeded' | 'failed',
    error: any,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    token:string
}