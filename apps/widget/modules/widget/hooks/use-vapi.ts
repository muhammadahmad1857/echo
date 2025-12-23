"use client";
import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";

interface TranscriptMessage {
  role: "user" | "assistant";
  text: string;
}

export const useVapi = (publicApiKey: string,assistantApiKey:string) => {
  const [vapi, setVapi] = useState<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcripts, setTranscripts] = useState<TranscriptMessage[]>([]);

  useEffect(() => {
    const vapiInstance = new Vapi(publicApiKey);
    setVapi(vapiInstance);
    vapiInstance.on("call-start", () => {
      setIsConnected(true);
      setIsConnecting(false);
      setTranscripts([]);
    });
    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsConnecting(false);
      setIsSpeaking(false);
    });
    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });
    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });
    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
      setIsConnecting(false);
    });
    vapiInstance.on("message", (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscripts((prev) => [
          ...prev,
          {
            role: message.role === "user" ? "user" : "assistant",
            text: message.transcript,
          },
        ]);
      }
    });
    return () => {
      vapiInstance?.stop();
    };
  }, [publicApiKey]);
  const startCall = () => {
    if (!vapi || !assistantApiKey) return;
    setIsConnecting(true);
    vapi.start(assistantApiKey);
  };
  const endCall = () => {
    if (!vapi) return;
    vapi.stop();
  };

  return {
    isConnected,
    isConnecting,
    isSpeaking,
    transcripts,
    startCall,
    endCall,
  };
};
