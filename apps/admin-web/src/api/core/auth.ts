import { requestClient } from '#/api/request';

export namespace AuthApi {
  /** 登录接口参数 */
  export interface LoginParams {
    password?: string;
    username?: string;
  }

  /** 登录接口返回值 */
  export interface LoginResult {
    token: string;
    id: number;
    email: string;
    mobile: string;
    username: string;
    rid: number;
  }

  export interface RefreshTokenResult {
    data: string;
    status: number;
  }
}

/**
 * 登录
 */
export async function loginApi(data: AuthApi.LoginParams) {
  return requestClient.post<AuthApi.LoginResult>('/login', data);
}

/**
 * 刷新accessToken
 */
export async function refreshTokenApi() {
  return Promise.resolve({
    data: 'fake-token-refresh',
    status: 200,
  });
}

/**
 * 退出登录
 */
export async function logoutApi() {
  return Promise.resolve();
}

/**
 * 获取用户权限码
 */
export async function getAccessCodesApi() {
  return Promise.resolve(['AC_100100', 'AC_100110', 'AC_100120']);
}
