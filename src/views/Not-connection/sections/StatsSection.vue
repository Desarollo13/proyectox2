<template>
  <section class="stats-wrapper mb-5" ref="statsSection">
    <div class="stats-section text-white py-5" :class="{ visible: isVisible }">
      <div class="container">
        <div class="row text-center justify-content-center">
          <div class="col-12 col-md-3 mb-4 mb-md-0 stat-box">
            <h2 class="display-5 fw-bold">+15,000</h2>
            <p class="text-uppercase small">ENTREGAS MENSUALES</p>
          </div>
          <div class="col-12 col-md-3 mb-4 mb-md-0 stat-box">
            <h2 class="display-5 fw-bold">98%</h2>
            <p class="text-uppercase small">CLIENTES SATISFECHOS</p>
          </div>
          <div class="col-12 col-md-3 mb-4 mb-md-0 stat-box">
            <h2 class="display-5 fw-bold">10 años</h2>
            <p class="text-uppercase small">DE EXPERIENCIA</p>
          </div>
          <div class="col-12 col-md-3 stat-box">
            <h2 class="display-5 fw-bold">24/7</h2>
            <p class="text-uppercase small">SOPORTE OPERATIVO</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const statsSection = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.2 },
  );

  if (statsSection.value) {
    observer.observe(statsSection.value);
  }
});
</script>

<style scoped>
.stats-wrapper {
  position: relative;
  z-index: 1;
  background-color: transparent;
  clip-path: polygon(0 10%, 100% 0%, 100% 90%, 0% 100%);
}

.stats-section {
  background-color: var(--primary);
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.6s ease-out,
    transform 0.6s ease-out;
}

.stats-section.visible {
  opacity: 1;
  transform: translateY(0);
}

.stat-box {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.stats-section.visible .stat-box {
  opacity: 1;
  transform: translateY(0);
}
</style>
