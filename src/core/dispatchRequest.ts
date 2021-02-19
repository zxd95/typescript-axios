import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types/index'
import xhr from '../core/xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders, flattenHeaders } from '../helpers/headers'

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
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

// 处理请求参数params
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 处理请求参数data
function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config
  return transformRequest(data)
}

// 处理请求参数headers参数
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
