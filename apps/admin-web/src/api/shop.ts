import { requestClient } from '#/api/request';

/**
 * API Collection transformed from shop-admin-web api/index.js
 */

export namespace ShopApi {
  // Login
  export interface LoginParams {
    username?: string;
    password?: string;
  }
  export interface LoginResult {
    token: string;
    id: number;
    email: string;
    mobile: string;
    username: string;
    rid: number;
  }

  // Users
  export interface UserParams {
    query?: string;
    pagenum?: number;
    pagesize?: number;
  }
  export interface UserResult {
    total: number;
    pagenum: number;
    users: any[];
  }
  
  // Menus
  export interface MenuResult {
    id: number;
    authName: string;
    path: string;
    children: MenuResult[];
  }

  // Goods
  export interface GoodsParams {
    query?: string;
    pagenum?: number;
    pagesize?: number;
  }

  // Categories
  export interface CategoryParams {
    type?: number;
    pagenum?: number;
    pagesize?: number;
  }
}

/**
 * Login
 */
export function login(data: ShopApi.LoginParams) {
  return requestClient.post<ShopApi.LoginResult>('/login', data);
}

/**
 * Get Menus (Left sidebar)
 */
export function getMenus() {
  return requestClient.get<ShopApi.MenuResult[]>('/menus');
}

/**
 * Get Users
 */
export function getUsers(params: ShopApi.UserParams) {
  return requestClient.get<ShopApi.UserResult>('/users', { params });
}

/**
 * Add User
 */
export function addUser(data: any) {
  return requestClient.post('/users', data);
}

/**
 * Edit User
 */
export function editUser(id: number, data: any) {
  return requestClient.put(`/users/${id}`, data);
}

/**
 * Delete User
 */
export function deleteUser(id: number) {
  return requestClient.delete(`/users/${id}`);
}

/**
 * Get Roles
 */
export function getRoles() {
  return requestClient.get('/roles');
}

/**
 * Get Goods
 */
export function getGoods(params: ShopApi.GoodsParams) {
  return requestClient.get('/goods', { params });
}

/**
 * Get Categories
 */
export function getCategories(params: ShopApi.CategoryParams) {
  return requestClient.get('/categories', { params });
}

/**
 * Get Orders
 */
export function getOrders(params: any) {
  return requestClient.get('/orders', { params });
}
