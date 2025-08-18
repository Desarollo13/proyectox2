<template>
  <div>
    <LoadingSpinner v-if="isLoading" />

    <div v-else>
      <div class="row">
        <!-- Formulario de Referencias -->
        <div class="col-lg-8">
          <CardContainer>
            <h5 class="text-primary fw-bold mb-4">Referencias Laborales</h5>

            <div class="row">
              <div class="col-md-6 mb-3" v-for="(field, idx) in fields" :key="idx">
                <label class="fw-semibold">{{ field.label }}</label>
                <input
                  v-model="form[field.model]"
                  :type="field.type || 'text'"
                  :class="['form-control', field.status]"
                  :disabled="field.model === 'fechaFin' && form.actualmenteLaborando"
                />
                <div v-if="field.status === 'is-invalid'" class="invalid-feedback">
                  {{ field.errorMessage }}
                </div>
              </div>

              <div class="col-md-12 mb-3">
                <label class="fw-semibold">Motivo de Salida</label>
                <textarea
                  v-model="form.motivoSalida"
                  class="form-control"
                  :class="motivoSalidaStatus"
                  rows="2"
                ></textarea>
                <div v-if="motivoSalidaStatus === 'is-invalid'" class="invalid-feedback">
                  Este campo es obligatorio.
                </div>
              </div>
            </div>

            <div class="text-end mb-4">
              <button class="btn btn-primary" @click="addOrUpdateExperience">
                {{ editingIndex !== null ? 'Actualizar Experiencia' : 'Agregar Experiencia' }}
              </button>
            </div>

            <h6 class="text-primary fw-bold">Experiencias Agregadas</h6>
            <ul class="list-group mb-4">
              <li
                v-for="(exp, index) in experiences"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                {{ exp.empresa }} - {{ exp.cargo }}
                <div>
                  <button class="btn btn-sm btn-warning me-2" @click="editExperience(index)">
                    Editar
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteExperience(index)">
                    Eliminar
                  </button>
                </div>
              </li>
            </ul>

            <div class="text-end">
              <button class="btn btn-primary" @click="onSubmit">Guardar Todo</button>
            </div>
          </CardContainer>
        </div>

        <!-- Perfil lateral -->
        <div class="col-lg-4">
          <CardContainer>
            <div class="text-center">
              <img :src="ImgProfile" class="rounded-circle mb-3" alt="Avatar" />
              <h5>{{ profileData.nombre }}</h5>
              <p class="text-muted">{{ profileData.edad }}</p>
              <p class="text-muted">{{ profileData.ubicacion }}</p>
            </div>

            <h6 class="text-primary fw-bold mt-4 mb-3 text-center">Subir Documentos</h6>
            <div
              v-for="doc in documents"
              :key="doc.name"
              class="d-flex justify-content-between align-items-center mb-2"
            >
              <span class="small">{{ doc.name }}</span>
              <div>
                <span v-if="doc.uploaded" class="badge bg-success">✔️</span>
                <span v-else class="badge bg-danger">Sin Archivo</span>
              </div>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue';
import ImgProfile from '@/assets/img/avatar-1.jpg';

const isLoading = ref(true);
onMounted(() => {
  setTimeout(() => (isLoading.value = false), 2000);
});

const profileData = ref({
  nombre: 'John Doe',
  edad: '32 años',
  ubicacion: 'México, CDMX',
});

const documents = ref([
  { name: 'Acta de Nacimiento', uploaded: false },
  { name: 'Constancia de Estudio', uploaded: false },
  { name: 'CIF', uploaded: false },
  { name: 'Certificado Médico', uploaded: true },
  { name: 'Comprobante de Domicilio', uploaded: false },
  { name: 'Seguro Social', uploaded: false },
]);

