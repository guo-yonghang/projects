<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { ElButton, ElMessage, ElPopconfirm, ElTag } from 'element-plus';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { delMenuApi, getAllMenusApi } from '#/api/core/menu';

interface RowType {
  id: number;
  parentId: number;
  name: string;
  type: number;
  url: string;
  component: string;
  iconName: string;
  sort: number;
  status: number;
  createdAt: string;
  children?: RowType[];
}

const formOptions: VbenFormProps = {
  collapsed: false,
  schema: [
    {
      component: 'Input',
      fieldName: 'name',
      label: '菜单名称',
    },
    {
      component: 'Select',
      componentProps: {
        clearable: true,
        options: [
          { label: '启用', value: 0 },
          { label: '禁用', value: 1 },
        ],
        placeholder: '请选择',
      },
      fieldName: 'status',
      label: '菜单状态',
    },
  ],
  showCollapseButton: true,
  submitOnChange: true,
  submitOnEnter: true,
};

const gridOptions: VxeTableGridOptions<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '菜单名称', field: 'name', treeNode: true, align: 'left' },
    { title: '图标', field: 'iconName' },
    { title: '排序', field: 'sort' },
    { title: '路由地址', field: 'url' },
    { title: '组件路径', field: 'component' },
    { title: '状态', field: 'status', slots: { default: 'status' } },
    { title: '操作', field: 'action', slots: { default: 'action' }, width: 200, fixed: 'right' },
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
      query: async ({ page }, formValues) => {
        try {
          const res = await getAllMenusApi(formValues);
          // 如果后端返回的是包含 items 的对象，则取 items，否则直接取 res
          // 根据通常的 API 响应结构，这里可能需要调整。
          // 假设 getAllMenusApi 返回的是数据数组或者 { items: [], total: 0 }
          // 由于我们关闭了分页，且 VxeTable transform 需要数组
          
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
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function handleEdit(row: RowType) {
  ElMessage.info(`点击了修改: ${row.name}`);
}

function handleAdd(row?: RowType) {
  ElMessage.info(`点击了新增${row ? `: ${row.name}` : ''}`);
}

async function handleDelete(row: RowType) {
  try {
    await delMenuApi(row.id);
    ElMessage.success('删除成功');
    gridApi.reload();
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
       <template #toolbar-tools>
         <el-button > 新增 </el-button>
        <el-button> 展开/折叠 </el-button>
      </template>
      <template #status="{ row }">
        <ElTag :type="row.status === 0 ? 'success' : 'danger'">
          {{ row.status === 0 ? '启用' : '禁用' }}
        </ElTag>
      </template>
      <template #action="{ row }">
        <ElButton link type="primary" size="small" @click="handleEdit(row)">
          修改
        </ElButton>
        <ElButton link type="primary" size="small" @click="handleAdd(row)">
          新增
        </ElButton>
        <ElPopconfirm title="确认删除吗?" @confirm="handleDelete(row)">
          <template #reference>
            <ElButton link type="danger" size="small">
              删除
            </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </Grid>
  </Page>
</template>
