"use client";
import { useVoice } from "@humeai/voice-react";
import { Button } from "./ui/button";
import { Mic, MicOff, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Toggle } from "./ui/toggle";
import MicFFT from "./MicFFT";
import { cn } from "@/utils";
import { useEffect, useState } from "react";
import fetchConversationData from "@/utils/fetchConversationData";
import formatConversation from "@/utils/formatConversation";
import { updateFormattedConversation } from "@/utils/supabaseClient";

interface ChatStageProps {
  conversationId: string;
}

const ChatStage: React.FC<ChatStageProps> = ({ conversationId }) => {
  const { connect, disconnect, status, isMuted, unmute, mute, micFft } = useVoice();
  const [conversation, setConversation] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      const conversationData = await fetchConversationData(conversationId);
      setConversation(conversationData);
    };

    fetchData();
  }, [conversationId]);

  const handleEndCall = async () => {
    const conversationData = await fetchConversationData(conversationId);
    const formattedConversation = formatConversation(conversationData);
    console.log('Formatted Conversation:', formattedConversation); // For debugging

    // Replace the conversation with the reformatted version (if needed)
    setConversation(formattedConversation);

    // Update the conversation in Supabase
    await updateFormattedConversation(conversationId, formattedConversation);

    disconnect();
  };

  return (
    <div
      className={
        cn(
          "fixed bottom-0 left-0 w-full p-4 flex items-center justify-center",
          "bg-gradient-to-t from-card via-card/90 to-card/0",
        )
      }
    >
      <AnimatePresence>
        {status.value === "connected" ? (
          <motion.div
            initial={{
              y: "100%",
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: "100%",
              opacity: 0,
            }}
            className={
              "p-4 bg-card border border-border rounded-lg shadow-sm flex items-center gap-4"
            }
          >
            <Toggle
              pressed={!isMuted}
              onPressedChange={() => {
                if (isMuted) {
                  unmute();
                } else {
                  mute();
                }
              }}
            >
              {isMuted ? (
                <MicOff className={"size-4"} />
              ) : (
                <Mic className={"size-4"} />
              )}
            </Toggle>

            <div className={"relative grid h-8 w-48 shrink grow-0"}>
              <MicFFT fft={micFft} className={"fill-current"} />
            </div>

            <Button
              className={"flex items-center gap-1"}
              onClick={handleEndCall}
              variant={"destructive"}
            >
              <span>
                <Phone
                  className={"size-4 opacity-50"}
                  strokeWidth={2}
                  stroke={"currentColor"}
                />
              </span>
              <span>End Call</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ChatStage;