import type { RouteRecordStringComponent } from '@vben/types';
import { mockMenus } from './mock-data';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return Promise.resolve(mockMenus as any as RouteRecordStringComponent[]);
}
