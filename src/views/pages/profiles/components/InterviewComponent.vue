<template>
  <CardContainer>
    <form @submit.prevent="onSubmit">
      <div class="form-grid">
        <div class="form-group" v-for="field in fields" :key="field.model">
          <label>{{ field.label }}</label>

          <component
            :is="field.type === 'select' ? 'select' : 'input'"
            v-model="form[field.model]"
            v-bind="field.type === 'select' ? {} : { type: field.inputType || 'text' }"
            :class="['form-control', status[field.model]]"
            :placeholder="field.placeholder || ''"
          >
            <option v-if="field.type === 'select'" value="">Selecciona una opción</option>
            <option v-for="opt in field.options || []" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </component>

          <div v-if="status[field.model] === 'is-invalid'" class="invalid-feedback">
            {{ field.errorMessage }}
          </div>
        </div>
      </div>

      <div class="text-end mt-4">
        <button class="btn btn-primary" type="submit">Guardar</button>
      </div>
    </form>
  </CardContainer>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';

const form = reactive({
  apellido_paterno: '',
  apellido_materno: '',
  nombres: '',
  fecha_nacimiento: '',
  genero: '',
  correo_electronico: '',
  medio_contacto: '',
  telefono_casa: '',
  celular: '',
});

const status = reactive({});

const fields = [
  {
    label: 'Apellido Paterno',
    model: 'apellido_paterno',
    errorMessage: 'Este campo es obligatorio.',
  },
  {
    label: 'Apellido Materno',
    model: 'apellido_materno',
    errorMessage: 'Este campo es obligatorio.',
  },
  { label: 'Nombres', model: 'nombres', errorMessage: 'Este campo es obligatorio.' },
  {
    label: 'Fecha de Nacimiento',
    model: 'fecha_nacimiento',
    inputType: 'date',
    errorMessage: 'Este campo es obligatorio.',
  },
  {
    label: 'Género',
    model: 'genero',
    type: 'select',
    options: ['Masculino', 'Femenino', 'Otro'],
    errorMessage: 'Este campo es obligatorio.',
  },
  {
    label: 'Correo Electrónico',
    model: 'correo_electronico',
    inputType: 'email',
    errorMessage: 'Correo inválido.',
    validator: (v) => /^\S+@\S+\.\S+$/.test(v),
  },
  {
    label: 'Medio de Contacto Vacante',
    model: 'medio_contacto',
    type: 'select',
    options: ['Correo', 'Teléfono Casa', 'Celular'],
    errorMessage: 'Este campo es obligatorio.',
  },
  { label: 'Teléfono Casa', model: 'telefono_casa', errorMessage: 'Este campo es obligatorio.' },
  { label: 'Celular', model: 'celular', errorMessage: 'Este campo es obligatorio.' },
];

fields.forEach((field) => {
  status[field.model] = '';

  watch(
    () => form[field.model],
    (val) => {
      if (!val) {
        status[field.model] = '';
      } else if (field.validator) {
        status[field.model] = field.validator(val) ? 'is-valid' : 'is-invalid';
      } else {
        status[field.model] = val.trim() !== '' ? 'is-valid' : 'is-invalid';
      }
    },
  );
});

const validateAll = () => {
  let valid = true;

  fields.forEach((field) => {
    const val = form[field.model];

    if (field.validator) {
      status[field.model] = field.validator(val) ? 'is-valid' : 'is-invalid';
    } else {
      status[field.model] = val.trim() !== '' ? 'is-valid' : 'is-invalid';
    }

    if (status[field.model] === 'is-invalid') valid = false;
  });

  return valid;
};

const onSubmit = () => {
  if (!validateAll()) return;
  console.log('Formulario enviado', form);
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input,
select {
  font-size: 14px;
}
</style>
