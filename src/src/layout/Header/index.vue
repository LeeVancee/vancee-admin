<template>
  <div class="header">
    <div class="header-lf flx-center">
      <CollapseIcon></CollapseIcon>
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="header-ri flx-center">
      <!-- Component size -->
      <AssemblySize></AssemblySize>
      <!-- Full screen -->
      <Fullscreen></Fullscreen>
      <!-- User name -->
      <span class="username">Vancee</span>
      <!-- Avatar -->
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseIcon from './components/CollapseIcon.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Fullscreen from './components/Fullscreen.vue'
import AssemblySize from './components/AssemblySize.vue'
import Avatar from './components/Avatar.vue'
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
