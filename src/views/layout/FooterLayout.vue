<template>
  <footer class="footer text-white text-center ms-4 me-4 pt-5 rounded">
    <div class="footer-container">
      <p class="mb-2 d-flex align-items-center justify-content-center gap-2 flex-wrap">
        <img src="@/assets/img/logo-nexen-sinfondo.png" alt="Nexen Logo" style="height: 28px" />
        <span class="text-black"
          ><b>© {{ currentYear }} NexeneLog. Todos los derechos reservados.</b></span
        >
      </p>
      <div class="social-icons d-flex justify-content-center gap-3">
        <a href="#" class="text-white fs-5"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="text-white fs-5"><i class="fab fa-twitter"></i></a>
        <a href="#" class="text-white fs-5"><i class="fab fa-linkedin-in"></i></a>
        <a href="#" class="text-white fs-5"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.footer-container {
  max-width: 100%;
  width: 100%;
}

.social-icons a {
  transition: color 0.2s;
}

.social-icons a:hover {
  color: var(--primaryh, #ffffff);
}
</style>
