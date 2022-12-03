import { type ConfigEnv, type UserConfigExport, loadEnv } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vuejsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

export default (configEnv:ConfigEnv):UserConfigExport => {
  // 解析环境变量
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as EnvConfig
  const { VITE_PUBLIC_PATH } = viteEnv
  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        // 使用@符号指向src目录
        "@": resolve(__dirname, './src')
      }
    },
    // 使用代理服务器
    server: {
      // 是否开启https
      https: false,
      // 设置host，开启host之后，可以使用network访问项目
      host: true,
      // 端口号
      port: 8081,
      // 是否自动打开浏览器
      open: true,
      // 是否允许跨域
      cors: true,
      // 如果端口被占用，是否直接退出
      strictPort: false,
      // 使用proxy进行接口代理
      proxy: {
        '/api/v1': {
          // 目标地址
          target: '',
          ws: true,
          // 是否跨域
          changeOrigin: true,
          // 路径重写
          rewrite: (path)=>path.replace('/api/v1','')
        }
      }
    },
    // 打包设置
    build: {
      // 消除打包大小限制警告
      chunkSizeWarningLimit: 2000,
      // vite版本2.6以上需要设置minify
      minify: 'terser',
      // 在打包时移除debugger和console.log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          // 是否删除注释
          comments: false
        }
      },
      // 打包之后的静态资源目录
      assetsDir: 'static'
    },
    // vite插件
    plugins: [
      vue(),
      vuejsx(),
      // 将svg静态图转化为vue组件
      svgLoader(),
      // svg设置
      createSvgIconsPlugin({
        // 解析svg路径
        /* process.cwd() 也是寻找文件路径，但是跟__dirname有所不同的是，process.cwd是使用node寻找文件路径的地址，__dirname是寻找当前模块在全局中的位置，在进行打包的时候，process会直接用node启动package.json里面的文件，所以就保证了文件在不同目录下的时候，路径始终不变 */
        iconDirs: [path.resolve(process.cwd())],
        symbolId: 'icon-[dir]-[name]'
      })
    ]
  }
}
