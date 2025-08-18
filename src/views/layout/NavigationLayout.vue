<template>
  <nav class="breadcrumb-nav">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <router-link to="/" class="text-decoration-none text-primary">Inicio</router-link>
      </li>
      <li
        v-for="(segment, index) in pathSegments"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === pathSegments.length - 1 }"
        aria-current="page"
      >
        <span v-if="index === pathSegments.length - 1">{{ formatSegment(segment) }}</span>
        <router-link v-else :to="getPathLink(index)" class="text-decoration-none text-primary">
          {{ formatSegment(segment) }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { menuItems } from '@/router/menu';

const route = useRoute();

const routeTitles = {};
menuItems.forEach((item) => {
  if (item.path && item.path !== '#') {
    routeTitles[item.path.replace('/', '')] = item.title;
  }
  if (item.submenus) {
    item.submenus.forEach((sub) => {
      if (sub.path && sub.path !== '#') {
        routeTitles[sub.path.replace('/', '')] = sub.title;
      }
    });
  }
});

const pathSegments = computed(() => {
  return route.path.split('/').filter((seg) => seg !== '');
});

const formatSegment = (seg) => {
  const cleaned = seg.toLowerCase();
  return (
    routeTitles[cleaned] || cleaned.charAt(0).toUpperCase() + cleaned.slice(1).replace(/-/g, ' ')
  );
};

const getPathLink = (index) => {
  const segments = pathSegments.value.slice(0, index + 1);
  return '/' + segments.join('/');
};
</script>

<style scoped>
.breadcrumb-item.active {
  color: var(--primary);
  font-weight: 500;
}
</style>
