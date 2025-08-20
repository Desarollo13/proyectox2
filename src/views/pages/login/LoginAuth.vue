<script setup>
import { ref, computed } from 'vue'
import { useLogin } from './useLogin'
import AlertModal from '@/components/alerts/AlertModal.vue'
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue'
// (opcional) logo
import logoNexen from '@/assets/img/logoNexen.png'

const isPasswordVisible = ref(false)

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
} = useLogin()

// Mensajes de error para VTextField (según tus reglas)
const usernameError = computed(() =>
  usernameTouched.value && !validUsername.value ? 'Ingresa un usuario válido (mín. 3 caracteres).' : ''
)
const passwordError = computed(() =>
  passwordTouched.value && !validPassword.value ? 'La contraseña debe tener al menos 6 caracteres.' : ''
)
</script>

<template>
  <div class="login-bg d-flex align-center justify-center">
    <!-- Capa decorativa (no interactúa) -->
    <div class="decor" aria-hidden="true">
      <span class="circle c1"></span>
      <span class="circle c2"></span>
      <span class="circle c3"></span>
      <span class="circle c4"></span>
    </div>

    <VCard class="simple-login-card position-relative pa-6" max-width="440" elevation="2" rounded="xl">
      <!-- Encabezado con bienvenida -->
      <div class="text-center mb-3">
        <img :src="logoNexen" alt="Logo" class="mb-2" height="44" />
        <div class="text-h5 font-weight-semibold mb-1">¡Bienvenido a Nexen E-Logistics!</div>
        <div class="text-medium-emphasis text-subtitle-2">Ingresa tus credenciales</div>
      </div>

      <!-- Formulario (con tu lógica real) -->
      <VForm @submit.prevent="handleLogin">
        <div class="mb-3">
          <VTextField
            v-model.trim="username"
            label="USUARIO"
            variant="outlined"
            density="comfortable"
            :error="!!usernameError"
            :error-messages="usernameError"
            autocomplete="username"
            hide-details="auto"
          />
        </div>

        <div class="mb-2">
          <VTextField
            v-model="password"
            :type="isPasswordVisible ? 'text' : 'password'"
            label="CONTRASEÑA"
            variant="outlined"
            density="comfortable"
            hide-details="auto"
            :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="isPasswordVisible = !isPasswordVisible"
            :error="!!passwordError"
            :error-messages="passwordError"
            autocomplete="current-password"
          />
        </div>

        <div class="text-center mt-2">
          <small class="text-medium-emphasis">
            ¿Olvidaste tu usuario o contraseña?
            <br />
            <router-link to="#" class="text-primary font-weight-semibold">Recuperar acceso</router-link>
          </small>
        </div>

        <VBtn type="submit" class="mt-4" block color="primary">Iniciar sesión</VBtn>
      </VForm>

      <div class="text-center mt-3">
        <small class="text-medium-emphasis">
          © Nexen E-Logistics 2025 · Todos los derechos reservados
        </small>
      </div>
    </VCard>

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

<style scoped>
/* Fondo claro tipo bg-light */
.login-bg {
  position: relative;
  min-height: 100vh;
  background: #f8f9fa;
  padding: 1rem;
  overflow: hidden; /* oculta bordes de círculos */
}

/* Card con sombra suave y bordes redondeados */
.simple-login-card {
  z-index: 1; /* encima de los círculos */
  border-radius: 1rem;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
}

/* Capa decorativa con círculos degradados */
.decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

/* Círculo base (suave y desvanecido) */
.circle {
  position: absolute;
  display: block;
  border-radius: 50%;
  filter: blur(6px);            /* suaviza el borde */
  opacity: 0.8;                 /* controla intensidad global */
  will-change: transform;
  /* Gradiente radial que se disuelve al transparente */
  background: radial-gradient(
    circle at 50% 50%,
    var(--c-start) 0%,
    color-mix(in oklab, var(--c-start) 60%, transparent) 45%,
    transparent 70%
  );
}

/* Paleta y posiciones (ajusta a gusto) */
.c1 {
  --c-start: rgba(13, 110, 253, 0.15); /* azul */
  width: 220px; height: 520px;
  top: -140px; left: -120px;
  transform: translateZ(0);
}

.c2 {
  --c-start: rgba(68, 67, 67, 0.22); /* gris */
  width: 420px; height: 420px;
  bottom: -160px; right: -120px;
}

.c3 {
  --c-start: rgba(156, 173, 215, 0.16); /* azul claro */
  width: 340px; height: 340px;
  top: 28%; right: -160px;
}

.c4 {
  --c-start: rgba(246, 115, 115, 0.18);  /* rojo suave */
  width: 300px; height: 300px;
  bottom: 18%; left: -140px;
}

/* Sutil animación flotante para dar vida */
@keyframes floaty {
  0%   { transform: translateY(0) scale(1); }
  50%  { transform: translateY(-8px) scale(1.02); }
  100% { transform: translateY(0) scale(1); }
}
.c1, .c2, .c3, .c4 { animation: floaty 12s ease-in-out infinite; }
.c2 { animation-duration: 16s; }
.c3 { animation-duration: 18s; }
.c4 { animation-duration: 14s; }

/* Responsivo: reduce/oculta algunas en móviles para rendimiento/claridad */
@media (max-width: 768px) {
  .c1 { width: 360px; height: 360px; top: -180px; left: -180px; }
  .c2 { display: none; }
  .c3 { width: 260px; height: 260px; right: -120px; }
  .c4 { display: none; }
}

/* Helpers “bootstrap-like” usados arriba */
.mb-2 { margin-bottom: 0.5rem; } .mb-3 { margin-bottom: 1rem; }
.mt-3 { margin-top: 1rem; } .mt-4 { margin-top: 1.5rem; }
.position-relative { position: relative; }
.font-weight-semibold { font-weight: 600; }
.text-medium-emphasis { color: rgba(0, 0, 0, 0.6); }
</style>
