<template>
  <UseCrud
    title="Áreas"
    icon="bi-diagram-3"
    :columns="columns"
    :formComponent="FormAreas"
    :api="areasApi"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import UseCrud from '@/components/global/UseCrud.vue';
import FormAreas from './components/FormArea.vue';
import * as areasApi from '@/api/AreasApi.js';


const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
];

onMounted(() => {});
</script>
