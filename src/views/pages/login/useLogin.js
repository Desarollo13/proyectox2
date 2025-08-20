import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/AuthUser'
import { useAuthStore } from '@/stores/authStore'

export function useLogin() {
  const router = useRouter()
  const authStore = useAuthStore()

  const isLoading = ref(false)
  const username = ref('')
  const password = ref('')
  const usernameTouched = ref(false)
  const passwordTouched = ref(false)
  const loginError = ref('')
  const showSuccess = ref(false)
  const showError = ref(false)

  const validUsername = computed(() => username.value.trim().length >= 3)
  const validPassword = computed(() => password.value.trim().length >= 6)

  const handleLogin = async () => {
    usernameTouched.value = true
    passwordTouched.value = true
    loginError.value = ''

    if (!validUsername.value || !validPassword.value) return

    isLoading.value = true
    try {
      const res = await login({
        username: username.value.trim(),
        password: password.value, // no trim por si tu backend es sensible a espacios
      })

      if (!res?.status) {
        loginError.value = res?.message || 'Credenciales inválidas'
        showError.value = true
        return
      }

      authStore.setAuth({
        token: res.data.token,
        user: res.data.user,
      })

      showSuccess.value = true
    } catch (err) {
      loginError.value = err?.response?.data?.message || 'Error inesperado. Intenta nuevamente.'
      showError.value = true
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    username,
    password,
    usernameTouched,
    passwordTouched,
    loginError,
    showSuccess,
    showError,
    validUsername,
    validPassword,
    handleLogin,
    router,
  }
}

