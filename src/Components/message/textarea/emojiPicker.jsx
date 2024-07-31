import React from "react";
import EmojiPicker from "emoji-picker-react";
import "../../../assets/styles/emoji.scss"
const EmojiPickerComponent = ({ clickEmoji, showEmoji }) => {
  if (!showEmoji) return null;

  return (
    <div className="emoji-style">
      <EmojiPicker onEmojiClick={clickEmoji} />
    </div>
  );
};

export default EmojiPickerComponent;
