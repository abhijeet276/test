import { User, UserResponse, commonUserDetails, loginPayload } from '../../../types/IUser';
import { createApiThunk } from '../createApiThunk';
import { ApiErrorResponse } from '../serviceTypes';

export const userLogin = createApiThunk<loginPayload, UserResponse, ApiErrorResponse>({
  name: 'userLoginaction',
  endpoint: `/api/v1/user/login`,
  method: 'POST',
});
export const userSignup = createApiThunk<commonUserDetails, UserResponse, ApiErrorResponse>({
  name: 'userSignup',
  endpoint: `/api/v1/user/register`,
  method: 'POST',
});
export const getUsers = createApiThunk<{ lat: number, lang: number }, User[], ApiErrorResponse>({
  name: 'userNearBy',
  endpoint: "",
  dynamicEndpoint: ({ lat, lang }) => `/api/v1/user/getnearByUser?lat=${lat}&lng=${lang}`,
  method: 'GET',
});
export const updateUserProfile = createApiThunk<Omit<commonUserDetails,"password">, User, ApiErrorResponse>({
  name: 'updateUserProfile',
  endpoint: `/api/v1/user/update-profile`,
  method: 'PUT',
  
});

