import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { logoutApi, userLoginApi } from '#/api';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;
      const loginRes = await userLoginApi(params);

      if (!loginRes.access_token) {
        return { userInfo: null };
      }

      // 如果成功获取到 accessToken
      accessStore.setAccessToken(loginRes.access_token);

      // const menuRes = await getUserMenuApi();

      // const accessCodes = menuRes.map((item: any) => item.code);

      userInfo = {
        desc: loginRes.name,
        homePath: preferences.app.defaultHomePath,
        token: loginRes.access_token,
        avatar: preferences.app.defaultAvatar,
        username: params.userName,
        userId: loginRes.user_id,
        realName: loginRes.name,
        roles: [],
      };

      userStore.setUserInfo(userInfo);

      // const accessCodes = await getAccessCodesApi();

      // accessStore.setAccessCodes(accessCodes);

      if (loginRes.expires_in) {
        accessStore.setLoginExpired(true);
        onSuccess
          ? await onSuccess?.()
          : await router.push(preferences.app.defaultHomePath);
      } else {
        accessStore.setLoginExpired(false);
      }

      if (userInfo?.realName) {
        notification.success({
          description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
          duration: 3,
          message: $t('authentication.loginSuccess'),
        });
      }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout(redirect: boolean = true) {
    try {
      await logoutApi();
    } catch {
      // 不做任何处理
    }
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登录页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: redirect
        ? {
            redirect: encodeURIComponent(router.currentRoute.value.fullPath),
          }
        : {},
    });
  }

  async function fetchUserInfo() {
    // const userInfo = await getUserInfoApi();
    // userStore.setUserInfo(userInfo);
    return userStore.userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
