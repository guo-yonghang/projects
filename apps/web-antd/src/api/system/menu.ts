import { requestClient } from '#/api/request';

// 获取所有菜单
export const getAllMenuApi = (params: any) => {
  return requestClient.get('/shop-admin/menu/list', { params });
};

// 新增菜单
export const addMenuApi = (data: any) => {
  return requestClient.post('/shop-admin/menu', data);
};

// 修改菜单
export const updateMenuApi = (data: any) => {
  return requestClient.put('/shop-admin/menu', data);
};

// 删除菜单
export const delMenuApi = (menuId: number) => {
  return requestClient.delete(`/shop-admin/menu/${menuId}`);
};
