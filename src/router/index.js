import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import Login from '@/views/pages/login/LoginAuth.vue';
import Main from '@/views/layout/MainLayout.vue';
import HomePage from '@/views/Not-connection/HomePage.vue';
import MainHome from '@/views/Not-connection/LayoutHome/MainHome.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { public: true },
    },
    {
      path: '/',
      component: Main,
      redirect: '/home',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/pages/dashboard/DashboardMain.vue'),
        },
        {
          path: 'profile',
          name: 'profile',
          component: () => import('@/views/pages/profiles/ProfilesIndex.vue'),
        },
        {
          path: 'change-password',
          name: 'change-password',
          component: () => import('@/components/utils/ComingSoon.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/pages/users/UserPage.vue'),
        },
        {
          path: 'branch-offices',
          name: 'branch-offices',
          component: () => import('@/views/pages/branch-offices/BranchOffice.vue'),
        },
        {
          path: 'areas',
          name: 'Areas',
          component: () => import('@/views/pages/areas/AreasView.vue'),
        },
        {
          path: 'categories',
          name: 'Categorias',
          component: () => import('@/components/utils/ComingSoon.vue'),
        },
        {
          path: 'positions',
          name: 'positions',
          component: () => import('@/views/pages/positions/PositionView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: MainHome,
      redirect: '/home',
      meta: { public: true },
      children: [
        {
          path: '/candidates',
          name: 'candidates',
          component: () => import('@/views/pages/profiles/ProfilesIndex.vue'),
        },
        {
          path: '/home',
          name: 'Home',
          component: HomePage,
        },
      ],
    },
    // Ruta 404
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/components/utils/NotFound.vue'),
      meta: { public: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some((record) => record.meta?.public);
  const auth = useAuthStore();

  const tokenInStorage = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))?.token
    : null;

  if (!isPublic && (!auth.token || !tokenInStorage)) {
    auth.logout();
    return next('/login');
  }

  if (to.path === '/login' && auth.token && tokenInStorage) {
    return next('/dashboard');
  }

  next();
});

export default router;
