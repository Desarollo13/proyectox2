<template>
  <CardContainer>
    <DataTable
      :tableTitle="title"
      :tableIcon="icon"
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

    <UnicModal
      :visible="showModal"
      :title="selectedItem?.id ? 'Editar' : 'Crear'"
      size="lg"
      @close="showModal = false"
    >
      <component
        :is="formComponent"
        ref="formRef"
        :visible="showModal"
        :model="selectedItem"
        @close="showModal = false"
        @save="handleSave"
      />

      <template #footer>
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-danger" @click="showModal = false">Cancelar</button>
          <button class="btn btn-primary" @click="handleAccept" :disabled="isLoading">
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span v-else>Aceptar</span>
          </button>
        </div>
      </template>
    </UnicModal>

    <AlertMessage
      :show="showAlert"
      v-bind="alertOptions"
      @closed="handleAlertClosed"
      @confirmed="confirmDelete"
      @cancelled="handleAlertClosed"
    />

    <LoadingSpinner v-if="isLoading && !showModal" />
  </CardContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';
import DataTable from '@/components/data-table/DataTable.vue';
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue';
import AlertMessage from '@/components/alerts/AlertModal.vue';
import UnicModal from '@/components/modals/UnicModal.vue';

const props = defineProps({
  title: String,
  icon: String,
  columns: Array,
  formComponent: Object,
  api: Object,
  transform: Function,
});

const showModal = ref(false);
const selectedItem = ref(null);
const items = ref([]);
const search = ref('');
const perPage = ref(10);
const currentPage = ref(1);
const isLoading = ref(false);
const showAlert = ref(false);
const alertOptions = ref({});
let itemToDelete = null;
const formRef = ref(null);

const fetchItems = async () => {
  isLoading.value = true;
  try {
    const res = await props.api.getAll();
    const rawItems = res.data;
    items.value = props.transform ? rawItems.map(props.transform) : rawItems;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  } finally {
    isLoading.value = false;
  }
};

function handleCreate() {
  selectedItem.value = null;
  showModal.value = true;
}

async function editItem(item) {
  try {
    const res = await props.api.getById(item.id);
    selectedItem.value = res.data;
    showModal.value = true;
  } catch (error) {
    console.error('Error al obtener detalles:', error);
    alertOptions.value = {
      icon: 'error',
      title: 'Error',
      message: 'No se pudieron cargar los datos del registro.',
      showConfirmButton: true,
    };
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
}

function deleteItem(item) {
  itemToDelete = item;
  alertOptions.value = {
    icon: 'warning',
    title: '¿Estás seguro?',
    message: `¿Deseas cambiar el estado de "${item.name}"?`,
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
  };
  showAlert.value = true;
}

function handleAlertClosed() {
  showAlert.value = false;
  alertOptions.value = {};
}

function handleAccept() {
  if (formRef.value?.save) {
    formRef.value.save();
  }
}

async function handleSave(formData) {
  if (!formData) return;
  const isEdit = selectedItem.value?.id;

  try {
    isLoading.value = true;
    if (isEdit) {
      await props.api.update(selectedItem.value.id, formData);
    } else {
      await props.api.create(formData);
    }

    await fetchItems();
    alertOptions.value = {
      icon: 'success',
      title: isEdit ? 'Registro actualizado correctamente.' : 'Registro creado correctamente.',
      timer: 1500,
      showConfirmButton: false,
    };
    showAlert.value = true;
    showModal.value = false;
  } catch (error) {
    console.error('Error al guardar:', error);
    alertOptions.value = {
      icon: 'error',
      title: 'Error',
      message: 'Ocurrió un error al guardar.',
      showConfirmButton: true,
    };
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
}

async function confirmDelete() {
  if (!itemToDelete) return;

  try {
    isLoading.value = true;
    await props.api.deleteItem(itemToDelete.id);
    await fetchItems();

    alertOptions.value = {
      icon: 'success',
      title: 'Estado actualizado correctamente.',
      timer: 1500,
      showConfirmButton: false,
    };
    showAlert.value = true;
  } catch (error) {
    console.error('Error al cambiar el estado:', error);
    alertOptions.value = {
      icon: 'error',
      title: 'Error',
      message: 'Ocurrió un error al cambiar el estado.',
      showConfirmButton: true,
    };
    showAlert.value = true;
  } finally {
    isLoading.value = false;
    itemToDelete = null;
  }
}

onMounted(fetchItems);
</script>
