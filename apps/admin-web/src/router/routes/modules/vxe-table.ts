import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:table',
      title: 'Vxe表格',
    },
    name: 'VxeTable',
    path: '/vxe-table',
    children: [
      {
        name: 'VxeTableForm',
        path: 'form',
        component: () => import('#/views/demos/vxe-table/form.vue'),
        meta: {
          title: '搜索表格',
        },
      },
    ],
  },
];

export default routes;
