<template>
	<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
		<el-form-item prop="username">
			<el-input v-model="loginForm.username" placeholder="用户名">
				<template #prefix>
					<el-icon class="el-input__icon"><user /></el-icon>
				</template>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" show-password v-model="loginForm.password" placeholder="密码">
				<template #prefix>
					<el-icon class="el-input__icon"><lock /></el-icon>
				</template>
			</el-input>
		</el-form-item>
	</el-form>
	<div class="login-btn">
		<el-button :icon="CircleClose" round @click="resetForm(loginFormRef)" size="large">重置</el-button>
		<el-button :icon="UserFilled" round @click="login(loginFormRef)" size="large" type="primary" :loading="loading">
			登录
		</el-button>
	</div>
	<!-- <el-button @click="submitParent">触发父组件方法</el-button> -->
</template>

<script setup lang="ts">
import { ref, reactive, inject } from "vue";
import { useRouter } from "vue-router";
import { LoginFrom, InjectProps } from "../interface/index";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import type { ElForm } from "element-plus";
import { ElMessage } from "element-plus";
import { loginApi } from "@/api/modules/login";
import { GlobalStore } from "@/store";
import md5 from "js-md5";

const globalStore = GlobalStore();

// inject
const provideState = inject("provideState") as InjectProps;
console.log(provideState.age);
provideState.changeName();

// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
	username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
	password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

// 登录表单数据
const loginForm = reactive<LoginFrom>({
	username: "admin",
	password: "00000000"
});
const loading = ref<boolean>(false);

const router = useRouter();
// login
const login = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate(async valid => {
		if (valid) {
			loading.value = true;
			try {
				let requestLoginForm: LoginFrom = {
					username: loginForm.username,
					password: md5(loginForm.password)
				};
				const res = await loginApi(requestLoginForm);
				console.log(res);
				globalStore.setToken(res.data!.tokenValue);
				ElMessage.success("登录成功！");
				router.push({ name: "home" });
			} catch (error) {
				console.log(error);
			} finally {
				loading.value = false;
			}
		} else {
			return false;
		}
	});
};

// reset
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

// 接收父组件参数（采用ts专有声明，有默认值）
interface ParentProps {
	age?: string;
	address?: string[];
	obj?: {
		username: string;
		password: string;
	};
}
const props = withDefaults(defineProps<ParentProps>(), {
	age: "18",
	address: () => ["新希望国际", "天府三街"],
	obj: () => {
		return {
			username: "admin",
			password: "123456"
		};
	}
});
// console.log(props);
// 接收父组件参数（采用ts专有声明，无默认值）
// const props1 = defineProps<{ item: string }>();
// console.log(props1);

// 子组件向父组件传输数据（触发父组件的submitParent方法）
const emit = defineEmits<{
	(e: "submitParent", LoginFrom: LoginFrom): void;
}>();

const submitParent = () => {
	emit("submitParent", loginForm);
};

// 子组件数据暴露给父组件
const count = ref<number>(2111);
const consoleNumber = (name: string): void => {
	console.log("我是子组件打印的数据", name);
};
defineExpose({
	count,
	consoleNumber
});
</script>

<style scoped lang="scss">
.el-form-item {
	margin-bottom: 35px;
}
.login-btn {
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	white-space: nowrap;
	.el-button {
		width: 185px;
	}
}
</style>
