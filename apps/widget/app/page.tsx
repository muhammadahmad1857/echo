"use client";

import { useVapi } from "@/modules/widget/hooks/use-vapi";
import { Button } from "@workspace/ui/components/button";
export default function Page() {
  const {
    startCall,
    endCall,
    isConnected,
    isConnecting,
    isSpeaking,
    transcripts,
  } = useVapi("ca2c4fbf-16e5-4dee-9e0a-e7a10697ef4b","assistant-key");
  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-8">
      <p className="mb-6">
        Welcome to <span className="font-semibold">app/widget</span>
      </p>
      <div className="bg-white/10 rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <Button onClick={() => startCall()}>Start Call</Button>
        <Button onClick={() => endCall()} variant={"destructive"}>
          End Call
        </Button>
        <p>is connected: {isConnected}</p>
        <p>is connecting: {isConnecting}</p>
        <p>is speaking: {isSpeaking}</p>
        <p>Transcript: {JSON.stringify(transcripts)}</p>
      </div>
    </div>
  );
}
