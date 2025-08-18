<template>
  <UnicModal :visible="visible" title="Eliminar usuario" size="lg" @close="$emit('close')">
    <FormUser ref="formRef" @save="onSaveForm" />

    <template #footer>
      <div class="d-flex justify-content-end gap-2">
        <button class="btn btn-danger" @click="$emit('close')">Cancelar</button>
        <button class="btn btn-primary" @click="handleAccept">Aceptar</button>
      </div>
    </template>
  </UnicModal>
</template>

<script setup>
import UnicModal from '@/components/modals/UnicModal.vue';
import FormUser from './FormUser.vue';
import { ref } from 'vue';

defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
});

const formRef = ref(null);

const handleAccept = () => {
  if (formRef.value?.saveUser) {
    formRef.value.saveUser();
  }
};

const onSaveForm = (data) => {
  console.log('Datos enviados del formulario:', data);
};

defineEmits(['close']);
</script>
