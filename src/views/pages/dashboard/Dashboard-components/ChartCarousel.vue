<script setup>
import ChartBar from './BarChart.vue'
import ChartLine from './LineChart.vue'
import ChartPie from './PieChart.vue'
import { onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import Carousel from 'bootstrap/js/dist/carousel'

const props = defineProps({
  carouselId: {
    type: String,
    default: () => `chart-carousel-${uuidv4()}`
  }
})

onMounted(() => {
  const el = document.getElementById(props.carouselId)
  if (el) {
    new Carousel(el, {
      interval: 5000,
      ride: 'carousel',
      pause: false,
      wrap: true
    })
  }
})
</script>

<template>
  <div class="rounded-2xl shadow-xl bg-white/80 backdrop-blur-md border border-gray-200">
    <div :id="carouselId" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-indigo-600 mb-4">Gráfico de Barras</h3>
            <ChartBar />
          </div>
        </div>
        <div class="carousel-item">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-indigo-600 mb-4">Gráfico de Pastel</h3>
            <ChartPie />
          </div>
        </div>
        <div class="carousel-item">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-indigo-600 mb-4">Gráfico de Línea</h3>
            <ChartLine />
          </div>
        </div>
      </div>

      <!-- Controles del carrusel -->
      <button
        class="carousel-control-prev hover:scale-110 transition"
        type="button"
        :data-bs-target="`#${carouselId}`"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon bg-dark rounded-full" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>
      <button
        class="carousel-control-next hover:scale-110 transition"
        type="button"
        :data-bs-target="`#${carouselId}`"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon bg-dark rounded-full" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.carousel-item {
  transition: transform 0.6s ease-in-out;
}
</style>
