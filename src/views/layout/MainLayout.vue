<script setup>
import { ref, provide } from 'vue';
import Side from '@/views/layout/sideBar.vue';
import Header from '@/views/layout/HeaderLayout.vue';
import Footer from '@/views/layout/FooterLayout.vue';
import NavigationLayout from './NavigationLayout.vue';

const isSidebarExpanded = ref(false);
provide('isSidebarExpanded', isSidebarExpanded);
</script>

<template>
  <div class="layout-wrapper rotate-in">
    <Side />

    <div class="main-content">
      <Header class="header-navbar rotate-in" />
      <div class="page-body">
        <main class="main-area">
          <div class="main-container">
            <NavigationLayout class="d-flex justify-content-end me-5 rotate-in" />

            <router-view v-slot="{ Component }">
              <transition name="rotate-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </main>
        <Footer class="rotate-in" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
}

.main-content {
  flex-grow: 1;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header-navbar {
  height: 80px;
  position: sticky;
  top: 1.5rem;
  z-index: 1000;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0.75rem;
}

.page-body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.main-area {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem clamp(1rem, 3vw, 2rem);
  box-sizing: border-box;
}

/* Animación de rotación */
.rotate-in-enter-active {
  animation: rotateIn 0.6s ease-out;
}

.rotate-in {
  animation: rotateIn 0.6s ease-out;
}

@keyframes rotateIn {
  from {
    opacity: 0;
    transform: rotateY(-90deg);
  }
  to {
    opacity: 1;
    transform: rotateY(0);
  }
}
</style>
