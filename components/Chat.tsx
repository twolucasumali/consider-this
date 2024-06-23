"use client";

import { ComponentRef, useRef, useState } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import ChatBox from "./ChatBox";

import Agent from "./Agent";
import logo from './images/socratesLogo.png';
import CustomTypingEffect from './CustomTypingEffect';
import Messages from "./Messages";
import Controls from "./Controls";
import StartCall from "./StartCall";
import AgentComponent from "./Agent";


// Initial config setup
const CONFIG_ONE = "5a0c849f-bf21-4f9d-97f0-958ff8619fba";
const CONFIG_TWO = "dbe866f5-2bb7-44df-a73c-846feb59f4ec";

export default function ClientComponent({ accessToken }: { accessToken: string }) {
  const [started, setStarted] = useState(false);
  const [currentConfig, setCurrentConfig] = useState(CONFIG_ONE);
  const [voiceProviderKey, setVoiceProviderKey] = useState(0);
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([{ sender: 'Alice', text: 'Hello, how are you?' }]);
  const [agents, setAgents] = useState([
    { active: true, text: 'Agent 1' },
    { active: false, text: 'Agent 2' }
  ]);

  const handleStart = () => {
    setStarted(true);
  };

  const handleNewMessageChange = (e: { target: { value: string; }; }) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { sender: 'You', text: newMessage }]);
      setNewMessage('');
    }
  };

  const switchToConfig1 = () => {
    setCurrentConfig(CONFIG_ONE);
    setVoiceProviderKey(prevKey => prevKey + 1);
    setAgents([
      { active: true, text: 'Agent 1 Config 1' },
      { active: false, text: 'Agent 2 Config 1' }
    ]);
    console.log("1");
  };

  const switchToConfig2 = () => {
    setCurrentConfig(CONFIG_TWO);
    setVoiceProviderKey(prevKey => prevKey + 1);
    setAgents([
      { active: true, text: 'Agent 1 Config 2' },
      { active: false, text: 'Agent 2 Config 2' }
    ]);
    console.log("2");

  };

  return (
    <div className="relative grow flex flex-col mx-auto w-full h-screen overflow-hidden dark:bg-gray-900 bg-[#F4EDD8]">
      {!started && (
      <div className="flex flex-col items-center justify-center h-full mt-[-5%]">
        <div className="text-center">
          {/* Logo */}
          <img src={logo.src} alt="Logo" className="mx-auto mb-4" style={{ width: '125px', height: '125px' }} />

          <h1 className="text-4xl font-semibold mb-4 leading-relaxed text-black">Consider This</h1>
          <CustomTypingEffect
            lines={[
              "Facilitate open discussions and gain diverse viewpoints with our AI Socratic Seminar platform."
            ]}
            speed={100}
            eraseDelay={2000}
            typingDelay={200}
            pauseDelay={4000}
          />

        </div>

        <div className="mt-8">
          <button
            onClick={handleStart}
            className="bg-[#ee8822] text-black py-2 px-4 rounded-sm border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1),8px_8px_0px_rgba(0,0,0,0.25)] hover:bg-[#b3c8e3] hover:shadow-[2px_2px_0px_rgba(0,0,0,1),4px_4px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 dark:bg-[#a2b8d4] dark:hover:bg-[#90a7c5] font-bold transition-transform duration-150"
          >
            Start
          </button>
        </div>
      </div>
      )}



      {started && (
        <>

          {/* Agents */}
          <div className="flex flex-row space-x-4">
            <div className="w-full md:w-1/2 p-2 pixelate bg-[#E6D7A5] border-4 border-[#915018] rounded-lg">
              {agentOneData.map((agent, index) => (
                <Agent
                  key={index}
                  initialActive={agent.initialActive}
                  initialReveal={agent.initialReveal}
                  initialIdea={agent.initialIdea}
                  text={agent.text}
                  agentOneReveal={handleAgentReveal}
                />
              ))}
            </div>
            <div className="w-full md:w-1/2 p-2 pixelate bg-[#E6D7A5] border-4 border-[#915018] rounded-lg">
              {agentTwoData.map((agent, index) => (
                <Agent
                  key={index}
                  initialActive={agent.initialActive}
                  initialReveal={agent.initialReveal}
                  initialIdea={agent.initialIdea}
                  text={agent.text}
                  agentOneReveal={handleAgentReveal}
                />
              ))}
            </div>
          </div>

          {/* ChatBox */}
          <div className="bg-[#E7D7A5] text-[#6C3F18] border-4 border-[#915018] p-4 m-4 rounded-md pixelate">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 bg-[#F4EDD8] p-2 rounded-md border-2 border-[#915018] ${
                  message.sender === 'You' ? 'text-right' : 'text-left'
                }`}
              >
                <span className="font-bold">{message.sender}:</span> {message.text}
              </div>
            ))}
            <div className="flex mt-2">
              <input
                className="flex-grow p-2 border-2 border-[#915018] rounded-md pixelate bg-[#FFF] text-[#6C3F18]"
                type="text"
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Type your message..."
              />
              <button
                className="bg-[#F1602C] text-white py-2 px-4 rounded-sm border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1),8px_8px_0px_rgba(0,0,0,0.25)] hover:bg-[#D52429] hover:shadow-[2px_2px_0px_rgba(0,0,0,1),4px_4px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 dark:bg-[#915018] dark:hover:bg-[#6C3F18] font-bold transition-transform duration-150 pixelate"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
