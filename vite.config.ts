// import { defineConfig } from 'vite'
// import reactRefresh from '@vitejs/plugin-react-refresh'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()]
// })
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { viteMockServe } from "vite-plugin-mock";

const localEnabled = process.env.USE_MOCK === 'true' || false;
const prodEnabled = process.env.USE_CHUNK_MOCK === 'true' || false;
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  plugins: [reactRefresh(),  viteMockServe({
        mockPath: "./src/mock", // mock文件路径
        supportTs: true,       // 是否支持typeScript
        localEnabled: localEnabled, // 开发打包开关
        prodEnabled: prodEnabled, // 生产打包开关
        watchFiles: true, // 监视文件更改
        injectCode: `
          import { setupProdMockServer } from './src/mock';
          setupProdMockServer();
        `,
        logger: false, //是否在控制台显示请求日志 
    })
],
  base: "/",
  envDir: path.resolve(__dirname, "./env")
})