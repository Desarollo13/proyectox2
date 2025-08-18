<script setup>
import chartCarousel from './ChartCarousel.vue';
import BubbleChart from './BubbleChart.vue';
import RadarChart from '@/views/pages/dashboard/Dashboard-components/RadarChart.vue';
import ScatterChart from '@/views/pages/dashboard/Dashboard-components/ScatterChart.vue';
import PolarAreaChart from '@/views/pages/dashboard/Dashboard-components/PolarAreaChart.vue';
import DoughnutChart from '@/views/pages/dashboard/Dashboard-components/DoughnutChart.vue';
</script>

<template>
  <div class="container-fluid pt-3 px-4">
    <h1 class="h3 mb-4 text-primary"><i class="bi bi-bar-chart"></i> Dashboard</h1>

    <!-- RESUMEN PRINCIPAL -->
    <div class="row g-3 mb-4">
      <div class="col-md-6 col-xl-3">
        <div class="card p-3 shadow-sm h-100">
          <h4>200</h4>
          <p class="text-muted mb-1">Contrataciones</p>
          <small class="text-success">↑ 2.65% desde la semana pasada</small>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card p-3 shadow-sm h-100">
          <h4>5,643</h4>
          <p class="text-muted mb-1">Nomina</p>
          <small class="text-danger">↓ 0.82% desde la semana pasada</small>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card p-3 shadow-sm h-100">
          <h4>45,254</h4>
          <p class="text-muted mb-1">Ingresos</p>
          <small class="text-danger">↓ 6.24% desde la semana pasada</small>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card p-3 shadow-sm h-100">
          <h4>+12.58%</h4>
          <p class="text-muted mb-1">Actividades</p>
          <small class="text-success">↑ 10.51% desde la semana pasada</small>
        </div>
      </div>
    </div>

    <!-- SECCIONES DE RH -->
    <div class="row g-4">
      <!-- CONTRATACIONES -->
      <div class="col-lg-6">
        <div class="card p-4 h-100">
          <h5 class="card-title mb-4 text-primary fw-bold d-flex align-items-center gap-2">
            <i class="bi bi-briefcase"></i> Contrataciones
          </h5>
          <div class="col-sm-12 p-4 h-100" style="min-height: 400px;">
            <chart-carousel />
          </div>

        </div>
      </div>

      <!-- EMPLEADOS -->
      <div class="col-lg-6">
        <div class="card shadow-sm border-0 h-100" style="border-radius: 16px">
          <div class="card-body d-flex flex-column justify-content-between h-100">
            <h5 class="card-title mb-4 text-primary fw-bold d-flex align-items-center gap-2">
              <i class="bi bi-people-fill fs-4"></i> Empleados
            </h5>
            <div class="row text-center mb-4">
              <div class="col-4 border-end">
                <h2 class="fw-bold mb-1" style="color: var(--primary)">128</h2>
                <p class="text-muted mb-0 small">Activos</p>
              </div>
              <div class="col-4 border-end">
                <h2 class="fw-bold mb-1" style="color: var(--primaryh)">8</h2>
                <p class="text-muted mb-0 small">Capacitación</p>
              </div>
              <div class="col-4">
                <h2 class="fw-bold mb-1" style="color: var(--secondary)">12</h2>
                <p class="text-muted mb-0 small">Inactivos</p>
              </div>
            </div>
            <bubble-chart></bubble-chart>
            <div class="progress mb-3" style="height: 8px; background-color: #e9ecef">
              <div
                class="progress-bar"
                style="width: 80%; background-color: var(--primary)"
                role="progressbar"
              ></div>
              <div
                class="progress-bar"
                style="width: 10%; background-color: var(--primaryh)"
                role="progressbar"
              ></div>
              <div
                class="progress-bar"
                style="width: 10%; background-color: var(--secondary)"
                role="progressbar"
              ></div>
            </div>

            <div class="d-flex justify-content-between text-muted small px-1">
              <span
                ><i class="bi bi-circle-fill me-1" style="color: var(--primary)"></i> Activos</span
              >
              <span
                ><i class="bi bi-circle-fill me-1" style="color: var(--primaryh)"></i>
                Capacitación</span
              >
              <span
                ><i class="bi bi-circle-fill me-1" style="color: var(--secondary)"></i>
                Inactivos</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- EVALUACIONES -->
      <div class="col-lg-6">
        <div class="card shadow-sm border-0 h-100" style="border-radius: 16px">
          <div class="card-body d-flex flex-column justify-content-between h-100">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div class="d-flex align-items-center gap-3">
                <i class="bi bi-bar-chart-steps fs-3 text-primary"></i>
                <div>
                  <h5 class="fw-bold mb-0 text-primary">Evaluaciones</h5>
                  <small class="text-muted">Resumen del mes</small>
                </div>
              </div>
              <span
                class="badge rounded-pill px-3 py-2 text-white"
                style="background-color: var(--primaryh); font-size: 0.75rem"
              >
                76.7% completado
              </span>
            </div>
            <div class="d-flex justify-content-center align-items-center">
          <scatter-chart></scatter-chart>
            </div>
            <div class="row g-3">
              <div class="col-6">

                <div class="bg-light border rounded p-3 text-center h-100">
                  <i class="bi bi-check-circle-fill text-success fs-4 mb-2"></i>
                  <h6 class="fw-bold mb-0 text-success">23</h6>
                  <small class="text-muted">Completadas</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-light border rounded p-3 text-center h-100">
                  <i class="bi bi-hourglass-split text-warning fs-4 mb-2"></i>
                  <h6 class="fw-bold mb-0 text-warning">7</h6>
                  <small class="text-muted">Pendientes</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-light border rounded p-3 text-center h-100">
                  <i class="bi bi-arrow-repeat text-info fs-4 mb-2"></i>
                  <h6 class="fw-bold mb-0 text-info">5</h6>
                  <small class="text-muted">En curso</small>
                </div>
              </div>
              <div class="col-6">
                <div class="bg-light border rounded p-3 text-center h-100">
                  <i class="bi bi-x-circle-fill text-danger fs-4 mb-2"></i>
                  <h6 class="fw-bold mb-0 text-danger">2</h6>
                  <small class="text-muted">Rechazadas</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- NÓMINA -->
      <div class="col-lg-6">
        <div class="card p-4 h-100">
          <h5 class="card-title mb-4 text-primary fw-bold d-flex align-items-center gap-2">
            <i class="bi bi-cash-coin"></i> Nomina
          </h5>
          <div class="card p-4 h-100" style="min-height: 400px;">
         <polar-area-chart></polar-area-chart>
          </div>
        </div>
      </div>

      <!-- TICKETS -->
      <div class="col-lg-12 dashboard-wrapper">
        <div class="card p-5 shadow-lg rounded-4 bg-white/80 backdrop-blur-md">
          <h5 class="card-title mb-5 text-primary fw-bold d-flex align-items-center gap-2 fs-4">
            <i class="bi bi-ticket-detailed-fill fs-3"></i> Estado de Tickets
          </h5>

          <div class="row row-cols-1 row-cols-md-3 g-4">
            <!-- Ticket: Abiertos -->
            <div class="col">
              <div class="ticket-card bg-light rounded-4 p-4 text-center shadow-sm h-100 border-start border-4 border-primary">
                <h6 class="text-primary fw-semibold mb-2">Abiertos</h6>
                <p class="display-6 text-primary mb-3">12</p>
              </div>
            </div>

            <!-- Ticket: En Proceso -->
            <div class="col">
              <div class="ticket-card bg-light rounded-4 p-4 text-center shadow-sm h-100 border-start border-4 border-warning">
                <h6 class="text-warning fw-semibold mb-2">En Proceso</h6>
                <p class="display-6 text-warning mb-3">5</p>
              </div>
            </div>

            <!-- Ticket: Resueltos -->
            <div class="col">
              <div class="ticket-card bg-light rounded-4 p-4 text-center shadow-sm h-100 border-start border-4 border-success">
                <h6 class="text-success fw-semibold mb-2">Resueltos</h6>
                <p class="display-6 text-success mb-3">20</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-wrapper {
  font-family: 'Poppins', sans-serif;
}
</style>
