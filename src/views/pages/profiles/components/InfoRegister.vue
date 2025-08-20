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
            :class="['form-control', field.status]"
            :placeholder="field.placeholder || ''"
          >
            <option v-if="field.type === 'select'" disabled value="">Selecciona una opción</option>
            <option v-for="opt in field.options || []" :key="opt" :value="opt">
              {{ opt }}
            </option>
          </component>

          <div v-if="field.status === 'is-invalid'" class="invalid-feedback">
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
import { reactive, watch } from 'vue';
import CardContainer from '@/components/utils/CardContainer.vue';

const form = reactive({
  apellido_paterno: '',
  apellido_materno: '',
  nombres: '',
  Sucursal:'',
  Area:'',
  Puesto:'',
  Roles:'',
  Dominio:'',
  fecha_nacimiento: '',
  genero: '',
  correo_electronico: '',
  medio_contacto: '',
  telefono_casa: '',
  celular: '',
  Jefe_Supervisión:'',

});

const fields = [
  {
    label: 'Apellido Paterno',
    model: 'apellido_paterno',
    errorMessage: 'Este campo es obligatorio.',
    status: '',
  },
  {
    label: 'Apellido Materno',
    model: 'apellido_materno',
    errorMessage: 'Este campo es obligatorio.',
    status: '',
  },
  { label: 'Nombres', model: 'nombres', errorMessage: 'Este campo es obligatorio.', status: '' },
  {
    label: 'Fecha de Nacimiento',
    model: 'fecha_nacimiento',
    inputType: 'date',
    errorMessage: 'Este campo es obligatorio.',
    status: '',
  },
  {
    label: 'Género',
    model: 'genero',
    type: 'select',
    options: ['Masculino', 'Femenino', 'Otro'],
    errorMessage: 'Este campo es obligatorio.',
    status: '',
  },
  { label: 'Sucursal', model: 'sucursal' ,errorMessage: 'Este campo es obligatorio.',},
  {label: 'Area', model: 'area' ,errorMessage: 'Este campo es obligatorio.',},
  {label: 'Puesto',model: 'puesto',errorMessage: 'Este campo es obligatorio.', },
  {label:'Roles',model: 'roles' ,errorMessage: 'Este campo es obligatorio.',},
  {label:'Jefe Supervisión',model: 'fecha_nacimiento', errorMessage: 'Este campo es obligatorio.',},
  {
    label: 'Correo Electrónico',
    model: 'correo_electronico',
    inputType: 'email',
    errorMessage: 'Correo inválido.',
    validator: (v) => /^\S+@\S+\.\S+$/.test(v),
    status: '',
  },

  {
    label: 'Teléfono Casa',
    model: 'telefono_casa',
    errorMessage: 'Este campo es obligatorio.',
    status: '',
  },
  { label: 'Celular (Whats App)', model: 'celular', errorMessage: 'Este campo es obligatorio.', status: '' },
  {label:'Dominio',model: 'dominio',errorMessage: 'Este campo es obligatorio.' },
];

fields.forEach((field) => {
  watch(
    () => form[field.model],
    (val) => {
      if (!val) {
        field.status = '';
      } else if (field.validator) {
        field.status = field.validator(val) ? 'is-valid' : 'is-invalid';
      } else {
        field.status = val.trim() !== '' ? 'is-valid' : 'is-invalid';
      }
    },
  );
});

const validateAll = () => {
  let valid = true;
  fields.forEach((field) => {
    const val = form[field.model];
    if (field.validator) {
      field.status = field.validator(val) ? 'is-valid' : 'is-invalid';
    } else {
      field.status = val.trim() !== '' ? 'is-valid' : 'is-invalid';
    }

    if (field.status === 'is-invalid') valid = false;
  });
  return valid;
};

const onSubmit = () => {
  if (!validateAll()) return;
  console.log('Formulario enviado:', form);
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
