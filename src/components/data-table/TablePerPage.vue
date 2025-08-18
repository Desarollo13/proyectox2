<template>
  <div class="d-flex align-items-center gap-2 mb-2">
    <label class="mb-0">Mostrar</label>
    <select
      class="form-select form-select-sm w-auto"
      :value="modelValue"
      @change="$emit('update:modelValue', +$event.target.value)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <span>registros</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    default: 10,
  },
  options: {
    type: Array,
    default: () => [10, 25, 50, 100],
  },
});

defineEmits(['update:modelValue']);
</script>
