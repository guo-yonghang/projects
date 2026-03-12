import { requestClient } from '#/api/request';

export * from './menu';

// 用户登录
export const userLoginApi = (params: any) => {
  return requestClient.get('/shop-admin/user/login', { params });
};

// 获取用户可访问菜单
export const getUserMenuApi = () => {
  return requestClient.get('/shop-admin/menu/permList');
};
