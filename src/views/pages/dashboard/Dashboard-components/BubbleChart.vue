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
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Proyectos',
          data: [
            { x: 10, y: 20, r: 15 },
            { x: 15, y: 10, r: 10 },
            { x: 20, y: 30, r: 20 }
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
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
          title: { display: true, text: 'Tiempo' }
        },
        y: {
          title: { display: true, text: 'Impacto' }
        }
      }
    }
  })
})
</script>
