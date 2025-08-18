<template>
  <div ref="observerRef">
    <component v-if="isVisible" :is="component" />
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';

defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const isVisible = ref(false);
const observerRef = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect(); // solo la primera vez
      }
    },
    {
      threshold: 0.1,
    },
  );

  if (observerRef.value) {
    observer.observe(observerRef.value);
  }
});
</script>
