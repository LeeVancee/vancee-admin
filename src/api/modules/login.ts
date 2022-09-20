import { LoginAPI, LoginParams } from '@/api/interface/index'
import { ContentTypeEnum } from '@/enums/httpEnum'
import http from '@/api'

// 后端微服务端口名
const PORT1 = '/tourmanager'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: LoginParams) => {
  return http.post<LoginAPI>(PORT1 + `/web/v1.0/user/login-by-name-passwd`, params)
}

// * 导出系统日志
export const downLoadFile = () => {
  return http.post<LoginAPI>(PORT1 + `/web/v1.0/sys/oplog/exportExcel`)
}
