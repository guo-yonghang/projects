export const mockMenus = [
  {
    component: 'BasicLayout',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: -1,
      title: 'Dashboard',
    },
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: 'Analytics',
        path: '/dashboard/analytics',
        component: '/dashboard/analytics/index',
        meta: {
          affixTab: true,
          icon: 'lucide:area-chart',
          title: 'Analytics',
        },
      },
      {
        name: 'Workspace',
        path: '/dashboard/workspace',
        component: '/dashboard/workspace/index',
        meta: {
          icon: 'carbon:workspace',
          title: 'Workspace',
        },
      },
    ],
  },
  {
    component: 'BasicLayout',
    meta: {
      icon: 'lucide:layout-dashboard',
      order: 1000,
      title: 'Demos',
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        name: 'ElementPlus',
        path: '/demos/element',
        component: '/demos/element/index',
        meta: {
          icon: 'logos:element',
          title: 'Element Plus',
        },
      },
    ],
  },
  {
    component: 'BasicLayout',
    meta: {
      icon: 'lucide:settings',
      order: 2000,
      title: '系统设置',
    },
    name: 'System',
    path: '/system',
    children: [
      {
        name: 'SystemMenu',
        path: '/system/menu',
        component: '/system/menu/index',
        meta: {
          icon: 'lucide:menu',
          title: '菜单管理',
        },
      },
    ],
  },
];

export const mockUser = {
  avatar: 'https://unpkg.com/@vbenjs/static-source@0.1.7/source/avatar-v1.webp',
  desc: 'Manager',
  homePath: '/dashboard/analytics',
  permissions: [
    {
      label: '主控台',
      value: 'dashboard:analytics',
    },
    {
      label: '工作台',
      value: 'dashboard:workspace',
    },
  ],
  realName: 'Admin',
  roles: ['super'],
  token: 'fake-token',
  userId: '1',
  username: 'admin',
};
