<template>
  <header class="topbar mt-3 mx-auto px-3 py-2">
    <div class="d-flex justify-content-between align-items-center w-100">
      <!-- Izquierda: Logo -->
      <div class="d-flex align-items-center gap-2">
        <router-link to="/dashboard" class="d-flex align-items-center text-primary fw-bold fs-5">
          <img src="@/assets/img/logoNexen.png" alt="Logo" class="logo-img me-2" />
        </router-link>
      </div>

      <!-- Derecha: Usuario y Notificaciones -->
      <div class="d-flex align-items-center gap-3">
        <!-- Notificaciones -->
        <div class="dropdown" @click="toggleDropdown">
          <button class="btn btn-outline-primary position-relative rounded-circle p-1">
            <i class="bi bi-bell"></i>
            <span
              class="badge bg-danger position-absolute top-0 start-100 translate-middle p-1 rounded-circle"
            >3</span
            >
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow px-2 animated-dropdown">
            <li class="dropdown-header fw-bold text-dark">Notificaciones</li>
            <li>
              <a class="dropdown-item small" href="#"
              ><i class="bi bi-info-circle text-primary me-2"></i>Nuevo cambio en tu perfil</a
              >
            </li>
            <li>
              <a class="dropdown-item small" href="#"
              ><i class="bi bi-envelope text-success me-2"></i>Tienes un mensaje sin leer</a
              >
            </li>
            <li>
              <a class="dropdown-item small" href="#"
              ><i class="bi bi-shield-exclamation text-warning me-2"></i>Verifica tu contraseña</a
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item text-center text-primary small" href="#">Ver todas</a></li>
          </ul>
        </div>

        <!-- Usuario -->
        <div class="dropdown" @click="toggleDropdown">
          <button
            class="btn btn-outline-primary d-flex align-items-center gap-2 rounded-pill px-3 py-1"
          >
            <img src="@/assets/img/avatar-1.jpg" alt="user" class="avatar-img" />
            <span class="d-none d-md-inline">{{ authStore.userName }}</span>
            <i class="bi bi-chevron-down small"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end shadow mt-2 animated-dropdown">
            <li>
              <router-link to="/profile" class="dropdown-item"
              ><i class="bi bi-person-circle me-2"></i>Perfil</router-link
              >
            </li>
            <li>
              <router-link to="/change-password" class="dropdown-item"
              ><i class="bi bi-lock me-2"></i>Cambio de contraseña</router-link
              >
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="logout"
              ><i class="bi bi-box-arrow-right me-2"></i>Cerrar sesión</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();

const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}

function toggleDropdown(event) {
  const dropdown = event.currentTarget.closest('.dropdown');
  if (dropdown) {
    dropdown.classList.toggle('show');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) menu.classList.toggle('show');
  }
}

onMounted(() => {
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.dropdown').forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
        dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
      }
    });
  });
});
</script>

<style scoped>
.topbar {
  width: 94%;
  height: 50px;
  background-color: #ffffff;
  border-radius: 0.75rem;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: var(--primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.logo-img {
  height: 50px;
  object-fit: cover;
  transition: transform 0.2s ease;
  display: block;
}

.logo-img:hover {
  transform: scale(1.2);
}

.avatar-img {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.btn-outline-primary,
.btn-user {
  padding-top: 6px;
  padding-bottom: 6px;
  line-height: 1;
}

h1,
h2 {
  margin-top: 0;
  margin-bottom: 0;
}

/* 🔥 Responsive desde 850px hacia abajo */
@media (max-width: 850px) {
  .topbar {
    height: 46px;
    padding: 0 0.75rem;
    justify-content: space-between;
  }

  .logo-img {
    height: 36px;
    transform: none !important;
  }

  .avatar-img {
    height: 26px;
    width: 26px;
  }

  .btn-outline-primary,
  .btn-user {
    padding: 4px 6px;
    font-size: 0.85rem;
  }

  .btn-user span {
    display: none; /* Oculta el nombre de usuario en móvil */
  }

  h1,
  h2 {
    font-size: 1rem;
    text-align: center;
  }
}
.dropdown-item:focus {
  color: white;
  background-color: var(--primary);
}

/* 📱 Responsive para pantallas tipo iPhone SE / 375px */
@media (max-width: 480px) {
  .topbar {
    padding: 0 0.5rem;
  }

  .logo-img {
    height: 30px;
  }

  .avatar-img {
    height: 24px;
    width: 24px;
  }

  .btn-outline-primary {
    padding: 3px 6px;
  }
}
</style>
