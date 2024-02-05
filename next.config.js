/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      webpack: (config, { isServer }) => {
        // Adicione regras para lidar com arquivos binários
        config.module.rules.push({
          test: /\.(node)$/,
          use: 'file-loader',
        });
    
        // Adicione externals se for para o ambiente do servidor (Node.js)
        if (isServer) {
          config.externals.push('canvas.node');
        }
    
        return config;
      },
      images: {
        domains: ['plashmagazine.s3.sa-east-1.amazonaws.com'],
      },
     
}

module.exports = nextConfig
