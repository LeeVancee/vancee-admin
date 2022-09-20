<template>
  <div class="header">
    <div class="header-lf flx-center">
      <el-icon class="collapse-icon" @click="menuStore.setCollapse()">
        <component :is="isCollapse ? 'expand' : 'fold'"></component>
      </el-icon>
      <Breadcrumb />
    </div>
    <div class="header-ri flx-center">
      <!-- Component size -->
      <AssemblySize />
      <!-- Full screen -->
      <Fullscreen />
      <!-- username -->
      <span class="username">Vancee</span>
      <!-- Avatar -->
      <Avatar />
    </div>
    <!-- infoDialog -->
    <InfoDialog ref="infoRef"></InfoDialog>
    <!-- passwordDialog -->
    <PasswordDialog ref="passwordRef"></PasswordDialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { MenuStore } from '@/store/modules/menu'
import InfoDialog from './components/InfoDialog.vue'
import PasswordDialog from './components/PasswordDialog.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Avatar from './components/Avatar.vue'
import AssemblySize from './components/AssemblySize.vue'
import Fullscreen from './components/Fullscreen.vue'

const menuStore = MenuStore()

const isCollapse = computed((): boolean => menuStore.isCollapse)
</script>

<style scoped lang="scss">
@import './index.scss';
</style>
