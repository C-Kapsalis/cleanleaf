// Building blocks of the simulated WhatsApp conversation.

export function DateChip({ text }) {
  return (
    <div className="flex justify-center my-2">
      <span className="wa-chip">{text}</span>
    </div>
  );
}

export function EncryptionChip() {
  return (
    <div className="flex justify-center my-1">
      <span className="wa-chip text-center" style={{ fontSize: 11, maxWidth: 280 }}>
        <span aria-hidden="true">🔒 </span>Messages and photos are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
      </span>
    </div>
  );
}

export function BotBubble({ children, time, noTail }) {
  return (
    <div className="flex justify-start px-3 mb-1">
      <div className={noTail ? 'bg-[#1f2c34] rounded-lg max-w-[88%] px-2.5 pt-1.5 pb-1' : 'wa-bubble-in max-w-[88%] px-2.5 pt-1.5 pb-1'}>
        {!noTail && <p className="text-[#53bdeb] text-[12.5px] font-medium mb-0.5">CleanLeaf Bot</p>}
        <div className="text-[#e9edef] text-[14.5px] leading-[20px]">{children}</div>
        {time && <p className="text-[11px] text-white/50 text-right mt-0.5 -mb-0.5">{time}</p>}
      </div>
    </div>
  );
}

export function UserBubble({ children, time, imageUrl }) {
  return (
    <div className="flex justify-end px-3 mb-1">
      <div className="wa-bubble-out max-w-[88%] px-1 pt-1 pb-1 overflow-hidden">
        {imageUrl && (
          <img src={imageUrl} alt="Your meal" className="rounded-md w-full max-w-[260px] mb-1" />
        )}
        {children && <div className="text-[#e9edef] text-[14.5px] leading-[20px] px-1.5">{children}</div>}
        <div className="flex items-center justify-end gap-1 px-1.5 -mb-0.5">
          {time && <span className="text-[11px] text-white/50">{time}</span>}
          <span className="text-[#53bdeb] text-[14px] leading-none" aria-hidden="true">✓✓</span>
          <span className="sr-only">Delivered</span>
        </div>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start px-3 mb-1 msg-animate" role="status">
      <div className="wa-bubble-in px-3 py-2.5">
        <div className="flex gap-1" aria-hidden="true">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
        <span className="sr-only">CleanLeaf Bot is typing</span>
      </div>
    </div>
  );
}
