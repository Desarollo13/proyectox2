<template>
  <div ref="scrollContainer" class="main-home-layout d-flex flex-column min-vh-100">
    <HeaderHome :isScrolled="isScrolled" />

    <main class="flex-grow-1 pt-header">
      <router-view />
    </main>

    <FooterHome />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import Lenis from '@studio-freight/lenis';

import HeaderHome from '@/views/Not-connection/LayoutHome/HeaderHome.vue';
import FooterHome from '@/views/Not-connection/LayoutHome/FooterHome.vue';

const scrollContainer = ref(null);
const isScrolled = ref(false);

onMounted(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  const onScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };

  window.addEventListener('scroll', onScroll);
  onUnmounted(() => window.removeEventListener('scroll', onScroll));
});
</script>

<style scoped>
.main-home-layout {
  overflow: hidden;
}

.pt-header {
  padding-top: 80px;
}
</style>
