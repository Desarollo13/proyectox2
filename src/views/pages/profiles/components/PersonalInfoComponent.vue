<template>
  <CardContainer>
    <h5 class="text-primary fw-bold mb-4">Datos Personales</h5>
    <div class="row mb-4">
      <div class="col-md-4" v-for="(value, key) in existingData" :key="key">
        <div class="mb-2">
          <label class="fw-semibold text-muted">{{ key }}</label>
          <input type="text" class="form-control" :value="value" disabled />
        </div>
      </div>
    </div>

    <h5 class="text-primary fw-bold mb-4">Domicilio</h5>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="field in fields" :key="field.model">
        <label class="fw-semibold">{{ field.label }}</label>
        <component
          :is="field.type === 'select' ? 'select' : 'input'"
          v-model="form[field.model]"
          v-bind="field.type === 'select' ? {} : { type: field.inputType || 'text' }"
          :class="['form-control', field.status]"
        >
          <option v-if="field.type === 'select'" disabled value="">Seleccione una opción</option>
          <option v-for="opt in field.options || []" :key="opt" :value="opt">{{ opt }}</option>
        </component>
        <div v-if="field.status === 'is-invalid'" class="invalid-feedback">
          {{ field.errorMessage }}
        </div>
      </div>

      <div class="col-md-4 mb-3 d-flex flex-column align-items-center">
        <label class="fw-semibold">Foto de Perfil</label>
        <input type="file" accept="image/*" @change="handleFileChange" class="form-control mb-2" />
        <img
          v-if="fotoPreview"
          :src="fotoPreview"
          alt="Foto Perfil"
          class="img-thumbnail"
          style="max-width: 150px"
        />
      </div>
    </div>

    <div class="text-end">
      <button class="btn btn-primary" @click="onSubmit">Guardar</button>
    </div>
  </CardContainer>
</template>

<script setup>
import { ref, watch } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';

const existingData = ref({
  apellidoPaterno: 'Ramírez',
  apellidoMaterno: 'Zavala',
  nombres: 'Cristofer',
  fechaNacimiento: '1996-04-25',
  genero: 'Masculino',
  correoElectronico: 'test@example.com',
  medioContacto: 'Whatsapp',
  telefonoCasa: '5544332211',
  celular: '5511223344',
});

const form = ref({
  numeroInterior: '',
  numeroExterior: '',
  codigoPostal: '',
  casaDepartamento: '',
  referenciaCercana: '',
  fotoPerfil: null,
});

const fields = ref([
  {
    label: 'Número Interior',
    model: 'numeroInterior',
    errorMessage: 'Número interior es requerido',
    status: ref(''),
  },
  {
    label: 'Número Exterior',
    model: 'numeroExterior',
    errorMessage: 'Número exterior es requerido',
    status: ref(''),
  },
  {
    label: 'Código Postal',
    model: 'codigoPostal',
    errorMessage: 'Código postal es requerido',
    status: ref(''),
  },
  {
    label: 'Casa/Departamento',
    model: 'casaDepartamento',
    type: 'select',
    options: ['Casa', 'Departamento'],
    errorMessage: 'Casa o Departamento es requerido',
    status: ref(''),
  },
  {
    label: 'Referencia Cercana',
    model: 'referenciaCercana',
    errorMessage: 'Referencia cercana es requerida',
    status: ref(''),
  },
]);

fields.value.forEach((field) => {
  watch(
    () => form.value[field.model],
    (val) => {
      field.status.value = val && val.trim() !== '' ? 'is-valid' : 'is-invalid';
    },
  );
});

const fotoPreview = ref(null);
const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    form.value.fotoPerfil = file;
    fotoPreview.value = URL.createObjectURL(file);
  }
};

const validateAll = () => {
  let valid = true;
  fields.value.forEach((field) => {
    const val = form.value[field.model];
    field.status.value = val && val.trim() !== '' ? 'is-valid' : 'is-invalid';
    if (field.status.value === 'is-invalid') valid = false;
  });
  return valid;
};

const onSubmit = () => {
  if (!validateAll()) return;

  console.log('Datos completos:', {
    ...existingData.value,
    ...form.value,
  });
  alert('Datos enviados exitosamente.');
};
</script>

<style scoped>
h5 {
  text-transform: uppercase;
  font-size: 18px;
}
</style>
