<template>
  <UseCrud
    title="Puestos"
    icon="bi-person-walking"
    :columns="columns"
    :formComponent="FormPosition"
    :api="positionsApi"
  />
</template>

<script setup>
import { onMounted } from 'vue';
import UseCrud from '@/components/global/UseCrud.vue';
import FormPosition from './components/FormPosition.vue';
import * as positionsApi from '@/api/PositionsApi.js';

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
];

onMounted(() => {});
</script>
