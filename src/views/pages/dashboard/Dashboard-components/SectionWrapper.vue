<template>
  <section class="mb-8 p-6 bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-gray-200 dark:bg-gray-800/70">
    <h2 class="text-lg font-semibold text-primary flex items-center gap-2 mb-4 border-b pb-2">
      <i :class="icon" class="text-primary text-xl"></i>
      {{ title }}
    </h2>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
  icon: String
})
</script>
