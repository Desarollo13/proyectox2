<template>
  <PolarArea :data="data" :options="options" />
</template>

<script setup>
import { PolarArea } from 'vue-chartjs'
import '@/composables/chartSetup.js'

const data = {
  labels: ['A', 'B', 'C', 'D'],
  datasets: [
    {
      backgroundColor: ['rgb(168,238,212)', 'rgba(19,37,114,0.98)', 'rgba(153,171,241,0.47)', 'rgba(98,127,180,0.67)'],
      data: [11, 16, 7, 14]
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' }
  }
}
</script>
