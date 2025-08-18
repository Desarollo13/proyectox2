// src/plugins/chart.js
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
  BarElement,
  BarController,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler, // <- Necesario para usar la opción `fill`
  Tooltip,
  Legend,
  BarElement,
  BarController,
);
