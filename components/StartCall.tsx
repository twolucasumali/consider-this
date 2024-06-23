import { useVoice } from "@humeai/voice-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Bot, Smartphone, TrainTrack } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchConversationContextAndLastMessage } from "@/utils/supabaseClient";
import { stat } from "fs";

export default function StartCall({ conversationId }: { conversationId: string }) {
  const { status, connect } = useVoice();
  const [firstMessageSent, setFirstMessageSent] = useState<boolean>(false); // Track if the first message has been sent

  const handleComingSoon = () => {
    alert("Coming soon!");
  };

  useEffect(() => {
    const checkFirstMessageSent = async () => {
      if (conversationId) {
        const resultString = await fetchConversationContextAndLastMessage(conversationId);
        setFirstMessageSent(resultString !== `{"conversationContext":null,"lastMessage":null}`); // Set to true if either has content
        console.log("First message sent:", resultString);
        console.log("firstMessageSent:", firstMessageSent);
      }
    };

    checkFirstMessageSent();
  }, [conversationId]);

  useEffect(() => {
    if (firstMessageSent && status.value !== "connected") {
      console.log("First message already sent, connecting...");
      connect()
        .then(() => {})
        .catch(() => {})
        .finally(() => {});
    }
  }, [firstMessageSent, status.value, connect]);

  if (status.value !== "connected" && firstMessageSent) {
    return null;
  }

  return (
    <AnimatePresence>
      {status.value !== "connected" ? (
        <motion.div
          className={"fixed inset-0 p-4 flex items-center justify-center bg-background"}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{
            initial: { opacity: 0 },
            enter: { opacity: 1 },
            exit: { opacity: 0 },
          }}
        >
          <AnimatePresence>
            <motion.div
              variants={{
                initial: { scale: 0.5 },
                enter: { scale: 1 },
                exit: { scale: 0.5 },
              }}
            >
              <Button
                className={"z-50 flex items-center gap-1.5"}
                onClick={() => {
                  connect()
                    .then(() => {})
                    .catch(() => {})
                    .finally(() => {});
                }}
              >
                <span>
                  <Bot
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span><strong>Lesson 1:</strong> How is AI impacting people's livelihoods? </span>
              </Button>
              {/* <Button
                className={"z-50 mt-3 flex items-center gap-1.5"}
                onClick={handleComingSoon}
              >
                <span>
                  <Smartphone
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span><strong>Lesson 2:</strong> How does social media influence people's worldview? </span>
              </Button>
              <Button
                className={"z-50 mt-3 flex items-center gap-1.5"}
                onClick={handleComingSoon}
              >
                <span>
                  <TrainTrack
                    className={"size-4 opacity-50"}
                    strokeWidth={2}
                    stroke={"currentColor"}
                  />
                </span>
                <span><strong>Lesson 3:</strong> On the Trolley Problem: To Pull or Not to Pull? </span>
              </Button> */}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
