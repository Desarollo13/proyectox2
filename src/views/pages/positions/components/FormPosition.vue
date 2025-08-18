<template>
  <form @submit.prevent="savePosition" novalidate>
    <div class="row mb-3">
      <div class="col-12">
        <label class="form-label">Puesto</label>
        <input
          v-model="localPosition.name"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localPosition.name,
            'is-valid': submitted && !!localPosition.name,
          }"
          placeholder="Ingresa el puesto"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-12">
        <label class="form-label">Estado</label>
        <select
          v-model="localPosition.status_id"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localPosition.status_id,
            'is-valid': submitted && !!localPosition.status_id,
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

const localPosition = ref({
  name: '',
  status_id: '',
  ...props.model,
});

watch(
  () => props.model,
  (newVal) => {
    if (newVal && typeof newVal === 'object') {
      localPosition.value = {
        name: newVal.name || '',
        status_id: newVal.status_id || '',
      };
    }
  },
  { immediate: true, deep: true },
);

const save = () => {
  submitted.value = true;

  const isValid = !!localPosition.value.name && !!localPosition.value.status_id;
  if (!isValid) return;

  emit('save', {
    name: localPosition.value.name,
    status_id: Number(localPosition.value.status_id),
  });
};

defineExpose({ save });
</script>
