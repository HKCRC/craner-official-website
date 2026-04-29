/**
 * PM2 生产进程配置。
 * 端口沿用 package.json 的 `start`（当前为 `next start -p 7998`）。
 * 部署前在项目根目录执行：`yarn build` 或 `npm run build`。
 */
module.exports = {
  apps: [
    {
      name: "craner-web",
      cwd: __dirname,
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
