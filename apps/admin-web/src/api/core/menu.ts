import { requestClient } from '#/api/request';

interface MenuListParams {
  name?: string;
  status?: number;
}

interface MenuAddParams {
  name: string;
  type: number;
  path?: string;
  component?: string;
  icon?: string;
  sort?: number;
  status?: number;
}

interface MenuUpdateParams extends MenuAddParams {
  menu_id: number;
}


// 获取用户所有菜单
export function getAllMenusApi(params: MenuListParams) {
  return requestClient.get('/shop-admin/menu/list', { params });
}

// 新增菜单
export function addMenuApi(data: MenuAddParams) {
  return requestClient.post('/shop-admin/menu', { data });
}

// 修改菜单
export function updateMenuApi(data: MenuUpdateParams) {
  return requestClient.put('/shop-admin/menu', { data });
}

// 删除菜单
export function delMenuApi(menuId: number) {
  return requestClient.delete('/shop-admin/menu/' + menuId);
}