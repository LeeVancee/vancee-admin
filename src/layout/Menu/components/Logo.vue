<template>
	<div class="logo flx-center" :style="{ width: isCollapse ? '65px' : '240px' }">
		<img src="@/assets/images/logo.svg" alt="logo" />
		<span v-show="!isCollapse">Geeker Admin</span>
	</div>
</template>

<script setup lang="ts">
defineProps<{ isCollapse: boolean }>();
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
