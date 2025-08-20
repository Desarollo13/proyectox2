<template>
  <div class="container-fluid flex-grow-1 d-flex flex-column bg-cover bg-center position-relative fondo-personalizado">
    <div class="overlay"></div>
    <div class="row flex-grow-1 justify-content-center align-items-start position-relative z-1">
      <div class="col-12 col-lg-10 py-4">
        <!-- Card principal -->
        <div class="card shadow rounded-4 border-0 p-4 bg-white bg-opacity-90">
          <!-- Logo y títulos -->
          <div class="text-center mb-4">
            <img src="../../../assets/img/logoNexen.png" alt="Logo Nexen" class="logo mb-3" />
            <h1 class="fw-bold text-primary">Proyecto X</h1>
            <h5 class="text-secondary">Prupuesta Genial </h5>
          </div>

          <!-- Barra de progreso -->
          <div class="progress mb-4" style="height: 10px">
            <div
              class="progress-bar progress-bar-striped progress-bar-animated"
              :style="{ width: progressValue + '%', backgroundColor: 'var(--primary)' }"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-valuenow="progressValue"
            ></div>
          </div>

          <!-- Tabs como pasos -->
          <b-tabs
            v-model="activeTab"
            pills
            fill
            card
            nav-class="nav-pills justify-content-center"
            active-nav-item-class="bg-primary text-white"
            class="fade-tabs"
          >
            <b-tab
              v-for="(step, index) in steps"
              :key="index"
              :title="`${index + 1}. ${step.name}`"
              class="p-3"
            >
              <transition name="fade" mode="out-in">
                <component :is="step.component" />
              </transition>
            </b-tab>
          </b-tabs>

          <!-- Botón de regreso -->
          <div class="text-center mt-4">
            <router-link to="/login" class="btn btn-outline-primary">
              ← Volver al login
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { defineAsyncComponent } from 'vue';

const activeTab = ref(0);

const steps = [
  {
    name: 'Información de Registro',
    component: defineAsyncComponent(() =>
      import('@/views/pages/profiles/components/InfoRegister.vue')
    ),
  },
  {
    name: 'Información Personal',
    component: defineAsyncComponent(() =>
      import('@/views/pages/profiles/components/PersonalInfoComponent.vue')
    ),
  },
  {
    name: 'Carga tus Documentos',
    component: defineAsyncComponent(() =>
      import('@/views/pages/profiles/components/DocumentsComponent.vue')
    ),
  },
  {
    name: 'Pruebas Psicométricas',
    component: defineAsyncComponent(() =>
      import('@/views/pages/profiles/components/InterviewComponent.vue')
    ),
  },
];

const totalSteps = steps.length;
const progressValue = computed(() => (activeTab.value / (totalSteps - 1)) * 100);
</script>

<style scoped>
/* Fondo */
.fondo-personalizado {
  background-image: url('../../../assets/img/fondonexen.jpg'); /* Cambia la ruta si es necesario */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  position: relative;
}

/* Capa oscura si quieres opacidad detrás del contenido */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* Cambia a rgba(0,0,0,0.4) si prefieres fondo oscuro */
  z-index: 0;
}

/* Logo */
.logo {
  max-width: 150px;
}

/* Transición de tabs */
.fade-tabs >>> .tab-pane {
  transition: opacity 0.3s ease;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
