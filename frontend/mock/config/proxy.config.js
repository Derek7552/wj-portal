/* ==========================================
   Proxy 代理配置
   用于开发环境中转发 API 请求到后端服务
   ========================================== */

/**
 * Vite Proxy 配置示例
 *
 * 在 vite.config.js 中使用:
 *
 * import { defineConfig } from 'vite'
 * import { proxyConfig } from './frontend/mock/config/proxy.config.js'
 *
 * export default defineConfig({
 *   server: {
 *     proxy: proxyConfig
 *   }
 * })
 */

export const proxyConfig = {
    // 代理所有以 /api 开头的请求
    '/api': {
        // 目标服务器地址
        target: 'http://localhost:8080',

        // 是否改变请求源（必须设置为 true）
        changeOrigin: true,

        // 路径重写（可选）
        // 例如: /api/users -> /users
        rewrite: (path) => path.replace(/^\/api/, ''),

        // 配置代理服务器
        configure: (proxy, options) => {
            // 监听 proxy 的 proxyReq 事件，可以在请求前修改请求
            proxy.on('proxyReq', (proxyReq, req, res) => {
                console.log('[Proxy]', req.method, req.url, '->', proxyReq.path);
            });

            // 监听 proxyRes 事件，可以在响应后修改响应
            proxy.on('proxyRes', (proxyRes, req, res) => {
                console.log('[Proxy Response]', proxyRes.statusCode, req.url);
            });

            // 监听错误事件
            proxy.on('error', (err, req, res) => {
                console.error('[Proxy Error]', err);
            });
        }
    },

    // WebSocket 代理配置
    '/ws': {
        target: 'ws://localhost:8080',
        ws: true,
        changeOrigin: true
    }
};

/**
 * Webpack DevServer Proxy 配置示例
 *
 * 在 webpack.config.js 中使用:
 *
 * module.exports = {
 *   devServer: {
 *     proxy: webpackProxyConfig
 *   }
 * }
 */

export const webpackProxyConfig = {
    '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },

        // 日志级别
        logLevel: 'debug',

        // 拦截器
        onProxyReq: (proxyReq, req, res) => {
            console.log('[Webpack Proxy]', req.method, req.url);
        },

        onProxyRes: (proxyRes, req, res) => {
            console.log('[Webpack Proxy Response]', proxyRes.statusCode);
        },

        onError: (err, req, res) => {
            console.error('[Webpack Proxy Error]', err);
        }
    }
};

/**
 * 多环境代理配置
 */

export const envProxyConfig = {
    // 开发环境
    development: {
        '/api': {
            target: 'http://localhost:8080',
            changeOrigin: true
        }
    },

    // 测试环境
    test: {
        '/api': {
            target: 'https://test-api.clouditera.com',
            changeOrigin: true,
            secure: false  // 如果是 https，且证书无效，设置为 false
        }
    },

    // 预发布环境
    staging: {
        '/api': {
            target: 'https://staging-api.clouditera.com',
            changeOrigin: true
        }
    }
};

/**
 * 根据环境变量获取代理配置
 */
export function getProxyConfig(env = 'development') {
    return envProxyConfig[env] || envProxyConfig.development;
}

/**
 * Proxy 配置说明:
 *
 * 1. target: 目标服务器地址
 *    - 后端 API 服务器的地址
 *    - 可以是 http:// 或 https://
 *
 * 2. changeOrigin: 是否改变请求源
 *    - 设置为 true 时，会将 Host header 改为 target 的值
 *    - 解决跨域问题的关键配置
 *
 * 3. rewrite / pathRewrite: 路径重写
 *    - 修改请求路径
 *    - 例如: /api/users -> /users
 *
 * 4. ws: WebSocket 支持
 *    - 设置为 true 启用 WebSocket 代理
 *
 * 5. secure: HTTPS 证书验证
 *    - 设置为 false 跳过证书验证（仅开发环境使用）
 *
 * 6. headers: 自定义请求头
 *    - 可以添加或修改请求头
 *
 * 7. bypass: 条件代理
 *    - 根据请求动态决定是否代理
 */
