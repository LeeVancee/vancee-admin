<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="@/assets/images/avatar.png" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item @click.native="openDialog('infoRef')">个人资料</el-dropdown-item>
				<el-dropdown-item @click.native="openDialog('passwordRef')">修改密码</el-dropdown-item>
				<el-dropdown-item @click.native="logout" divided>退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
	<!-- infoDialog -->
	<InfoDialog ref="infoRef"></InfoDialog>
	<!-- passwordDialog -->
	<PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();

// logout
const logout = () => {
	ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning"
	}).then(() => {
		router.push({ name: "login" });
		ElMessage({
			type: "success",
			message: "退出登录成功！"
		});
	});
};

interface DialogExpose {
	openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// openDialog
const openDialog = (refName: string) => {
	if (refName == "infoRef") return infoRef.value?.openDialog();
	passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
