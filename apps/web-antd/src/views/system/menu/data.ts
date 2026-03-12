import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { getAllMenuApi } from '#/api/system/menu';

export const formOptions: VbenFormProps = {
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '菜单名称',
    },
    {
      component: 'Select',
      componentProps: {
        allowClear: true,
        options: [
          { label: '启用', value: 0 },
          { label: '停用', value: 1 },
        ],
        placeholder: '请选择状态',
      },
      fieldName: 'status',
      label: '状态',
    },
  ],
  showCollapseButton: true,
  submitOnChange: true,
  submitOnEnter: true,
};

export const gridOptions: VxeGridProps<any> = {
  columns: [
    { title: '菜单名称', field: 'name', treeNode: true, align: 'left' },
    { title: '图标', field: 'iconName', slots: { default: 'iconName' } },
    { title: '排序', field: 'sort' },
    { title: '路由地址', field: 'url' },
    {
      title: '组件路径',
      field: 'component',
      formatter: ({ cellValue }) => cellValue || '-',
    },
    { title: '状态', field: 'status', slots: { default: 'status' } },
    {
      title: '操作',
      field: 'action',
      slots: { default: 'action' },
      width: 240,
      fixed: 'right',
    },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {
    enabled: false,
  },
  treeConfig: {
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    expandAll: false,
  },
  proxyConfig: {
    ajax: {
      query: async (_params, formValues) => {
        try {
          const res = await getAllMenuApi(formValues);
          let data = [];
          if (Array.isArray(res)) {
            data = res;
          } else if (res && Array.isArray((res as any).items)) {
            data = (res as any).items;
          } else {
            // 兜底，视情况而定
            data = Array.isArray(res) ? res : [];
          }
          return data;
        } catch (error) {
          console.error(error);
          return [];
        }
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};