const form = ref({
  empresa: '',
  funcion: '',
  fechaInicio: '',
  fechaFin: '',
  actualmenteLaborando: false,
  rangoSalario: 0,
  contacto: '',
  cargo: '',
  numero: '',
  correo: '',
  motivoSalida: '',
  observacionDocumento: '',
});

const experiences = ref([]);
const editingIndex = ref(null);

const motivoSalidaStatus = ref('');

const fields = ref([
  {
    label: 'Empresa',
    model: 'empresa',
    status: ref(''),
    errorMessage: 'Este campo es obligatorio.',
  },
  {
    label: 'Función',
    model: 'funcion',
    status: ref(''),
    errorMessage: 'Este campo es obligatorio.',
  },
  {
    label: 'Fecha de Inicio',
    model: 'fechaInicio',
    type: 'date',
    status: ref(''),
    errorMessage: 'Este campo es obligatorio.',
  },
  { label: 'Fecha de Fin', model: 'fechaFin', type: 'date', status: ref('') },
  {
    label: 'Contacto',
    model: 'contacto',
    status: ref(''),
    errorMessage: 'Este campo es obligatorio.',
  },
  { label: 'Cargo', model: 'cargo', status: ref(''), errorMessage: 'Este campo es obligatorio.' },
  { label: 'Número', model: 'numero', status: ref('') },
  {
    label: 'Correo',
    model: 'correo',
    status: ref(''),
    errorMessage: 'Correo inválido.',
    validator: (v) => /^\S+@\S+\.\S+$/.test(v),
  },
]);

fields.value.forEach((field) => {
  watch(
    () => form.value[field.model],
    (val) => {
      if (!val) {
        field.status.value = '';
      } else if (field.validator) {
        field.status.value = field.validator(val) ? 'is-valid' : 'is-invalid';
      } else {
        field.status.value = val.trim() !== '' ? 'is-valid' : 'is-invalid';
      }
    },
  );
});

watch(
  () => form.value.motivoSalida,
  (val) => {
    motivoSalidaStatus.value = val.trim() !== '' ? 'is-valid' : 'is-invalid';
  },
);

const validateAll = () => {
  let valid = true;
  fields.value.forEach((field) => {
    const val = form.value[field.model];
    if (field.validator) {
      field.status.value = field.validator(val) ? 'is-valid' : 'is-invalid';
    } else {
      field.status.value = val.trim() !== '' ? 'is-valid' : 'is-invalid';
    }
    if (field.status.value === 'is-invalid') valid = false;
  });
  motivoSalidaStatus.value = form.value.motivoSalida.trim() !== '' ? 'is-valid' : 'is-invalid';
  if (motivoSalidaStatus.value === 'is-invalid') valid = false;
  return valid;
};

const resetForm = () => {
  Object.assign(form.value, {
    empresa: '',
    funcion: '',
    fechaInicio: '',
    fechaFin: '',
    actualmenteLaborando: false,
    rangoSalario: 0,
    contacto: '',
    cargo: '',
    numero: '',
    correo: '',
    motivoSalida: '',
    observacionDocumento: '',
  });
  editingIndex.value = null;
  fields.value.forEach((f) => (f.status.value = ''));
  motivoSalidaStatus.value = '';
};

const addOrUpdateExperience = () => {
  if (!validateAll()) return;
  if (editingIndex.value !== null) {
    experiences.value[editingIndex.value] = { ...form.value };
  } else {
    experiences.value.push({ ...form.value });
  }
  resetForm();
};

const editExperience = (index) => {
  form.value = { ...experiences.value[index] };
  editingIndex.value = index;
};

const deleteExperience = (index) => {
  experiences.value.splice(index, 1);
  if (editingIndex.value === index) resetForm();
};

const onSubmit = () => {
  if (experiences.value.length === 0) {
    alert('Agrega al menos una experiencia laboral.');
    return;
  }
  console.log('Experiencias enviadas:', experiences.value);
  alert('¡Experiencias guardadas!');
};
</script>

<style scoped>
img.rounded-circle {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>
