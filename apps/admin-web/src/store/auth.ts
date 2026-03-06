import type { Recordable, UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { preferences } from '@vben/preferences';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { ElNotification } from 'element-plus';
import { defineStore } from 'pinia';

import { commonLoginApi, getMenuPerApi, logoutApi } from '#/api';
import { $t } from '#/locales';

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * 负责执行登录流程，包括调用API、设置Token、获取用户信息、处理路由跳转等
   *
   * @param params 登录表单数据，包含用户名和密码
   * @param onSuccess 登录成功后的回调函数，如果提供则执行该函数，否则默认跳转到首页
   */
  async function authLogin(
    params: Recordable<any>,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 初始化用户信息
    let userInfo: null | UserInfo = null;
    try {
      // 设置登录加载状态为 true
      loginLoading.value = true;


      //       {
      //     "access_token": "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoxMDAxLCJuYW1lIjoi566h55CG5ZGYIiwiYWRtaW5fdXNlcl9yb2xlX2lkIjoiWzI4LDRdIiwic291cmNlX3R5cGUiOjB9.LM86tujp3bEWdJhmyZO8kJH-ZkBBnd3MyoW_9SHdAjhIAYEnTBm40pfI5KBF84AW9OqdnjoUyS9XHwhrjIQvFA",
      //     "user_id": 1001,
      //     "name": "管理员",
      //     "admin_user_role_id": "[28,4]",
      //     "source_type": 0,
      //     "expires_in": 120
      // }

      const loginRes =
        await commonLoginApi({
          userName: params.userName,
          pwd: params.pwd,
        });

      console.log('登录结果', loginRes);
      // 如果未获取到 token，视为登录失败，直接返回
      if (!loginRes.access_token) {
        return { userInfo: null };
      }

      // 存储 Access Token
      accessStore.setAccessToken(loginRes.access_token);

      const menuRes = await getMenuPerApi()

      console.log('菜单列表', menuRes);

      // 组装最终的用户信息对象
      userInfo = {
        desc: loginRes.name,
        homePath: preferences.app.defaultHomePath,
        token: loginRes.access_token,
        avatar: preferences.app.defaultAvatar,
        username: params.userName,
        userId: loginRes.user_id,
        realName: loginRes.name,
        roles: loginRes.admin_user_role_id, // 假设角色是数组格式
      };

      // 更新用户信息
      userStore.setUserInfo({ ...userInfo, userId: String(userInfo.userId) });


      // 处理登录过期状态 expires_in为登录有效时间单位为分钟
      // 如果 expires_in 存在且大于 0，则设置登录过期状态为 true
      if (loginRes.expires_in) {
        accessStore.setLoginExpired(true);
        onSuccess ? await onSuccess?.() : await router.push(preferences.app.defaultHomePath);
      } else {
        accessStore.setLoginExpired(false);
      }

      // 显示登录成功通知
      if (userInfo.realName) {
        ElNotification({
          message: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
          title: $t('authentication.loginSuccess'),
          type: 'success',
        });
      }

      //   // 更新权限码
      //   accessStore.setAccessCodes(accessCodes);

      //   // 6. 处理登录过期状态
      //   // 如果之前是登录过期状态，重置为 false
      //   if (accessStore.loginExpired) {
      //     accessStore.setLoginExpired(false);
      //   } else {
      //     // 7. 处理登录后的跳转
      //     // 如果提供了 onSuccess 回调则执行，否则跳转到用户首页或默认首页
      //     onSuccess
      //       ? await onSuccess?.()
      //       : await router.push(
      //           userInfo.homePath || preferences.app.defaultHomePath,
      //         );
      //   }
    } finally {
      loginLoading.value = false;
    }

    // 返回用户信息
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
    // let userInfo: null | UserInfo = null;
    // userInfo = await getUserInfoApi();
    // userStore.setUserInfo({ ...userInfo, userId: String(userInfo?.userId) });
    // return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    // fetchUserInfo,
    loginLoading,
    logout,
  };
});
