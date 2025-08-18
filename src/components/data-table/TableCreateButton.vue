<template>
  <button
    class="btn btn-primary d-flex align-items-center gap-2 px-4 py-2 fw-semibold shadow-sm"
    @click="$emit('click')"
  >
    <i class="bi bi-plus-circle fs-5"></i>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: 'Agregar',
  },
});

defineEmits(['click']);
</script>
