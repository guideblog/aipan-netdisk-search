/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['cloudflare-ipfs.com'],
  },
  webpack: (config, { dev, isServer }) => {

if (config.name === 'server') {
      // 不要缓存服务器端构建
      config.cache = false;
    } else {
      // 对于客户端构建，使用文件系统缓存，但限制大小
      config.cache = {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.webpack-cache'), // 自定义缓存目录
        maxMemoryGenerations: 2, // 限制内存缓存
      };
    }
     return config;
  },

    
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 20000000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              chunks: 'all',
              name: 'framework',
              test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              priority: 30,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    return config;
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
