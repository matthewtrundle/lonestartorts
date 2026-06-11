'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { ComalIcon } from '@/components/ui/Icons';

interface DisplayMessage {
  role: 'user' | 'assistant';
  content: string;
  /** Local-only messages (greeting, error notices) are never sent to the API */
  localOnly?: boolean;
}

interface MariaChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  /** Called when the API reports chat is not configured (503) so the launcher can hide the option */
  onUnavailable?: () => void;
}

const GREETING: DisplayMessage = {
  role: 'assistant',
  content:
    "Howdy! I'm Maria. Ask me anything about our tortillas, shipping, or how to keep 'em fresh.",
  localOnly: true,
};

export function MariaChatPanel({ isOpen, onClose, onUnavailable }: MariaChatPanelProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  // Focus management for the dialog — same pattern as CartSidebar
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  // Move focus into the panel on open; return focus to the trigger on close
  useEffect(() => {
    if (isOpen) {
      triggerRef.current =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      inputRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
      triggerRef.current = null;
    }
  }, [isOpen]);

  // Keep the newest message in view
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages, isSending]);

  // Escape closes the dialog; Tab is trapped within the panel (CartSidebar pattern)
  const handlePanelKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending || isUnavailable) return;

    const userMessage: DisplayMessage = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/maria-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => !m.localOnly)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (response.status === 503) {
        setIsUnavailable(true);
        onUnavailable?.();
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "Chat isn't available right now. Give Maria a voice call instead, or reach us through the contact page.",
            localOnly: true,
          },
        ]);
        return;
      }

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: data.error || 'Something went sideways. Try that one more time.',
            localOnly: true,
          },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply! }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Lost the connection there. Check your internet and try again.',
          localOnly: true,
        },
      ]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-[9999] inset-x-0 bottom-0 h-[70vh] max-h-[34rem] rounded-t-2xl md:inset-x-auto md:right-6 md:bottom-6 md:w-[24.5rem] md:h-[32rem] md:rounded-2xl bg-cream-50 border border-cream-300 shadow-large flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Maria"
          ref={panelRef}
          onKeyDown={handlePanelKeyDown}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cream-300 bg-cream-100">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sunset-100">
                <ComalIcon className="w-5 h-5 text-sunset-700" />
              </span>
              <div>
                <p className="text-sm font-semibold text-charcoal-950 leading-tight">Maria</p>
                <p className="text-xs text-charcoal-500 leading-tight">Tortilla questions, answered</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-cream-200/70 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-charcoal-700" />
            </button>
          </div>

          {/* Message log */}
          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation with Maria"
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-sunset-600 text-white rounded-br-md'
                      : 'bg-cream-200 text-charcoal-800 rounded-bl-md'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isSending && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 bg-cream-200 rounded-2xl rounded-bl-md">
                  <span className="text-sm text-charcoal-500">Maria is typing&hellip;</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t border-cream-300 bg-cream-100 px-4 pt-2.5 pb-3">
            <label htmlFor="maria-chat-input" className="block text-xs font-medium text-charcoal-600 mb-1.5">
              Ask about products, shipping, or storage
            </label>
            <div className="flex gap-2">
              <input
                id="maria-chat-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isUnavailable ? 'Chat unavailable' : 'Type your question…'}
                disabled={isUnavailable}
                maxLength={2000}
                autoComplete="off"
                className="flex-1 px-3 py-2 bg-white border border-cream-400 rounded-lg text-sm text-charcoal-950 placeholder:text-charcoal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 disabled:bg-cream-200 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSending || isUnavailable || input.trim().length === 0}
                className="flex items-center justify-center w-10 h-10 shrink-0 bg-sunset-600 text-white rounded-lg hover:bg-sunset-700 transition-colors disabled:bg-charcoal-300 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-[10px] leading-snug text-charcoal-500">
              Independent reseller. Not affiliated with or endorsed by H-E-B&reg;.
            </p>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
