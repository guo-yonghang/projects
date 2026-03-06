import { requestClient } from '#/api/request';

export * from './core';
export * from './shop';

interface CommonLoginParams {
  userName?: string;
  pwd?: string;
}

interface LoginResult {
  access_token: string;
  user_id: number;
  name: string;
  admin_user_role_id?: string[];
  source_type: number;
  expires_in: number;
}

// interface MenuPermResult {
//   [key: string]: any;
// }


// 登录
export function commonLoginApi(params: CommonLoginParams) {
  return requestClient.get<LoginResult>('/shop-admin/user/login', { params });
}

//获取全部菜单
export function getMenuListApi() {
  return requestClient.get('/shop-admin/menu/list');
}

// 获取用户可访问路由列表
export function getMenuPerApi() {
  return requestClient.get('/shop-admin/menu/permList');
}
