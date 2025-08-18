<template>
  <nav aria-label="Paginación">
    <ul class="pagination justify-content-center my-3">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link"
          @click="$emit('update:currentPage', currentPage - 1)"
          :disabled="currentPage === 1"
        >
          ‹
        </button>
      </li>

      <li class="page-item disabled">
        <span class="page-link bg-light border-0 text-dark">
          {{ currentPage }} / {{ totalPages }}
        </span>
      </li>

      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          class="page-link"
          @click="$emit('update:currentPage', currentPage + 1)"
          :disabled="currentPage === totalPages"
        >
          ›
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

defineEmits(['update:currentPage']);
</script>
