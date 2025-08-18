<template>
  <canvas ref="canvas"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const canvas = ref(null)

onMounted(() => {
  new Chart(canvas.value, {
    type: 'scatter',
    data: {
      datasets: [
        {
          label: 'Eventos',
          data: [
            { x: -10, y: 0 },
            { x: 0, y: 10 },
            { x: 10, y: 5 },
            { x: 2, y: 20 },
            { x: 20, y: 15 }
          ],
          backgroundColor: 'rgba(62,123,128,0.85)',
          borderColor: 'rgba(255,255,255,0.47)'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
        tooltip: { enabled: true }
      },
      scales: {
        x: {
          type: 'linear',
          position: 'bottom',
          title: { display: true, text: 'Valor X' }
        },
        y: {
          title: { display: true, text: 'Valor Y' }
        }
      }
    }
  })
})
</script>
