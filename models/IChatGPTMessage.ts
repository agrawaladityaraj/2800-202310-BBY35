export type IChatGPTAgent = "user" | "system" | "assistant"; // who is speaking (only three options)

// each message will have a role and content
export interface IChatGPTMessage {
  role: IChatGPTAgent; // who is speaking
  content: string; // content of the message
}
