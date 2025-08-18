<template>
  <Doughnut :data="data" :options="options" />
</template>

<script setup>
import { Doughnut } from 'vue-chartjs'
import '@/composables/chartSetup.js'

const data = {
  labels: ['Rojo', 'Azul', 'Amarillo'],
  datasets: [
    {
      backgroundColor: ['#274c7c', 'rgba(62,123,128,0.85)', 'rgba(8,2,51,0.85)'],
      data: [300, 50, 100]
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'right' }
  }
}
</script>
