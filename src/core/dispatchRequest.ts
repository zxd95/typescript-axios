import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import xhr from '../core/xhr'
import { buildURL } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'

export default function dispatchAxios(config: AxiosRequestConfig): AxiosPromise {
  // 处理URL参数
  processConfig(config)
  // 实现XMLHttpRequest对象通讯
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 处理config参数配置
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理请求参数params
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
