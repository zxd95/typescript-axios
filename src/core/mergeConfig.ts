import { AxiosRequestConfig } from '../types'
import { deepMerge, isPlainObject } from '../helpers/util'

const strats = Object.create(null)

// 默认合并策略
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

// 只接受自定义配置合并策略
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}
const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(defaultConfig: AxiosRequestConfig, customConfig?: AxiosRequestConfig): AxiosRequestConfig {
  if (!customConfig) {
    customConfig = {}
  }

  const mergedConfig = Object.create(null)

  for (let key in customConfig) {
    mergeField(key)
  }

  for (let key in defaultConfig) {
    if (!customConfig[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    mergedConfig[key] = strat(defaultConfig[key], customConfig![key])
  }

  return mergedConfig
}
