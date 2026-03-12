<script lang="ts" setup>
import { h } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons-vue';
import { Button, message, Modal, Tag } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { delMenuApi } from '#/api/system/menu';

import { formOptions, gridOptions } from './data';
import MenuDrawer from './menu-drawer.vue';

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: MenuDrawer,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions,
  gridOptions,
});

function handleAdd() {
  drawerApi.setData({ parentId: 0, parentName: '顶级菜单', type: 0 }).open();
}

function handleAddChild(row: any) {
  drawerApi.setData({ parentId: row.id, parentName: row.name, type: 1 }).open();
}

function handleEdit(row: any) {
  const data = { ...row };
  if (data.parentId === 0 || !data.parentId) {
    data.parentName = '顶级菜单';
  }
  drawerApi.setData(data).open();
}

function handleDelete(row: any) {
  Modal.confirm({
    title: '提示',
    content: `确定要删除菜单【${row.name}】吗？`,
    onOk: async () => {
      try {
        await delMenuApi(row.id);
        message.success('删除成功');
        gridApi.query();
      } catch (error) {
        console.error(error);
      }
    },
  });
}

function handleSuccess() {
  gridApi.query();
}
</script>

<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar-actions>
        <Button :icon="h(PlusOutlined)" ghost type="primary" @click="handleAdd">
          新增
        </Button>
      </template>
      <template #iconName>
        <div class="flex-center">
          <!-- <IconifyIcon :icon="row.iconName" class="size-5" /> -->
          <IconifyIcon icon="lucide:infinity" class="size-5" />
          <!-- <IconifyIcon icon="ant-design:account-book-twotone" class="size-5" /> -->
        </div>
      </template>
      <template #status="{ row }">
        <Tag :color="row.status === 0 ? 'success' : 'error'">
          {{ row.status === 0 ? '启用' : '停用' }}
        </Tag>
      </template>
      <template #action="{ row }">
        <Button
          :icon="h(EditOutlined)"
          type="link"
          size="small"
          @click="handleEdit(row)"
        >
          修改
        </Button>
        <Button
          :icon="h(PlusOutlined)"
          type="link"
          size="small"
          @click="handleAddChild(row)"
        >
          新增
        </Button>
        <Button
          :icon="h(DeleteOutlined)"
          danger
          type="link"
          size="small"
          @click="handleDelete(row)"
        >
          删除
        </Button>
      </template>
    </Grid>
    <Drawer @success="handleSuccess" />
  </Page>
</template>
