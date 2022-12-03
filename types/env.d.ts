
// 声明vite环境变量的类型
declare interface EnvConfig {
  // 只读模式，不可更改
  readonly VITE_BASE_API: string
  readonly VITE_ROUTER_HISTORY: 'hash'|'html5'
  readonly VITE_PUBLIC_PATH: string
}
