<template>
  <div class="login-background d-flex align-items-center justify-content-center min-vh-100">
    <div class="card login-container shadow-lg rounded-4 w-100 position-relative animated-entry">
      <!-- Botón dentro de la card -->
      <router-link to="/home" class="back-btn" title="Volver al inicio">
        <i class="bi bi-arrow-left"></i>
      </router-link>

      <div class="row g-0 align-items-center">
        <!-- Columna izquierda (formulario) -->
        <div class="col-md-6 px-5 py-5 text-center border-end">
          <img :src="logoPrincipal" alt="Logo RH" class="img-fluid mb-3" style="max-width: 140px" />
          <h5 class="fw-bold text-primary">Ingresa tus credenciales</h5>

          <form @submit.prevent="handleLogin" class="text-start mt-4" novalidate>
            <div class="mb-3">
              <label for="username" class="form-label">Usuario</label>
              <input
                type="text"
                id="username"
                v-model="username"
                class="form-control"
                :class="{
                  'is-invalid': usernameTouched && !validUsername,
                  'is-valid': validUsername,
                }"
              />
              <div v-if="usernameTouched && !validUsername" class="invalid-feedback">
                Por favor ingresa un nombre de usuario válido.
              </div>
            </div>

            <div class="mb-2">
              <label for="password" class="form-label">Contraseña</label>
              <div class="input-group">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  class="form-control"
                  :class="{
                    'is-invalid': passwordTouched && !validPassword,
                    'is-valid': validPassword,
                  }"
                />
                <button
                  class="btn btn-outline-primary"
                  type="button"
                  @click="togglePassword"
                  tabindex="-1"
                >
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
              <div v-if="passwordTouched && !validPassword" class="invalid-feedback">
                La contraseña debe tener al menos 6 caracteres.
              </div>
            </div>

            <div class="text-center mt-2">
              <small class="text-muted">
                ¿Olvidaste tu Usuario y Contraseña?
                <br />
                <router-link to="#" class="text-primary fw-semibold">
                  Recuperar Usuario y/o Contraseña
                </router-link>
              </small>
            </div>

            <div class="d-grid mt-4">
              <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
            </div>
          </form>
        </div>

        <!-- Columna derecha (solo en pantallas grandes) -->
        <div class="col-md-6 px-5 py-5 text-center d-none d-md-block">
          <img :src="logoNexen" alt="Logo Nexen" class="img-fluid mb-4" style="max-width: 200px" />
          <img :src="peopleImage" alt="People" class="img-fluid floating-image" style="max-width: 450px" />
          <p class="text-muted mt-4 small text-primary">
            Copyright © Nexen E-Logistics 2025<br />
            Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>

    <!-- Modales -->
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
