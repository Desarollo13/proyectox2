<template>
  <section class="world-services-section py-5" ref="sectionRef">
    <div class="container text-center section-animate" :class="{ visible: isVisible }">
      <h2 class="display-5 text-primary mb-3">
        Soluciona, optimiza<br /><span class="text-primary">y crece tu negocio.</span>
      </h2>
      <p class="lead mb-5 text-muted">
        <b>
          ¡Explora nuestros servicios diseñados para impulsar cada aspecto de tu cadena logística,
          comercial y legal!
        </b>
      </p>

      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-6 g-4">
        <div class="col" v-for="(service, index) in services" :key="index">
          <div class="service-item h-100 text-center">
            <div class="icon-box mb-2">
              <i :class="service.icon"></i>
            </div>
            <p class="service-label fw-bold small">{{ service.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const services = [
  { title: 'RECINTO FISCALIZADO', icon: 'bi bi-box' },
  { title: 'RECINTO FISCALIZADO ESTRATÉGICO', icon: 'bi bi-house' },
  { title: 'EMPRESA DE MENSAJERÍA Y PAQUETERÍA', icon: 'bi bi-envelope' },
  { title: 'CANDADOS ELECTRÓNICOS', icon: 'bi bi-lock' },
  { title: 'ALMACÉN GENERAL DE DEPÓSITO', icon: 'bi bi-archive' },
  { title: 'IMMEX', icon: 'bi bi-globe' },
  { title: 'COMERCIALIZADORA', icon: 'bi bi-cart' },
  { title: 'AGENCIA ADUANAL', icon: 'bi bi-people' },
  { title: 'MODULO M', icon: 'bi bi-airplane' },
  { title: 'ANÁLISIS DATA STAGE', icon: 'bi bi-bar-chart' },
  { title: 'PUNTO DE INSPECCIÓN', icon: 'bi bi-search' },
  { title: 'ECOMMERCE', icon: 'bi bi-shop' },
];

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
  transform: scale(0.95) translateY(50px);
  opacity: 0;
  transition: all 0.8s ease-out;
}

.section-animate.visible {
  transform: scale(1) translateY(0);
  opacity: 1;
}

.service-item {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
}

.icon-box i {
  font-size: 2.5rem;
  color: var(--primary);
}

.service-label {
  margin-top: 0.5rem;
  color: #333;
  font-size: 0.85rem;
}

@media (max-width: 576px) {
  .icon-box i {
    font-size: 1.8rem;
  }
  .service-label {
    font-size: 0.75rem;
  }
}
</style>
