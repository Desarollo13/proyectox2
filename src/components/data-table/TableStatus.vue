<template>
  <div class="d-flex justify-content-center align-items-center gap-3">
    <span class="badge" :class="status === 1 ? 'bg-success' : 'bg-danger'">
      {{ status === 1 ? 'Activo' : 'Inactivo' }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  status: {
    type: [Number, String],
    required: true,
  },
});
</script>
