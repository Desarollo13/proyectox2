<template>
  <div class="sidebar-container">
    <!-- Menú -->
    <ul class="sidebar-menu">
      <li
        v-for="(item, i) in menuItems"
        :key="i"
        class="menu-item"
        @mouseenter="setSubmenuPosition($event) || (hoveredIndex = i)"
        @mouseleave="hoveredIndex = null"
      >
        <div
          class="menu-icon-wrapper"
          @click="item.submenus ? null : handleNavigation(item.path)"
          :class="{ active: isActive(item.path) || isActiveSub(item) }"
        >
          <i :class="item.icon" class="menu-icon"></i>
          <span class="menu-label">{{ item.title }}</span>
        </div>

        <!-- Submenús flotantes -->
        <transition name="fade">
          <div
            v-if="hoveredIndex === i && item.submenus"
            class="submenu-tooltip"
            :style="{ top: `${submenuTop}px` }"
          >
            <ul class="submenu">
              <li v-for="(sub, j) in item.submenus" :key="j">
                <component
                  :is="sub.path.startsWith('#') ? 'button' : 'router-link'"
                  :to="!sub.path.startsWith('#') ? sub.path : undefined"
                  class="nav-link m-2"
                  :class="{ active: isActive(sub.path) }"
                  @click="() => handleSubmenuClick(sub.path)"
                >
                  <i :class="sub.icon"></i>
                  <span>{{ sub.title }}</span>
                </component>
              </li>
            </ul>
          </div>
        </transition>
      </li>
    </ul>

    <!-- Footer -->
    <div class="sidebar-footer">
      <i class="bi bi-person-circle"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { menuItems } from '@/router/menu.js';
import { useAuthStore } from '@/stores/authStore.js';

useAuthStore();
const router = useRouter();
const route = useRoute();

const hoveredIndex = ref(null);
const submenuTop = ref(0);

const setSubmenuPosition = (event) => {
  const iconRect = event.currentTarget.getBoundingClientRect();
  submenuTop.value = iconRect.top + iconRect.height / 2 - 20; // 20px ajuste vertical
};

const handleNavigation = (path) => {
  if (path.startsWith('#')) {
    router.replace({ hash: path });
    goToAnchor(path);
  } else {
    router.push(path);
  }
};

const handleSubmenuClick = (path) => {
  handleNavigation(path);
  hoveredIndex.value = null;
};

const goToAnchor = (hash) => {
  const el = document.getElementById(hash.replace('#', ''));
  if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
};

const isActive = (path) => {
  return path.startsWith('#') ? route.hash === path : route.path === path;
};

const isActiveSub = (item) => {
  return item.submenus?.some((sub) => isActive(sub.path));
};
</script>

<style scoped>
.sidebar-container {
  position: fixed;
  top: 10vh;
  bottom: 10vh;
  left: 20px;
  width: 80px;
  background-color: #ffffff;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
}

.sidebar-header {
  margin-bottom: 2rem;
}

.sidebar-logo {
  width: 40px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.menu-item {
  position: relative;
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
}

.menu-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 0;
  transition: background 0.3s;
}

.menu-icon-wrapper.active,
.menu-icon-wrapper:hover {
  background-color: #e7f1ff;
}

.menu-icon {
  font-size: 1.5rem;
  color: var(--primary);
  min-width: 24px;
}

.menu-label {
  font-size: 0.7rem;
  color: var(--primary);
  margin-top: 0.25rem;
  font-weight: 500;
}

.submenu-tooltip {
  position: fixed;
  left: 100px;
  background-color: white;
  color: #333;
  border-radius: 0.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  min-width: 220px;
  padding: 1rem;
  z-index: 2000;
}

.submenu .nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  gap: 0.5rem;
  border-radius: 0.375rem;
  transition: background 0.2s;
  color: #333;
  text-decoration: none;
  font-size: 0.95rem;
}

.submenu .nav-link.active,
.submenu .nav-link:hover {
  background: #e6f0ff;
  color: var(--primary);
  font-weight: bold;
}

.sidebar-footer {
  margin-top: auto;
  padding: 1rem;
  font-size: 0.9rem;
  text-align: center;
}

.sidebar-footer i {
  font-size: 1.2rem;
  color: var(--primary);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
