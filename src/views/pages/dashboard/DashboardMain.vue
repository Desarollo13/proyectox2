<template>
  <div>
    <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh">
      <Dashboard />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

import Dashboard from './Dashboard-components/DashboardComponents.vue';

onMounted(() => {});
</script>
