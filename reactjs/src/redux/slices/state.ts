import { userState } from "../../../types/IAuthState";
import { commonUserDetails } from "../../../types/IUser";

export const authInitialState: userState = {
  user: {} as commonUserDetails,
  isAuthenticated: false,
  status: 'loading',
  error: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  token:""
};
