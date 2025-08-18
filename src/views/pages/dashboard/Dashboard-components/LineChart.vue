<template>
  <div class="chart-container">
    <Line :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Registrar módulos
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const data = {
  labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'],
  datasets: [
    {
      label: 'Actividad semanal',
      borderColor: 'rgba(1, 100, 181, 1)', // --primaryh
      backgroundColor: 'rgba(0, 46, 109, 0.3)', // --primary
      pointBackgroundColor: 'rgba(99, 213, 247, 1)', // --ec
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 46, 109, 1)',
      data: [12, 19, 3, 5, 2],
      tension: 0.3,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#333',
        font: {
          size: 13,
          family: 'Poppins, sans-serif',
        },
      },
    },
    tooltip: {
      backgroundColor: '#f8f9fa',
      titleColor: '#000',
      bodyColor: '#333',
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
    },
    title: {
      display: true,
      text: 'Actividad de la semana',
      color: '#444',
      font: {
        size: 18,
        weight: 'bold',
        family: 'Poppins, sans-serif',
      },
      padding: {
        top: 10,
        bottom: 20,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#555',
      },
      grid: {
        color: 'rgba(0,0,0,0.1)',
      },
    },
    x: {
      ticks: {
        color: '#555',
      },
      grid: {
        display: false,
      },
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 300px;
}
</style>
