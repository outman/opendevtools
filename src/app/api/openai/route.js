import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
// import { HttpsProxyAgent } from "https-proxy-agent";
// import { Readable } from "stream";

const useProxy = process.env.HTTP_PROXY || '';

let httpProxyOptions = {};
if (useProxy) {
  httpProxyOptions = {
    proxy: false,
    // httpAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
    // httpsAgent: new HttpsProxyAgent(process.env.HTTP_PROXY),
  };
}

export async function POST(req) {
  const json = await req.json();
  let { platform, ...rest } = json;
  if (platform !== 'openai') {
    const dataBuffer = Buffer.from(`Unsupported platform: ${platform}.`);
    return new StreamingTextResponse(dataBuffer);
  }

  let { model, temperature, presencePenalty, frequencyPenalty, topP, messages, ...apiConfig } = rest;
  let { apiKey, baseUrl, organization } = apiConfig;

  const openai = new OpenAI({
    apiKey: apiKey ? apiKey : process.env.OPENAI_API_KEY,
    baseURL: baseUrl ? baseUrl : process.env.BASE_URL,
    organization: organization ? organization : null,
  });

  const response = await openai.chat.completions.create(
    {
      stream: true,
      model: model,
      messages: messages,
      temperature: temperature,
      presence_penalty: presencePenalty,
      frequency_penalty: frequencyPenalty,
      top_p: topP
    },
    httpProxyOptions
  );
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
export const runtime = 'edge';
// export const preferredRegion = 'sfo1';