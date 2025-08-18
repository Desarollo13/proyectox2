<template>
  <section class="mb-10 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200">
    <h2 class="text-xl font-bold text-primary flex items-center gap-2 mb-6 border-b pb-2">
      <i :class="icon" class="text-xl text-primary"></i>
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
