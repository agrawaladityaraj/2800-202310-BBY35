export type IChatGPTAgent = "user" | "system" | "assistant";

export interface IChatGPTMessage {
  role: IChatGPTAgent;
  content: string;
}
