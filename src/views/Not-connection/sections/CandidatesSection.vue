<template>
  <section class="candidates-section py-5">
    <div
      class="container text-center section-animate"
      :class="{ visible: isVisible }"
      ref="sectionRef"
    >
      <h2 class="display-4 fw-bold text-primary mb-4 animate-blink">Postúlate con nosotros</h2>
      <p class="lead text-muted mb-5">
        <b>
          En Nexen buscamos talento para distintas áreas de nuestra operación.<br />
          Da el siguiente paso en tu carrera profesional.
        </b>
      </p>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow h-100 p-4">
            <h4 class="text-primary fw-bold mb-3">Área Operativa</h4>
            <p class="text-muted">
              Buscamos operadores, personal de almacén, coordinadores de ruta y soporte en campo
              para garantizar entregas exitosas.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow h-100 p-4">
            <h4 class="text-primary fw-bold mb-3">Área Financiera</h4>
            <p class="text-muted">
              Únete a nuestro equipo de contabilidad, tesorería o análisis financiero para
              fortalecer nuestras operaciones administrativas.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow h-100 p-4">
            <h4 class="text-primary fw-bold mb-3">Tecnología y Desarrollo</h4>
            <p class="text-muted">
              ¿Eres desarrollador, diseñador UI/UX o experto en datos? Queremos que seas parte de
              nuestra transformación digital.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-5">
        <router-link to="/candidates" class="btn btn-outline-primary px-4 py-2">
          Ver vacantes disponibles
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const sectionRef = ref(null);
const isVisible = ref(false);
let observer = null;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.3 },
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }
});

onBeforeUnmount(() => {
  if (sectionRef.value && observer) {
    observer.unobserve(sectionRef.value);
  }
});
</script>

<style scoped>
.section-animate {
  opacity: 0;
  transform: rotateY(90deg);
  transform-origin: center;
  transition: all 0.8s ease-out;
}

.section-animate.visible {
  opacity: 1;
  transform: rotateY(0deg);
}

.animate-blink {
  animation: blink 2s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
}
</style>
