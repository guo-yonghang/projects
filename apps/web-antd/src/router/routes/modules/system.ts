import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:settings',
      order: 1000,
      title: '系统设置',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'SystemMenu',
        path: '/system/menu',
        component: () => import('#/views/system/menu/index.vue'),
        meta: {
          icon: 'lucide:menu',
          title: '菜单管理',
        },
      },
    ],
  },
];

export default routes;
