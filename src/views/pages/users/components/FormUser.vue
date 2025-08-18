<template>
  <form @submit.prevent="saveUser">
    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Nombre</label>
        <input v-model="localUser.name" type="text" class="form-control" required />
      </div>
      <div class="col">
        <label class="form-label">Apellido Paterno</label>
        <input v-model="localUser.last_name" type="text" class="form-control" required />
      </div>
      <div class="col">
        <label class="form-label">Apellido Materno</label>
        <input v-model="localUser.second_last_name" type="text" class="form-control" required />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Usuario</label>
        <input v-model="localUser.username" type="text" class="form-control" required />
      </div>
      <div class="col">
        <label class="form-label">Email</label>
        <input v-model="localUser.email" type="email" class="form-control" required />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Contraseña</label>
        <div class="input-group">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="localUser.password"
            class="form-control"
            required
          />
          <button @click.prevent="togglePassword" type="button" class="btn btn-outline-secondary">
            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>
      <div class="col">
        <label class="form-label">Confirmar Contraseña</label>
        <div class="input-group">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="localUser.confirmPassword"
            class="form-control"
            required
          />
          <button
            @click.prevent="toggleConfirmPassword"
            type="button"
            class="btn btn-outline-secondary"
          >
            <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <label class="form-label">Estado</label>
        <select v-model="localUser.status_id" class="form-control" required>
          <option disabled value="">Seleccione un estado</option>
          <option :value="1">Activo</option>
          <option :value="2">Inactivo</option>
        </select>
      </div>
      <div class="col">
        <label class="form-label">Rol</label>
        <select v-model="localUser.role_id" class="form-control" required>
          <option disabled value="">Seleccione un rol</option>
          <option :value="1">Administrador</option>
          <option :value="2">Supervisor</option>
          <option :value="3">Operativo</option>
        </select>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  user: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['close', 'save']);

const localUser = ref({ ...props.user });

watch(
  () => props.user,
  (newVal) => {
    localUser.value = { ...newVal };
  },
  { immediate: true, deep: true },
);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => (showPassword.value = !showPassword.value);
const toggleConfirmPassword = () => (showConfirmPassword.value = !showConfirmPassword.value);

const saveUser = () => {
  emit('save', { ...localUser.value });
};

defineExpose({ saveUser });
</script>
