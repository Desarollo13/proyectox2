<template>
  <header :class="['main-header', { scrolled: isScrolled }]">
    <div class="container d-flex justify-content-between align-items-center py-2 px-2">
      <!-- Logo en desktop -->
      <a
        href="#"
        class="navbar-brand d-none d-lg-flex align-items-center text-dark"
        @click.prevent="goHomeScroll"
      >
        <img src="@/assets/img/logoNexen.png" alt="Logo Nexen" class="logo-img me-2" />
      </a>

      <!-- Botón hamburguesa -->
      <button class="btn btn-outline-primary d-lg-none" @click="toggleMenu">
        <i class="bi" :class="menuOpen ? 'bi-x-lg' : 'bi-list'"></i>
      </button>

      <!-- Navegación -->
      <nav :class="['nav-menu', 'd-lg-flex', 'align-items-center', { 'menu-open': menuOpen }]">
        <!-- "Inicio" solo en móvil -->
        <a href="#" class="nav-link d-lg-none" @click.prevent="goHomeScroll"> Inicio </a>

        <router-link to="#" class="nav-link" @click="scrollTo('about')">About</router-link>
        <router-link to="#" class="nav-link" @click="scrollTo('workouts')"
          >Free Workouts</router-link
        >
        <router-link to="/candidates" class="nav-link">
          <i class="bi bi-person-arms-up"></i> Postúlate
        </router-link>

        <!-- CTA -->
        <router-link
          to="/login"
          class="btn btn-sm btn-primary d-flex align-items-center gap-2 px-3 py-2 mt-2 mt-lg-0"
        >
          <i class="bi bi-door-open"></i>
          <span class="fw-bold text-white">Entrar</span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const isScrolled = ref(false);
const menuOpen = ref(false);
const router = useRouter();
const route = useRoute();

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function goHomeScroll() {
  if (route.path === '/home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    router.push('/home');
  }
}

function scrollTo(id) {
  if (route.path !== '/home') {
    router.push('/home').then(() => {
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}

const onScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener('scroll', onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<style scoped>
.main-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1050;
  background-color: transparent;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
}

.main-header.scrolled {
  background-color: var(--light);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.logo-img {
  height: 70px;
  object-fit: contain;
  transition: transform 0.2s ease;
}
.logo-img:hover {
  transform: scale(1.05);
}

.nav-menu {
  gap: 1.5rem;
}

.nav-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
}
.nav-link:hover {
  text-decoration: underline;
}

@media (max-width: 991px) {
  .nav-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #f8f9fa;
    flex-direction: column;
    align-items: center;
    padding: 1rem 1.5rem;
    display: none;
  }

  .nav-menu.menu-open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .btn {
    width: 100%;
    justify-content: center;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}
</style>
