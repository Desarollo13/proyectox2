<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div class="card shadow-lg rounded-xl p-6 h-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-gray-200">
      <slot name="chart" />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <slot name="metrics" />
    </div>
  </div>
</template>
