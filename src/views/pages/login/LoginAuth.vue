<template>
  <div class="login-page d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-sm rounded-4 p-4 login-card position-relative">

      <!-- Encabezado sencillo -->
      <div class="text-center mb-3">
        <img :src="logoNexen" alt="Nexen" class="mb-2" style="height:44px" />
        <h6 class="text-muted fw-semibold mb-0">Ingresa tus credenciales</h6>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="handleLogin" novalidate>
        <div class="mb-3">
          <label for="username" class="form-label small text-uppercase fw-semibold">Usuario</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="form-control"
            :class="{
              'is-invalid': usernameTouched && !validUsername,
              'is-valid': validUsername
            }"
            autocomplete="username"
          />
          <div v-if="usernameTouched && !validUsername" class="invalid-feedback">
            Ingresa un usuario válido (mín. 3 caracteres).
          </div>
        </div>

        <div class="mb-2">
          <label for="password" class="form-label small text-uppercase fw-semibold">Contraseña</label>
          <div class="input-group">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              :class="{
                'is-invalid': passwordTouched && !validPassword,
                'is-valid': validPassword
              }"
              autocomplete="current-password"
            />
            <button class="btn btn-outline-secondary" type="button" @click="togglePassword" tabindex="-1">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
          </div>
          <div v-if="passwordTouched && !validPassword" class="invalid-feedback">
            La contraseña debe tener al menos 6 caracteres.
          </div>
        </div>

        <div class="text-center mt-2">
          <small class="text-muted">
            ¿Olvidaste tu usuario o contraseña?
            <br />
            <router-link to="#" class="text-primary fw-semibold">Recuperar acceso</router-link>
          </small>
        </div>

        <button type="submit" class="btn btn-primary w-100 mt-4">Iniciar sesión</button>
      </form>

      <small class="text-muted d-block text-center mt-3">
        © Nexen E-Logistics 2025 · Todos los derechos reservados
      </small>
    </div>

    <!-- Modales / loading (sin cambios) -->
    <AlertModal
      :show="showSuccess"
      icon="success"
      title="¡Bienvenido!"
      message="Inicio de sesión exitoso."
      :timer="1500"
      :show-confirm-button="false"
      @closed="router.push({ name: 'dashboard' })"
    />
    <AlertModal
      :show="showError"
      icon="error"
      title="¡Error de autenticación!"
      :message="loginError"
      confirm-button-text="Cerrar"
      :show-cancel-button="false"
      @closed="showError = false"
    />
    <LoadingSpinner v-if="isLoading" />
  </div>
</template>

<script setup>
import logoPrincipal from '@/assets/img/RH.png';
import logoNexen from '@/assets/img/logoNexen.png';
import peopleImage from '@/assets/img/people.png';

import AlertModal from '@/components/alerts/AlertModal.vue';
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue';
import { useLogin } from './useLogin';
import { ref } from 'vue';

const showPassword = ref(false);
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const {
  isLoading,
  username,
  password,
  usernameTouched,
  passwordTouched,
  loginError,
  showSuccess,
  showError,
  validUsername,
  validPassword,
  handleLogin,
  router,
} = useLogin();
</script>

<style scoped>
.login-container {
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 20px;
  position: relative;
}

.animated-entry {
  animation: bounceIn 0.8s ease forwards;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(100px);
  }
  60% {
    opacity: 1;
    transform: scale(1.05) translateY(-20px);
  }
  80% {
    transform: scale(0.98) translateY(10px);
  }
  100% {
    transform: scale(1) translateY(0);
  }
}

.back-btn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  font-size: 1.5rem;
  padding: 0.3rem 0.6rem;
  background: none;
  border: none;
  color: var(--primary);
}

.back-btn:hover {
  background: none;
  color: #0d6efd;
  box-shadow: none;
}

@media (max-width: 768px) {
  .login-container {
    border-radius: 0;
    margin: 0 1rem;
  }

  .border-end {
    border-right: none !important;
  }
}
@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.floating-image {
  animation: float 4s ease-in-out infinite;
}

</style>



//
