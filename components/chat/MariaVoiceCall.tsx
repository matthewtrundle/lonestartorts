'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, MessageCircle } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

type CallStatus = 'idle' | 'connecting' | 'active';

const retellClient = new RetellWebClient();

interface MariaVoiceCallProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MariaVoiceCall({ isOpen, onClose }: MariaVoiceCallProps) {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [agentTalking, setAgentTalking] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    retellClient.on('call_started', () => setStatus('active'));
    retellClient.on('call_ended', () => setStatus('idle'));
    retellClient.on('agent_start_talking', () => setAgentTalking(true));
    retellClient.on('agent_stop_talking', () => setAgentTalking(false));
    retellClient.on('error', (error) => {
      console.error('Retell call error:', error);
      setStatus('idle');
    });

    return () => {
      retellClient.stopCall();
    };
  }, []);

  // Close panel on outside click (but not during active call)
  useEffect(() => {
    if (!isOpen || status === 'active') return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, status, onClose]);

  const startCall = useCallback(async () => {
    setStatus('connecting');
    try {
      const res = await fetch('/api/retell/web-call', { method: 'POST' });
      if (!res.ok) throw new Error('Failed to create call');
      const { access_token } = await res.json();

      await retellClient.startCall({
        accessToken: access_token,
        sampleRate: 24000,
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      setStatus('idle');
    }
  }, []);

  const endCall = useCallback(() => {
    retellClient.stopCall();
    setStatus('idle');
    setAgentTalking(false);
  }, []);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      retellClient.unmute();
    } else {
      retellClient.mute();
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  const openChat = useCallback(() => {
    onClose();
    // Try to open the Retell chat widget
    const retellBtn = document.querySelector('[id^="retell-widget"] button, .retell-widget button')
      || document.querySelector('button[aria-label*="chat"], button[aria-label*="Chat"]');
    if (retellBtn instanceof HTMLElement) {
      retellBtn.click();
      return;
    }
    const floatingElements = document.querySelectorAll('div[style*="position: fixed"]');
    for (const el of floatingElements) {
      const btn = el.querySelector('button');
      if (btn) { btn.click(); return; }
    }
  }, [onClose]);

  if (!isOpen && status !== 'active') return null;

  // Active call - show fixed panel (stays visible even if dropdown closed)
  if (status === 'active' || status === 'connecting') {
    return (
      <div className="fixed top-16 right-4 z-[200] bg-charcoal-950 text-white rounded-xl shadow-2xl p-4 min-w-[260px] border border-charcoal-800">
        {status === 'connecting' ? (
          <div className="flex items-center gap-3 py-2">
            <div className="w-5 h-5 border-2 border-sunset-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Connecting to Maria...</span>
          </div>
        ) : (
          <>
            {/* Voice indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${agentTalking ? 'bg-green-500 shadow-[0_0_16px_rgba(34,197,94,0.4)]' : 'bg-charcoal-700'}`}>
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Maria</p>
                <p className="text-xs text-charcoal-400">
                  {agentTalking ? 'Speaking...' : 'Listening...'}
                </p>
              </div>
              {agentTalking && (
                <div className="flex gap-0.5 items-end h-4">
                  <div className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: '40%', animationDelay: '0ms' }} />
                  <div className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: '80%', animationDelay: '150ms' }} />
                  <div className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: '60%', animationDelay: '300ms' }} />
                  <div className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: '100%', animationDelay: '100ms' }} />
                  <div className="w-1 bg-green-400 rounded-full animate-pulse" style={{ height: '50%', animationDelay: '250ms' }} />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={toggleMute}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-charcoal-700 hover:bg-charcoal-600'}`}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                onClick={endCall}
                className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                aria-label="End call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // Dropdown menu (idle state)
  return (
    <div
      ref={panelRef}
      className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-charcoal-100 overflow-hidden min-w-[220px] z-[200]"
    >
      <div className="p-2">
        <button
          onClick={startCall}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-charcoal-900">Talk to Maria</p>
            <p className="text-xs text-charcoal-500">Voice conversation</p>
          </div>
        </button>
        <button
          onClick={openChat}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sunset-50 transition-colors group"
        >
          <div className="w-8 h-8 rounded-full bg-sunset-100 group-hover:bg-sunset-200 flex items-center justify-center transition-colors">
            <MessageCircle className="w-4 h-4 text-sunset-600" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-charcoal-900">Chat with Maria</p>
            <p className="text-xs text-charcoal-500">Text conversation</p>
          </div>
        </button>
      </div>
    </div>
  );
}
