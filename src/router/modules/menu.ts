import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/constant";

// menu模块(全部为二级路由，为了做缓存)
const menuRouter: Array<RouteRecordRaw> = [
	{
		path: "/menu",
		component: Layout,
		redirect: "/menu/menu1",
		meta: {
			title: "菜单嵌套"
		},
		children: [
			{
				path: "/menu/menu1",
				name: "menu1",
				component: () => import(/* webpackChunkName: "menu" */ "@/views/menu/menu1/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单1",
					key: "menu1"
				}
			},
			{
				path: "/menu/menu2/menu21",
				name: "menu21",
				component: () => import(/* webpackChunkName: "menu21" */ "@/views/menu/menu2/menu21/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单2-1",
					key: "menu21"
				}
			},
			{
				path: "/menu/menu2/menu23",
				name: "menu23",
				component: () => import(/* webpackChunkName: "menu23" */ "@/views/menu/menu2/menu23/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单2-3",
					key: "menu23"
				}
			},
			{
				path: "/menu/menu3",
				name: "menu3",
				component: () => import(/* webpackChunkName: "menu3" */ "@/views/menu/menu3/index.vue"),
				meta: {
					keepAlive: true,
					requiresAuth: true,
					title: "菜单3",
					key: "menu3"
				}
			}
		]
	}
];

export default menuRouter;
