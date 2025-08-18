<script setup>
import { watch, defineProps, defineEmits } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps({
  show: { type: Boolean, default: false },
  icon: { type: String, default: 'success' }, // success | error | info | warning
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  confirmButtonText: { type: String, default: '' },
  cancelButtonText: { type: String, default: '' },
  timer: { type: Number, default: null },
  showConfirmButton: { type: Boolean, default: true },
  showCancelButton: { type: Boolean, default: false },
});

const emit = defineEmits(['confirmed', 'cancelled', 'closed']);

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      Swal.fire({
        icon: props.icon,
        title: props.title,
        text: props.message,
        showConfirmButton: props.showConfirmButton,
        showCancelButton: props.showCancelButton,
        confirmButtonText: props.confirmButtonText || undefined,
        cancelButtonText: props.cancelButtonText || undefined,
        timer: props.timer || undefined,
        timerProgressBar: !!props.timer,
      }).then((result) => {
        if (result.isConfirmed) emit('confirmed');
        if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) emit('cancelled');
        emit('closed');
      });
    }
  },
);
</script>

<template>
  <!-- Este componente no renderiza nada, solo lanza SweetAlert2 -->
  <div style="display: none"></div>
</template>
