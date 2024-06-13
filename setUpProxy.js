import { createProxyMiddleware } from "http-proxy-middleware";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (app) {
  app.use(
    "/oauth2/authorization/kakao",
    createProxyMiddleware({
      target: "https://ggorangjirang.duckdns.org",
      changeOrigin: true,
    })
  );
}
