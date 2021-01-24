import { AxiosRequestConfig } from '../types/index'

export default function xhr(config: AxiosRequestConfig) {
  const { url, method = 'get', data = null } = config

  const request = new XMLHttpRequest()

  // method必须转换为全大写，url不能为空，async开启异步
  request.open(method.toUpperCase(), url!, true)

  request.send(data)
}
