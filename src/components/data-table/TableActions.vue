<template>
  <div class="d-flex justify-content-center align-items-center gap-3">
    <button v-if="showEdit" class="btn btn-outline-primary btn-lg d-flex align-items-center justify-content-center"
      @click="$emit('edit', row)" title="Editar">
      <i class="bi bi-pencil-square"></i>
    </button>

    <button v-if="showDelete" :class="statusId === 1 ? 'btn btn-outline-danger' : 'btn btn-outline-success'"
      class="btn btn-lg d-flex align-items-center justify-content-center" @click="$emit('delete', row)"
      :title="statusId === 1 ? 'Desactivar' : 'Reactivar'">
      <i :class="statusId === 1 ? 'bi bi-trash' : 'bi bi-arrow-clockwise'"></i>
    </button>
  </div>
</template>

<script setup>
const { row, showEdit, showDelete } = defineProps({
  row: {
    type: Object,
    required: true,
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['edit', 'delete']);

const statusId = Number(row.status_id);
</script>
