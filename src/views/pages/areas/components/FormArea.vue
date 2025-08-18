<template>
  <form @submit.prevent="saveArea" novalidate>
    <div class="row mb-3">
      <div class="col-12">
        <label class="form-label">Nombre</label>
        <input
          v-model="localArea.name"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localArea.name,
            'is-valid': submitted && !!localArea.name,
          }"
          placeholder="Escribe un área"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <label class="form-label">Estado</label>
        <select
          v-model="localArea.status_id"
          class="form-control"
          :class="{
            'is-invalid': submitted && localArea.status_id === '',
            'is-valid': submitted && localArea.status_id !== '',
          }"
          required
        >
          <option disabled value="">Seleccione un estado</option>
          <option :value="1">Activo</option>
          <option :value="2">Inactivo</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un estado.</div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['save']);
const submitted = ref(false);

const localArea = ref({
  name: '',
  status_id: '',
});

watch(
  () => props.model,
  (newVal) => {
    if (newVal && typeof newVal === 'object') {
      localArea.value = {
        name: newVal.name ?? '',
        status_id: newVal.status_id ?? '',
      };
    }
  },
  { immediate: true, deep: true },
);

const save = () => {
  submitted.value = true;

  const isValid =
    !!localArea.value.name &&
    localArea.value.status_id !== '';

  if (!isValid) return;

  emit('save', {
    name: localArea.value.name,
    status_id: Number(localArea.value.status_id),
  });
};

defineExpose({ save });
</script>
