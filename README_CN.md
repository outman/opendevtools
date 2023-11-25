## OpenDevTools
[English](https://github.com/outman/opendevtools/blob/main/README.md)

一个在线的开发者工具系统，包含了以下功能：
- chatGPT web 客户端
- 时间转换
- 颜色值 RGB 和 hex 转换，以及提供了一些示例颜色选择。
- 生成二维码


### 开发
```bash
git clone git@github.com:outman/opendevtools.git
cd opendevtools

npm install
# or 
yarn


npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### 服务端 ENV 配置 
```env
OPENAI_API_KEY=''       # chatGPT API key
APP_ENV=''              # production or local 环境设置，local 会去除 Vercel 的数据分析功能。
BASE_URL=''             # https://api.openai.com/v1  或者其它兼容 openai 接口的服务.
ACCESSTOKEN=''          # 服务端认真 token
```

> 如果服务端 ENV 配置了 OPENAI_API_KEY，如果仅仅是内部（内网）部署使用，是否配置 ACCESSTOKEN 都可以，如果是外网访问请配置 ACCESSTOKEN，否则外部就可以直接访问并且消耗你的 OPENAI 服务额度。

### chatGPT 客户端说明

![image](https://github.com/outman/opendevtools/blob/main/example/example.png?raw=true)

1. 修改当前默认的 system prompt，每次会话开始的时候可以修改。
2. 查看历史会话，所有的会话都被存储在本地的 indexedDB 内，可以查看历史数据。
3. 设置：主要是客户端内容设置，例如 API KEY 等，如果服务端 ENV 不设置任何 key，则可以完全通过这里设置，并且全部存储在浏览器本地 localStorage 内。

>>> ![image](https://github.com/outman/opendevtools/blob/main/example/settings.png?raw=true)

>>> 如果服务端前 ENV 配置了 ACCESSTOKEN，则此处也必须配置与服务器端相同的值，否则无法正常访问。

4. 创建一个新的会话。

## 在 Vercel 部署

1. 点击链接 [Vercel Platform](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Foutman%2Fopendevtools&hasTrialAvailable=1&showOptionalTeamCreation=false&project-name=opendevtools&framework=nextjs&totalProjects=1&remainingProjects=1) 
2. 选择项目，按照提示操作即可部署。

## 说明
> 本项目只有在 chatGPT UI Client 部分涉及存储配置和历史会话，数据均存储在本地的 localStorage 和 IndexedDB 内，不会存储到服务器端。

### 未开放 chatGPT 访问的地区开发者需要处理本地代理的问题，否则无法访问 API，env 配置 HTTP_PROXY，之后将 src/app/api/openai/route.js 文件内的 
```javascript
// -掉注释
// import { HttpsProxyAgent } from "https-proxy-agent";
// httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
// httpsAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),

// +注释掉
export const runtime = 'edge';
```