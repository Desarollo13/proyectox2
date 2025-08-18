<template>
  <div ref="scrollContainer">
    <section id="hero" class="mb-5">
      <LazySection :component="HeroSection" />
    </section>

    <section id="stats" class="mb-5 mt-5">
      <LazySection :component="StatsSection" />
    </section>

    <section id="candidates" class="mb-5 mt-5">
      <LazySection :component="CandidatesSection" />
    </section>

    <section id="nexen" class="mb-5 mt-5">
      <LazySection :component="NexenSection" />
    </section>

    <section id="services" class="mb-5 mt-5">
      <LazySection :component="ServicesSection" />
    </section>

    <section id="class-services" class="mb-5 mt-5">
      <LazySection :component="ClassServices" />
    </section>
  </div>
</template>

<script setup>
import LazySection from './sections/LazySection.vue';
import HeroSection from './sections/HeroSection.vue';
import StatsSection from './sections/StatsSection.vue';
import CandidatesSection from './sections/CandidatesSection.vue';
import NexenSection from './sections/NexenSection.vue';
import ServicesSection from './sections/ServicesSection.vue';
import ClassServices from './sections/ClassServices.vue';
</script>
