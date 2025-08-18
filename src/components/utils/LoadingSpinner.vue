<template>
  <div class="loading-overlay">
    <div class="spinner-border text-primary" role="status" style="width: 5rem; height: 5rem">
      <span class="visually-hidden">Cargando...</span>
    </div>
    <strong class="mt-4 fs-5 text-primary">Espera un momento...</strong>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(6px);
  background-color: rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
