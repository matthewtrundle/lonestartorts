'use client';

import { useState, useCallback, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

type CallStatus = 'idle' | 'connecting' | 'active' | 'ended';

const retellClient = new RetellWebClient();

export function MariaVoiceCall() {
  const [status, setStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [agentTalking, setAgentTalking] = useState(false);

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

  // Floating call button (idle state)
  if (status === 'idle') {
    return (
      <button
        onClick={startCall}
        className="fixed bottom-24 right-6 z-[999] flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white pl-4 pr-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 group"
        aria-label="Call Maria"
      >
        <Phone className="w-5 h-5" />
        <span className="text-sm font-semibold">Talk to Maria</span>
      </button>
    );
  }

  // Connecting state
  if (status === 'connecting') {
    return (
      <div className="fixed bottom-24 right-6 z-[999] flex items-center gap-3 bg-charcoal-900 text-white px-5 py-3 rounded-full shadow-lg">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold">Connecting to Maria...</span>
      </div>
    );
  }

  // Active call UI
  return (
    <div className="fixed bottom-24 right-6 z-[999] bg-charcoal-900 text-white rounded-2xl shadow-2xl p-4 min-w-[240px]">
      {/* Voice indicator */}
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${agentTalking ? 'bg-green-500 animate-pulse' : 'bg-charcoal-700'}`}>
          <Phone className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm font-semibold">Maria</p>
          <p className="text-xs text-charcoal-400">
            {agentTalking ? 'Speaking...' : 'Listening...'}
          </p>
        </div>
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
    </div>
  );
}
