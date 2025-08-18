<template>
  <div class="dataTables_wrapper">
    <!-- Título -->
    <div class="mb-3">
      <TableTitle :title="tableTitle" :icon="tableIcon" />
    </div>

    <!-- Header -->
    <div v-if="showHeader" class="d-flex justify-content-between align-items-center flex-wrap gap-3">
      <div v-if="showCreateButton">
        <TableCreateButton :label="createButtonLabel" @click="$emit('create')" />
      </div>

      <div v-if="showPerPage">
        <TablePerPage v-model="localPerPage" :options="perPageOptions" />
      </div>

      <div v-if="showSearch" class="dataTables_filter">
        <TableSearch v-model="localSearch" :placeholder="searchPlaceholder" />
      </div>
    </div>

    <!-- Tabla -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover table-striped text-center">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col.key">
              {{ col.label }}
            </th>
            <th v-if="showStatus">Estado</th>
            <th v-if="hasActions">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in paginatedItems" :key="item.id">
            <td v-for="col in columns" :key="col.key">
              {{ item[col.key] }}
            </td>
            <td v-if="showStatus">
              <TableStatus :status="Number(item.status_id)" />
            </td>
            <td v-if="hasActions">
              <TableActions :key="`${item.id}-${item.status_id}`" :row="item" :showEdit="showEdit"
                :showDelete="showDelete" @edit="$emit('edit', item)" @delete="$emit('delete', item)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer -->
    <div v-if="showPagination" class="dt-footer">
      <div class="dt-info">Mostrando página {{ localCurrentPage }} de {{ totalPages }}</div>
      <div class="dt-paging">
        <TablePagination :currentPage="localCurrentPage" :totalPages="totalPages"
          @update:currentPage="localCurrentPage = $event" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import TableSearch from './TableSearch.vue';
import TablePerPage from './TablePerPage.vue';
import TableCreateButton from './TableCreateButton.vue';
import TablePagination from './TablePagination.vue';
import TableActions from './TableActions.vue';
import TableTitle from './TableTitle.vue';
import TableStatus from './TableStatus.vue';

const props = defineProps({
  showStatus: { type: Boolean, default: false },

  data: Array,
  columns: Array,

  search: String,
  perPage: Number,
  currentPage: Number,

  showSearch: { type: Boolean, default: true },
  showPerPage: { type: Boolean, default: true },
  showCreateButton: { type: Boolean, default: true },
  showPagination: { type: Boolean, default: true },
  showHeader: { type: Boolean, default: true },

  showEdit: { type: Boolean, default: false },
  showDelete: { type: Boolean, default: false },

  searchPlaceholder: { type: String, default: 'Buscar...' },
  createButtonLabel: { type: String, default: 'Nuevo' },
  perPageOptions: {
    type: Array,
    default: () => [10, 25, 50, 100],
  },

  tableTitle: { type: String, default: 'Tabla de Datos' },
  tableIcon: { type: String, default: 'bi-table' },
});

const emit = defineEmits([
  'update:search',
  'update:perPage',
  'update:currentPage',
  'create',
  'edit',
  'delete',
]);

// Helpers
const hasActions = computed(() => props.showEdit || props.showDelete);

// Estado local
const localSearch = ref(props.search);
const localPerPage = ref(props.perPage);
const localCurrentPage = ref(props.currentPage);

// Emitir cambios al padre
watch(localSearch, (val) => emit('update:search', val));
watch(localPerPage, (val) => emit('update:perPage', val));
watch(localCurrentPage, (val) => emit('update:currentPage', val));

// Filtrado y paginación
const filteredItems = computed(() => {
  if (!localSearch.value) return props.data;
  return props.data.filter((item) =>
    props.columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(localSearch.value.toLowerCase()),
    ),
  );
});

const totalPages = computed(() => Math.ceil(filteredItems.value.length / localPerPage.value) || 1);

const paginatedItems = computed(() => {
  const start = (localCurrentPage.value - 1) * localPerPage.value;
  return filteredItems.value.slice(start, start + localPerPage.value);
});
</script>
