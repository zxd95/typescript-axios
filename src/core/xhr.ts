import { AxiosRequestConfig } from '../types/index'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers = {} } = config

  const request = new XMLHttpRequest()

  // method必须转换为全大写，url不能为空，async开启异步
  request.open(method.toUpperCase(), url!, true)

  // 设置请求头
  Object.keys(headers).forEach((key) => {
    if (data === null && key.toLowerCase() === 'content-type') {
      delete headers[key]
    } else {
      request.setRequestHeader(key, headers[key])
    }
  })

  request.send(data)
}
