<template>
  <div ref="container" class="not-found-wrapper">
    <!-- Contenido central -->
    <div class="not-found-content">
      <h1 class="error-code" :style="codeStyle">404</h1>
      <p class="error-message">Oops... Página no encontrada</p>

      <button v-if="canGoBack" class="btn-back" @click="goBack">
        Regresar a la página anterior
      </button>
      <router-link v-else to="/" class="btn-back">Ir al inicio</router-link>
    </div>

    <!-- Círculo de fondo -->
    <div class="bg-circle" :style="circleStyle"></div>

    <!-- Camión SVG -->
    <div class="truck" :style="truckStyle">
      <svg viewBox="0 0 512 512" width="180" fill="#061b54" class="truck-svg">
        <path
          d="M352 128H0V384H64C64 419.3 92.65 448 128 448C163.3 448 192 419.3 192 384H320C320 419.3 348.7 448 384 448C419.3 448 448 419.3 448 384H512V256L448 192H384V160C384 142.3 369.7 128 352 128zM384 224H428.1L464 259.9V320H384V224zM128 400C110.3 400 96 385.7 96 368C96 350.3 110.3 336 128 336C145.7 336 160 350.3 160 368C160 385.7 145.7 400 128 400zM384 400C366.3 400 352 385.7 352 368C352 350.3 366.3 336 384 336C401.7 336 416 350.3 416 368C416 385.7 401.7 400 384 400z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Lenis from '@studio-freight/lenis';

const container = ref(null);
const mouseX = ref(0);
const mouseY = ref(0);
const canGoBack = ref(false);

const codeStyle = ref({});
const circleStyle = ref({});
const truckStyle = ref({});

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
};

const handleMouseMove = (e) => {
  const { innerWidth, innerHeight } = window;
  mouseX.value = (e.clientX - innerWidth / 2) / 25;
  mouseY.value = (e.clientY - innerHeight / 2) / 25;

  codeStyle.value = {
    transform: `translate(${mouseX.value}px, ${mouseY.value}px)`,
  };

  circleStyle.value = {
    transform: `translate(${-mouseX.value * 0.4}px, ${-mouseY.value * 0.4}px)`,
  };

  truckStyle.value = {
    transform: `translate(${mouseX.value * 0.6}px, ${mouseY.value * 0.6}px)`,
  };
};

onMounted(() => {
  canGoBack.value = window.history.length > 1;
  window.addEventListener('mousemove', handleMouseMove);

  const lenis = new Lenis();
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
.not-found-wrapper {
  height: 100vh;
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
  color: var(--primary);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.not-found-content {
  text-align: center;
  z-index: 10;
  padding: 2rem;
}

.error-code {
  font-size: 10rem;
  font-weight: 800;
  transition: transform 0.2s ease-out;
  color: var(--primary);
  text-shadow: 0 0 10px rgba(46, 139, 192, 0.5);
}

.error-message {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
}

.btn-back {
  padding: 0.75rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border-radius: 10px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: var(--primaryh);
}

.bg-circle {
  position: absolute;
  width: 500px;
  height: 500px;
  background: rgba(46, 139, 192, 0.05);
  border-radius: 50%;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.2s ease-out;
}

.truck {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  transition: transform 0.2s ease-out;
}

.truck-svg {
  filter: drop-shadow(2px 4px 8px rgba(0, 0, 0, 0.2));
}
</style>
