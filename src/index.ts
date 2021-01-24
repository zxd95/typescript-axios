import { AxiosRequestConfig } from './types/index'
import xhr from './core/xhr'

export default function axios(config: AxiosRequestConfig) {
  // TODO 实现XMLHttpRequest对象通讯
  xhr(config)
}
