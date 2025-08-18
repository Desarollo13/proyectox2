<template>
  <Radar :data="data" :options="options" />
</template>

<script setup>
import { Radar } from 'vue-chartjs'
import '@/composables/chartSetup.js'

const data = {
  labels: ['Comunic.', 'Creatividad', 'Trabajo en equipo', 'Análisis'],
  datasets: [
    {
      label: 'Habilidades',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81]
    }
  ]
}

const options = {
  responsive: true,
  scales: {
    r: {
      angleLines: { display: false },
      suggestedMin: 0,
      suggestedMax: 100
    }
  }
}
</script>
