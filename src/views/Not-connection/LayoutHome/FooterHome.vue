<template>
  <footer class="bg-light pt-5 pb-3 border-top">
    <div class="container">
      <div class="row align-items-center mb-4 flex-column flex-md-row text-center text-md-start">
        <!-- Logo y nombre -->
        <div
          class="col-12 col-md-6 mb-3 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center"
        >
          <img src="@/assets/img/logoNexen.png" alt="Logo" class="logo-img me-3" />
          <h5 class="mb-0 fw-bold text-dark">Nexen E-Logistics</h5>
        </div>

        <!-- Enlaces -->
        <div
          class="col-12 col-md-6 d-flex justify-content-center justify-content-md-end flex-wrap gap-3"
        >
          <router-link to="#" class="text-primary text-decoration-none small">About</router-link>
          <router-link to="#" class="text-primary text-decoration-none small"
            >Free Workouts</router-link
          >
          <router-link to="#" class="text-primary text-decoration-none small">Shop</router-link>
          <router-link to="#" class="text-primary text-decoration-none small">Contact</router-link>
        </div>
      </div>

      <!-- Línea inferior -->
      <div
        class="d-flex flex-column flex-md-row justify-content-between text-muted small text-center text-md-start"
      >
        <span class="mb-2 mb-md-0">
          &copy; {{ new Date().getFullYear() }} Nexen E-Logistics. Todos los derechos reservados.
        </span>
        <span>Hecho con ❤️ por Desarrollo</span>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
footer {
  font-size: 0.95rem;
}

.logo-img {
  height: 50px;
  object-fit: contain;
  transition: transform 0.2s ease;
}
.logo-img:hover {
  transform: scale(1.05);
}
</style>
