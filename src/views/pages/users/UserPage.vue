<template>
  <CardContainer>
    <DataTable
      tableTitle="Usuarios Registrados"
      tableIcon="bi-people-fill"
      :data="items"
      :columns="columns"
      :search="search"
      :perPage="perPage"
      :currentPage="currentPage"
      :showEdit="true"
      :showDelete="true"
      :showStatus="true"
      @update:search="search = $event"
      @update:perPage="perPage = $event"
      @update:currentPage="currentPage = $event"
      @create="handleCreate"
      @edit="editItem"
      @delete="deleteItem"
    />

    <!-- Modal controlado por la vista -->
    <ModalCreateEdit :visible="showModal" @close="showModal = false" />
  </CardContainer>
</template>

<script setup>
import { ref } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';
import DataTable from '@/components/data-table/DataTable.vue';
import ModalCreateEdit from './components/ModalCreateEdit.vue';

const showModal = ref(false);

const search = ref('');
const perPage = ref(10);
const currentPage = ref(1);

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre' },
  { key: 'email', label: 'Email' },
  { key: 'rol', label: 'Rol' },
];

const items = ref([
  { id: 1, name: 'Juan Pérez', email: 'juan@example.com', rol: 'administrador', status: 1 },
  { id: 2, name: 'Ana Gómez', email: 'ana@example.com', rol: 'administrador', status: 1 },
  { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', rol: 'administrador', status: 1 },
  { id: 4, name: 'Janeth Fuentes', email: 'jan@example.com', rol: 'administrador', status: 1 },
]);

function handleCreate() {
  showModal.value = true;
}

function editItem(item) {
  alert('Editar usuario: ' + item.name);
}

function deleteItem(item) {
  alert('Eliminar usuario: ' + item.name);
}
</script>
