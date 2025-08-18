<template>
  <form @submit.prevent="saveBranch" novalidate>
    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Nombre</label>
        <input
          v-model="localBranch.name"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.name,
            'is-valid': submitted && !!localBranch.name,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>

      <div class="col">
        <label class="form-label">Teléfono</label>
        <input
          v-model="localBranch.phone"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.phone,
            'is-valid': submitted && !!localBranch.phone,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Calle</label>
        <input
          v-model="localBranch.streat"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.streat,
            'is-valid': submitted && !!localBranch.streat,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>

      <div class="col">
        <label class="form-label">Código Postal</label>
        <input
          v-model="localBranch.zip"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.zip,
            'is-valid': submitted && !!localBranch.zip,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Ciudad</label>
        <input
          v-model="localBranch.city"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.city,
            'is-valid': submitted && !!localBranch.city,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>

      <div class="col">
        <label class="form-label">Estado</label>
        <input
          v-model="localBranch.state"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.state,
            'is-valid': submitted && !!localBranch.state,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">País</label>
        <input
          v-model="localBranch.country"
          type="text"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.country,
            'is-valid': submitted && !!localBranch.country,
          }"
          required
        />
        <div class="invalid-feedback">Este campo es requerido.</div>
      </div>

      <div class="col">
        <label class="form-label">Estatus</label>
        <select
          v-model="localBranch.status_id"
          class="form-control"
          :class="{
            'is-invalid': submitted && !localBranch.status_id,
            'is-valid': submitted && !!localBranch.status_id,
          }"
          required
        >
          <option disabled value="">Seleccione un estatus</option>
          <option :value="1">Activo</option>
          <option :value="2">Inactivo</option>
        </select>
        <div class="invalid-feedback">Debe seleccionar un estatus.</div>
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

const localBranch = ref({
  name: '',
  phone: '',
  streat: '',
  zip: '',
  city: '',
  state: '',
  country: '',
  status_id: '',
});

watch(
  () => props.model,
  (newVal) => {
    const val =
      newVal && typeof newVal === 'object' && '_value' in newVal
        ? newVal.value // desenvuelve ref anidado si lo hay
        : newVal;

    localBranch.value = {
      name: val?.name || '',
      phone: val?.phone || '',
      streat: val?.streat || '',
      zip: val?.zip || '',
      city: val?.city || '',
      state: val?.state || '',
      country: val?.country || '',
      status_id: String(val?.status_id || ''),
    };
  },
  { immediate: true },
);

const save = () => {
  submitted.value = true;

  const requiredFields = [
    'name',
    'phone',
    'streat',
    'zip',
    'city',
    'state',
    'country',
    'status_id',
  ];

  const isValid = requiredFields.every((field) => !!localBranch.value[field]);
  if (!isValid) return;

  emit('save', {
    name: localBranch.value.name,
    phone: localBranch.value.phone,
    streat: localBranch.value.streat,
    zip: localBranch.value.zip,
    city: localBranch.value.city,
    state: localBranch.value.state,
    country: localBranch.value.country,
    status_id: Number(localBranch.value.status_id),
  });
};

defineExpose({ save });
</script>
