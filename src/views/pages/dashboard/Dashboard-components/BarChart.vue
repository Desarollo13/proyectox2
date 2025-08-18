<template>
  <div class="chart-container">
    <Bar :data="data" :options="options" />
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Registrar módulos
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const data = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr'],
  datasets: [
    {
      label: 'Crecimiento mensual',
      backgroundColor: 'rgba(1, 100, 181, 0.8)', // --primaryh
      borderColor: 'rgba(0, 46, 109, 1)', // --primary
      borderWidth: 1,
      data: [65, 59, 80, 81],
      hoverBackgroundColor: 'rgba(99, 213, 247, 0.9)', // --ec
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
      text: 'Crecimiento por Mes',
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
        color: 'rgba(0, 0, 0, 0.1)',
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
