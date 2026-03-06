import { requestClient } from '#/api/request';
import type { CommonLoginParams, LoginResult } from './types';

export * from './core';
export * from './shop';
export * from './types';

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
