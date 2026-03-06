import type { UserInfo } from '@vben/types';
import { mockUser } from './mock-data';

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return Promise.resolve(mockUser as UserInfo);
}
