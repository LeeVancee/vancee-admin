import { Table } from "./interface";
import { nextTick, reactive, computed, toRefs, shallowRef, onActivated, onDeactivated } from "vue";
import {
	Refresh,
	CirclePlus,
	Delete,
	Search,
	EditPen,
	Download,
	Upload,
	View,
	Setting,
	ArrowDown,
	ArrowUp
} from "@element-plus/icons-vue";
import { isArray } from "@/utils/is";

/**
 * @description table 页面操作方法封装
 * @param apiUrl 获取表格数据 ApiUrl(必传)
 * @param apiUrl 当前表格的DOM(不必传，默认为“”)
 * @param initParam 获取数据初始化参数(不必传，默认为{})
 * @param isPageable 是否有分页(不必传，默认为true)
 * */
export const useTable = (
	apiUrl: (params: any) => Promise<any>,
	tableRef: any = "",
	initParam: any = {},
	isPageable: boolean = true
) => {
	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		// 是否展开更多搜索框
		searchShow: false,
		// 分页数据
		pageable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {}
	});

	// * 表格页面所需icon(使用shallowRef/markRaw包裹)
	const icon = shallowRef({
		Refresh,
		CirclePlus,
		Delete,
		Search,
		EditPen,
		Download,
		Upload,
		View,
		Setting,
		ArrowDown,
		ArrowUp
	});

	/**
	 * @description 分页查询数据(只包括分页和表格字段排序,排序方式可自行配置)
	 * */
	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageable.pageNum,
				pageSize: state.pageable.pageSize
			};
		},
		set: (newVal: any) => {
			console.log("我是分页更新之后的值", newVal);
		}
	});

	onActivated(() => {
		doLayout();
	});

	/**
	 * @description 防止 keep-alive || 浏览器窗口大小变化 导致 el-table 样式错乱问题
	 * */
	const doLayout = () => {
		nextTick(() => {
			tableRef && tableRef.value.doLayout();
			// window.onresize = () => {
			// tableRef && tableRef.value.doLayout();
			// };
		});
	};

	/**
	 * @description 获取表格数据
	 * @return void
	 * */
	const getTableList = async () => {
		try {
			// 更新查询参数
			updatedTotalParam();
			Object.assign(state.totalParam, initParam);
			const { data } = await apiUrl(state.totalParam);
			state.tableData = isPageable ? data.datalist : data;
			// 解构后台返回的分页数据(如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			isPageable && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * @description 更新查询参数
	 * @param resPageable 后台返回的分页数据
	 * @return void
	 * */
	const updatedTotalParam = () => {
		state.totalParam = {};
		let nowSearchParam: any = {};
		// 防止手动清空输入框携带参数（可以自定义查询参数前缀）
		for (let key in state.searchParam) {
			// * 某些情况下参数为 false/0 也应该携带参数
			if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
				nowSearchParam[key] = state.searchParam[key];
			}
		}
		Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
	};

	/**
	 * @description 更新分页信息
	 * @param resPageable 后台返回的分页数据
	 * @return void
	 * */
	const updatePageable = (resPageable: Table.Pageable) => {
		Object.assign(state.pageable, resPageable);
	};

	/**
	 * @description 表格数据查询
	 * @return void
	 * */
	const search = () => {
		state.pageable.pageNum = 1;
		getTableList();
	};

	/**
	 * @description 表格数据重置
	 * @return void
	 * */
	const reset = () => {
		state.pageable.pageNum = 1;
		state.searchParam = {};
		getTableList();
	};

	/**
	 * @description 每页条数改变
	 * @param val 当前条数
	 * @return void
	 * */
	const handleSizeChange = (val: number) => {
		state.pageable.pageNum = 1;
		state.pageable.pageSize = val;
		getTableList();
	};

	/**
	 * @description 当前页改变
	 * @param val 当前页
	 * @return void
	 * */
	const handleCurrentChange = (val: number) => {
		state.pageable.pageNum = val;
		getTableList();
	};

	/**
	 * @description 格式化表格单元格默认值
	 * @param row 行
	 * @param col 列
	 * @param callValue 当前单元格值
	 * @return void
	 * */
	const defaultFormat = (row: number, col: number, callValue: any) => {
		// 如果为数组,使用/拼接
		if (isArray(callValue)) return callValue.length ? callValue.join(" / ") : "--";
		return callValue ?? "--";
	};

	return {
		...toRefs(state),
		getTableList,
		search,
		reset,
		handleSizeChange,
		handleCurrentChange,
		defaultFormat,
		icon
	};
};
