<template>
  <section class="services-section py-5 mt-5">
    <div class="container text-center mt-5">
      <h2 class="fw-bold text-primary mb-4">Soluciones logísticas para cada necesidad</h2>
      <p class="text-secondary mb-5">
        <b>
          En Nexen ofrecemos una amplia gama de servicios de transporte para adaptarnos a tus
          necesidades: terrestre, aéreo y marítimo.
        </b>
      </p>

      <div class="row justify-content-center">
        <div
          class="col-12 col-md-4 mb-4"
          v-for="(service, index) in services"
          :key="index"
          :ref="(el) => (cardRefs[index] = el)"
        >
          <div class="card h-100 border-0 shadow service-card">
            <img :src="service.image" :alt="service.title" class="card-img-top rounded-top" />
            <div class="card-body">
              <h5 class="card-title fw-bold text-primary">{{ service.title }}</h5>
              <p class="card-text text-secondary">{{ service.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, nextTick } from 'vue';

const services = [
  {
    title: 'Transporte terrestre',
    description:
      'Cobertura nacional con unidades propias. Entregas rápidas y seguras a cualquier parte del país.',
    image: 'src/assets/img/terrestre.jfif',
  },
  {
    title: 'Transporte marítimo',
    description:
      'Ideal para cargas voluminosas y comercio internacional. Conexiones con los principales puertos.',
    image: 'src/assets/img/maritimo.jfif',
  },
  {
    title: 'Transporte aéreo',
    description:
      'La opción más rápida para entregas urgentes. Alianzas con aerolíneas para envíos exprés.',
    image: 'src/assets/img/aereo.jfif',
  },
];

const cardRefs = [];

onMounted(() => {
  nextTick(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target.querySelector('.service-card');
          if (card) {
            if (entry.isIntersecting) {
              card.classList.add('visible');
            } else {
              card.classList.remove('visible');
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    cardRefs.forEach((el) => {
      if (el) observer.observe(el);
    });
  });
});
</script>

<style scoped>
.service-card {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
  border-radius: 12px;
}

.service-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.card-img-top {
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
</style>
