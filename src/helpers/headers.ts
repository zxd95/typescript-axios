import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 处理headers参数统一形式
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }

  Object.keys(headers).forEach((key) => {
    if (key !== normalizedName && key.toLowerCase() === normalizedName.toLowerCase()) {
      headers[normalizedName] = headers[key]
      delete headers[key]
    }
  })
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)

  headers.split('\r\n').forEach((line) => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  return headers
}
