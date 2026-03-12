<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useVbenDrawer } from '@vben/common-ui';
import { useVbenForm, z } from '#/adapter/form';
import { addMenuApi, updateMenuApi } from '#/api/system/menu';
import { message } from 'ant-design-vue';

const emit = defineEmits(['success']);

const isEdit = ref(false);
const rowId = ref<number | string>('');

const [Form, formApi] = useVbenForm({
  commonConfig: {
    colon: true,
    formItemClass: 'col-span-4',
    labelWidth: 100,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      fieldName: 'parentName',
      label: '上级菜单',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        buttonStyle: 'solid',
        options: [
          { label: '目录', value: 0 },
          { label: '页面', value: 1 },
          { label: '按钮', value: 2 },
        ],
        optionType: 'button',
      },
      fieldName: 'type',
      label: '菜单类型',
      defaultValue: 0,
    },
    {
      component: 'IconPicker',
      fieldName: 'iconName',
      label: '菜单图标',
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '菜单名称',
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: '显示排序',
      defaultValue: 0,
    },
    {
      component: 'Input',
      fieldName: 'url',
      label: '路由地址',
      dependencies: {
        rules: () => 'required',
        show: (values) => values.type !== 2,
        triggerFields: ['type'],
      },
    },
    {
      component: 'Input',
      fieldName: 'component',
      label: '组件地址',
      dependencies: {
        rules: () => 'required',
        show: (values) => values.type === 1,
        triggerFields: ['type'],
      },
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '显示', value: 0 },
          { label: '隐藏', value: 1 },
        ],
      },
      fieldName: 'visible',
      label: '显示状态',
      defaultValue: 0,
      dependencies: {
        show: (values) => values.type !== 2,
        triggerFields: ['type'],
      },
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: '正常', value: 0 },
          { label: '停用', value: 1 },
        ],
      },
      fieldName: 'status',
      label: '使用状态',
      defaultValue: 0,
    },
    {
      component: 'Select',
      componentProps: {
        options: [
          { value: 1, label: '新增' },
          { value: 2, label: '删除' },
          { value: 3, label: '编辑' },
          { value: 4, label: '查询' },
          { value: 5, label: '导入' },
          { value: 6, label: '导出' },
          { value: 7, label: '权限设置' },
          { value: 8, label: '二维码' },
        ],
      },
      fieldName: 'perms',
      label: '按钮类型',
      dependencies: {
        show: (values) => values.type === 2,
        triggerFields: ['perms'],
      },
    },
  ],
  showDefaultActions: false,
  wrapperClass: 'grid-cols-4 gap-y-2',
});

const [Drawer, drawerApi] = useVbenDrawer({
  onConfirm: async () => {
    const { valid, values } = await formApi.validate();
    if (!valid) return;

    console.log(values);
    return;
    try {
      drawerApi.setState({ confirmLoading: true });
      if (isEdit.value) {
        await updateMenuApi({ ...values, id: rowId.value });
        message.success('修改成功');
      } else {
        await addMenuApi(values);
        message.success('新增成功');
      }
      drawerApi.close();
      emit('success');
    } catch (error) {
      console.error(error);
    } finally {
      drawerApi.setState({ confirmLoading: false });
    }
  },
  onOpenChange: (isOpen) => {
    if (isOpen) {
      const data = drawerApi.getData<any>();
      if (data) {
        isEdit.value = !!data.id;
        rowId.value = data.id || '';
        formApi.setValues(data);
      } else {
        isEdit.value = false;
        rowId.value = '';
        formApi.resetForm();
      }
    }
  },
});

const title = computed(() => (isEdit.value ? '编辑菜单' : '新增菜单'));
</script>

<template>
  <Drawer :title="title" class="w-[600px]">
    <Form />
  </Drawer>
</template>
