<template>
  <section class="nexen-section py-5" ref="sectionWrapper">
    <div class="container">
      <div
        v-for="(item, index) in sections"
        :key="index"
        class="row align-items-center mb-5 rounded shadow-sm p-4 animate-card"
        :class="{
          'flex-md-row-reverse': index % 2 !== 0,
          'bg-blue-light': index % 3 === 0,
          'bg-gray-light': index % 3 === 1,
          'bg-white': index % 3 === 2,
          visible: visibleCards.includes(index),
        }"
        :ref="(el) => (sectionRefs[index] = el)"
      >
        <div class="col-md-6">
          <h3 class="fw-bold text-primary mb-3">{{ item.title }}</h3>
          <p class="text-muted" v-if="item.description">{{ item.description }}</p>
          <ul class="text-muted" v-if="item.list">
            <li v-for="(value, i) in item.list" :key="i">{{ value }}</li>
          </ul>
        </div>
        <div class="col-md-6 text-center">
          <img :src="item.image" :alt="item.title" class="img-fluid uniform-img" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const sections = [
  {
    title: 'MISIÓN',
    description:
      'Eficientizar y coadyuvar la cadena logística con liderazgo, compromiso y calidad, siempre en busca de la satisfacción de nuestros clientes.',
    image: 'src/assets/img/mision.png',
  },
  {
    title: 'VISIÓN',
    description:
      'Distinguirnos en el ramo logístico por el conocimiento, experiencia, profesionalidad, pasión y compromiso de todos nuestros procesos, estando a la vanguardia.',
    image: 'src/assets/img/vision.png',
  },
  {
    title: 'VALORES',
    list: [
      'Trabajo en equipo',
      'Comunicación',
      'Liderazgo',
      'Solidaridad',
      'Tolerancia',
      'Puntualidad',
      'Colaboración',
    ],
    image: 'src/assets/img/valores.png',
  },
  {
    title: 'OBJETIVOS',
    description:
      'Impulsar el crecimiento sostenido de nuestros servicios logísticos mediante la mejora continua, innovación tecnológica y compromiso con nuestros clientes.',
    image: 'src/assets/img/objetivos.png',
  },
];

const sectionWrapper = ref(null);
const sectionRefs = ref([]);
const visibleCards = ref([]);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = sectionRefs.value.findIndex((el) => el === entry.target);
        if (entry.isIntersecting) {
          if (!visibleCards.value.includes(index)) visibleCards.value.push(index);
        } else {
          visibleCards.value = visibleCards.value.filter((i) => i !== index);
        }
      });
    },
    { threshold: 0.3 },
  );

  sectionRefs.value.forEach((el) => {
    if (el) observer.observe(el);
  });
});

onBeforeUnmount(() => {
  sectionRefs.value.forEach((el) => {
    if (el && observer) observer.unobserve(el);
  });
});
</script>

<style scoped>
.uniform-img {
  max-height: 280px;
  object-fit: contain;
}

.animate-card {
  opacity: 0;
  transform: translateX(100px);
  transition: all 0.8s ease-in-out;
}

.animate-card.flex-md-row-reverse {
  transform: translateX(-100px);
}

.animate-card.visible {
  opacity: 1;
  transform: translateX(0);
}

.bg-blue-light {
  background-color: #eaf4fb;
}

.bg-gray-light {
  background-color: #f2f2f2;
}
</style>
