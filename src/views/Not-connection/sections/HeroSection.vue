<template>
  <section class="hero-section py-5" ref="heroRef">
    <div class="container-fluid">
      <div
        class="row align-items-center justify-content-center hero-content"
        :class="{ enter: isVisible, leave: !isVisible }"
      >
        <!-- Imagen a la izquierda -->
        <div class="col-lg-6 p-5 d-flex justify-content-center">
          <div class="image-wrapper shadow-lg">
            <img
              src="@/assets/img/main.jfif"
              alt="Multimodal Logistics"
              class="img-fluid h-100 w-auto object-fit-cover"
            />
          </div>
        </div>

        <!-- Texto a la derecha -->
        <div class="col-lg-6 px-5 text-center text-lg-start hero-text">
          <p class="text-uppercase text-muted fw-semibold mb-1">HOLA, SOMOS NEXEN E-LOGISTICS ❤️</p>
          <h1 class="display-4 fw-bold text-primary mb-3">
            Únete al equipo que mueve el futuro de la logística.
          </h1>
          <p class="text-secondary fs-5 mb-4">
            En Nexen estamos en búsqueda de talento para diversas áreas: operaciones,
            administración, atención al cliente, tecnología y más.<br />
            Forma parte de una empresa en crecimiento con impacto nacional.
          </p>
          <router-link
            to="/candidates"
            class="btn btn-primary btn-xl d-inline-flex align-items-center gap-3 px-5 py-3 fs-5 fw-bold pulse"
          >
            <i class="bi bi-person-plus-fill fs-4"></i> Postúlate
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const heroRef = ref(null);
const isVisible = ref(false);

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    { threshold: 0.3 },
  );

  if (heroRef.value) {
    observer.observe(heroRef.value);
  }
});
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.image-wrapper,
.hero-text {
  opacity: 0;
  transition: all 0.8s ease-out;
}

.hero-content.enter .image-wrapper {
  transform: translateX(0);
  opacity: 1;
}

.hero-content.enter .hero-text {
  transform: translateX(0);
  opacity: 1;
}

.hero-content.leave .image-wrapper {
  transform: translateX(-100px);
  opacity: 0;
}

.hero-content.leave .hero-text {
  transform: translateX(100px);
  opacity: 0;
}

.image-wrapper {
  height: 90vh;
  max-height: 700px;
  width: 100%;
  max-width: 1000px;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transform: translateX(-100px);
}

.hero-text {
  transform: translateX(100px);
}

img.object-fit-cover {
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 20px;
}

/* Botón con efecto pulsante */
.pulse {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
}
</style>
