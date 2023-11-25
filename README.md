## OpenDevTools
[中文](https://github.com/outman/opendevtools/blob/main/README_CN.md)

An online developer tool system that includes the following features:

- chatGPT web client
- Time conversion
- Conversion between RGB and hex color values, as well as some example color choices
- Generate QR codes


### Getting Started
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

### Server ENV Config 
```env
OPENAI_API_KEY=''       # chatGPT API key
APP_ENV=''              # production or local
BASE_URL=''             # https://api.openai.com/v1  or others proxy host.
ACCESSTOKEN=''          # SERVER AUTH.
```

> If the server ENV is configured with OPENAI_API_KEY, configuring ACCESSTOKEN is optional if you are only using it for internal (intranet) deployment. However, if it is for external access, please configure ACCESSTOKEN, otherwise, external users can directly access and consume your OPENAI service quota.

### chatGPT client 


![image](https://github.com/outman/opendevtools/blob/main/example/example.png?raw=true)

1. Modify the default system prompt, which can be altered at the beginning of each session.
2. View the historical sessions. All the conversations are stored in the local indexedDB, where historical data can be seen.
3. Settings: Mainly involving client-side settings such as the API KEY and so on. If the server-side ENV doesn't set any key, settings can be fully adjusted here and all data is stored in the local browser's localStorage.

>>> ![image](https://github.com/outman/opendevtools/blob/main/example/settings.png?raw=true)

>>> If the server-side ENV has configured ACCESSTOKEN, the same value must also be configured here, otherwise, normal access will not be possible.

4. Create a new session.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new/import?s=https%3A%2F%2Fgithub.com%2Foutman%2Fopendevtools&hasTrialAvailable=1&showOptionalTeamCreation=false&project-name=opendevtools&framework=nextjs&totalProjects=1&remainingProjects=1) from the creators of Next.js.

## WARNING:
*This project only involves storage configuration and historical sessions in the chatGPT UI Client section. All data is stored in local localStorage and IndexedDB, not saved on the server side.*


## PROXY 
Developers located in regions where chatGPT access is not available need to address the issue of local proxies in order to access the API. They should configure the HTTP_PROXY in the env settings and modify the comments within the src/app/api/openai/route.js file.

```javascript
// -掉注释
// import { HttpsProxyAgent } from "https-proxy-agent";
// httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
// httpsAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),

// +注释掉
export const runtime = 'edge';
```