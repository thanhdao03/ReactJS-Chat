import React, { useEffect, useState, useRef } from "react";
import MessageItem from "./messageItem";
import ScrollButton from "../../../common/components/button/buttonScroll";

const MsgChat = ({ messages, selectedFriend }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleScroll = () => {
    if (
      messagesContainerRef.current.scrollTop <
      messagesContainerRef.current.scrollHeight -
        messagesContainerRef.current.clientHeight -
        100
    ) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setIsScrolled(false);
  };

  return (
    <>
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        style={{ maxHeight: "88vh", overflow: "auto" }}
      >
        <div>
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} selectedFriend={selectedFriend} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {isScrolled && <ScrollButton scrollToBottom={scrollToBottom} />}
    </>
  );
};

export default MsgChat;
