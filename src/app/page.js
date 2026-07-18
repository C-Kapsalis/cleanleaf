'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { DateChip, EncryptionChip, BotBubble, UserBubble, TypingIndicator } from '@/components/ChatBubbles';
import ScoreCard from '@/components/ScoreCard';
import LeaderboardCard from '@/components/LeaderboardCard';
import CameraOverlay from '@/components/CameraOverlay';
import { getPointsEarned } from '@/lib/scoring';
import { CHALLENGE, CHAT_GROUPS } from '@/lib/demo-data';

const SCORE_REVEAL_DELAY_MS = 2000; // lets the typing indicator breathe before the score lands
const NOT_FOOD_DELAY_MS = 1500;
const INITIAL_STREAK = 7; // the demo user is mid-challenge, not starting cold

function formatTime(date = new Date()) {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function buildOpeningMessages() {
  const [first, second, third] = CHAT_GROUPS;
  return [
    { type: 'date', text: 'Today' },
    { type: 'encryption' },
    { type: 'bot', content: (
      <>
        <span className="font-semibold">{CHALLENGE.emoji} {CHALLENGE.name} Challenge</span> — {CHALLENGE.durationDays} days · Started {CHALLENGE.startedLabel}{'\n\n'}
        Welcome to Week 2! You&apos;re part of {CHALLENGE.participants} participants across Syracuse. Every meal you log earns points for your group.
      </>
    ), time: '9:02 AM' },
    { type: 'bot', content: (
      <>
        <span className="font-semibold">📊 Week 1 Recap</span>{'\n\n'}
        🥇 {first.name} — {first.pts.toLocaleString()} pts ({first.streak}-day streak!){'\n'}
        🥈 {second.name} — {second.pts.toLocaleString()} pts{'\n'}
        🥉 {third.name} — {third.pts.toLocaleString()} pts{'\n\n'}
        Your group needs {(second.pts - third.pts + 1).toLocaleString()} more points to hit #2.
      </>
    ), time: '9:02 AM' },
    { type: 'bot', content: (
      <>
        <span className="font-semibold">🍽️ Day {CHALLENGE.day} Check-in</span> — Time to log your lunch! Snap a photo and our AI will score it instantly.
      </>
    ), time: '9:03 AM' },
    { type: 'link', time: '9:03 AM' },
  ];
}

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [userPts, setUserPts] = useState(0);
  const [userStreak, setUserStreak] = useState(INITIAL_STREAK);

  const chatEndRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, []);

  useEffect(() => {
    setMessages(buildOpeningMessages());
  }, []);

  useEffect(scrollToBottom, [messages, showTyping, scrollToBottom]);

  const classifyFood = async (base64Data) => {
    try {
      const raw = base64Data.replace(/^data:image\/\w+;base64,/, '');
      const resp = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64: raw }),
      });
      const data = await resp.json();
      if (data.result) return data.result;
    } catch (err) {
      console.warn('Classify error:', err);
    }
    return null;
  };

  // Explains a failed camera start in the chat: what happened, why, and what
  // to do next — instead of a blocking alert().
  const cameraFailureMessage = (err) => {
    if (err && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
      return "The camera didn't start because the browser blocked camera access for this site. Allow camera access in your browser's site settings, then tap the scan link to try again.";
    }
    if (err && (err.name === 'NotFoundError' || err.name === 'OverconstrainedError')) {
      return 'The camera didn\'t start because no usable camera was found on this device. Open the demo on a device with a camera, then tap the scan link to try again.';
    }
    return "The camera didn't start — it may be in use by another app. Close other apps that use the camera, then tap the scan link to try again.";
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setShowCamera(false);
      setMessages(prev => [
        ...prev,
        { type: 'bot', content: cameraFailureMessage(err), time: formatTime() },
        { type: 'link', time: formatTime() },
      ]);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 640;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL('image/jpeg', 0.85);

    stopCamera();

    const time = formatTime();
    setMessages(prev => [...prev, { type: 'user-photo', imageUrl, time }]);
    setShowTyping(true);

    const food = await classifyFood(imageUrl);

    if (food && food.food !== false) {
      const pts = getPointsEarned(food.score);
      const newPts = userPts + pts;
      const newStreak = userStreak + 1;
      setTimeout(() => {
        setShowTyping(false);
        setUserPts(newPts);
        setUserStreak(newStreak);
        setMessages(prev => [
          ...prev,
          { type: 'score-card', food, points: pts, time },
          { type: 'leaderboard', userPts: newPts, userStreak: newStreak, time },
          { type: 'bot', content: `Nice! Your streak is now ${newStreak} days 🔥 Tap the link again to log your next meal.`, time },
          { type: 'link', time },
        ]);
      }, SCORE_REVEAL_DELAY_MS);
    } else {
      // Not food, or the scorer failed: no points, no leaderboard change.
      // Each cause gets its own message: what happened, why, what to do next.
      const content = food === null
        ? "That photo couldn't be scored because the scoring service didn't respond. Check your connection, then tap the scan link to try again."
        : "I couldn't find any food in that photo, so it wasn't scored. Make sure the meal is clearly visible and well lit, then tap the scan link to try again.";
      setTimeout(() => {
        setShowTyping(false);
        setMessages(prev => [
          ...prev,
          { type: 'bot', content, time },
          { type: 'link', time },
        ]);
      }, NOT_FOOD_DELAY_MS);
    }
  };

  const renderMessage = (msg, i) => {
    switch (msg.type) {
      case 'date':
        return <DateChip key={i} text={msg.text} />;
      case 'encryption':
        return <EncryptionChip key={i} />;
      case 'bot':
        return (
          <BotBubble key={i} time={msg.time}>
            <div className="whitespace-pre-line">{msg.content}</div>
          </BotBubble>
        );
      case 'link':
        return (
          <BotBubble key={i} time={msg.time} noTail>
            <button onClick={startCamera} className="text-left" aria-label="Scan your meal — opens the camera">
              <span className="text-[#53bdeb] underline text-[14.5px]">cleanleaf.app/scan/{CHALLENGE.slug}</span>
              <div className="mt-1 bg-white/5 rounded-lg p-2 flex items-center gap-2">
                <span className="text-2xl" aria-hidden="true">📸</span>
                <div>
                  <p className="text-white/80 text-[13px] font-medium">Scan Your Meal</p>
                  <p className="text-white/60 text-[11px]">AI-powered food scoring</p>
                </div>
              </div>
            </button>
          </BotBubble>
        );
      case 'user-photo':
        return <UserBubble key={i} imageUrl={msg.imageUrl} time={msg.time} />;
      case 'score-card':
        return (
          <BotBubble key={i} time={msg.time}>
            <div className="msg-animate">
              <ScoreCard food={msg.food} points={msg.points} />
            </div>
          </BotBubble>
        );
      case 'leaderboard':
        return (
          <BotBubble key={i} time={msg.time} noTail>
            <div className="msg-animate">
              <LeaderboardCard groups={CHAT_GROUPS} userPts={msg.userPts} userStreak={msg.userStreak} />
            </div>
          </BotBubble>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col" style={{ height: '100dvh', background: '#0b141a' }}>
      {/* Chat header. The back arrow and call icons are WhatsApp chrome with
          no behavior in the demo, so they are decorative, not controls. */}
      <header className="flex items-center gap-3 px-2 py-2 flex-shrink-0" style={{ background: '#1f2c34' }}>
        <span className="text-white/60 text-lg px-1" aria-hidden="true">←</span>
        <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0" aria-hidden="true">
          <span className="text-white text-[13px] font-bold">CL</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-[15px] font-medium truncate">CleanLeaf · Whitman SU</p>
          <p className="text-white/60 text-[12px] truncate">Clarissa, Ecem, Tanvi, Chris, you</p>
        </div>
        <div className="flex items-center gap-4 text-white/50 flex-shrink-0" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15.6 11.6L22 7v10l-6.4-4.6M2 6h12a2 2 0 012 2v8a2 2 0 01-2 2H2V6z"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.9v3a2 2 0 01-2.2 2A19.8 19.8 0 013.1 5.2 2 2 0 015.1 3h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.6a2 2 0 01-.4 2.1L9 10.8a16 16 0 006.2 6.2l1.4-1.4a2 2 0 012.1-.4c.8.3 1.7.5 2.6.7a2 2 0 011.7 2z"/>
          </svg>
        </div>
      </header>

      {/* Conversation. role="log" announces new bot messages (score, errors)
          to screen readers as they arrive. */}
      <main aria-label="Group chat" className="flex-1 overflow-y-auto chat-scroll wa-bg py-2">
        <div role="log" aria-live="polite">
          {messages.map(renderMessage)}
          {showTyping && <TypingIndicator />}
        </div>
        <div ref={chatEndRef} className="h-2" />
      </main>

      {/* Decorative input bar — the demo only accepts photos via the scan link */}
      <div className="flex items-center gap-2 px-2 py-2 flex-shrink-0" style={{ background: '#1f2c34' }} aria-hidden="true">
        <div className="flex-1 flex items-center gap-2 bg-[#2a3942] rounded-full px-4 py-2">
          <span className="text-white/30 text-xl">😊</span>
          <span className="text-white/30 text-[15px] flex-1">Type a message</span>
          <span className="text-white/30 text-xl">📎</span>
          <span className="text-white/30 text-xl">📷</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 15a3 3 0 003-3V6a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0014 0h-2zm-4 7.93A7.001 7.001 0 0019 13h-2a5 5 0 01-10 0H5a7.001 7.001 0 006 6.93V22h2v-2.07z"/>
          </svg>
        </div>
      </div>

      {showCamera && (
        <CameraOverlay onCapture={capturePhoto} onCancel={stopCamera} videoRef={videoRef} />
      )}
    </div>
  );
}
