<template>
  <div class="d-flex align-items-center gap-2 mb-4">
    <i v-if="icon" :class="`bi ${icon} fs-3 text-primary`"></i>
    <h2 class="m-0 fw-bold">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '', // Ej: 'bi-table'
  },
});
</script>
