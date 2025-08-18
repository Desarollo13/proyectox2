<template>
  <UseCrud
    title="Sucursales"
    icon="bi-bank"
    :columns="columns"
    :formComponent="FormBranch"
    :api="branchApi"
    :transform="mapBranch"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import UseCrud from '@/components/global/UseCrud.vue';
import FormBranch from './components/FormBranch.vue';
import * as branchApi from '@/api/BranchesApi.js';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'address', label: 'Dirección' },
  { key: 'phone', label: 'Teléfono' },
];

const mapBranch = (item) => ({
  ...item,
  address: `${item.streat}, ${item.city}, ${item.state}, ${item.country}, C.P. ${item.zip}`,
});
onMounted(() => {});
</script>
