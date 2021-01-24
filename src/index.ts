import { AxiosRequestConfig } from './types/index'
import xhr from './core/xhr'
import { buildURL } from './helpers/url'

export default function axios(config: AxiosRequestConfig): void {
  // 处理URL参数
  processConfig(config)
  // 实现XMLHttpRequest对象通讯
  xhr(config)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}
