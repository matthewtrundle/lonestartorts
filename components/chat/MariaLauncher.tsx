'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MariaChatPanel } from './MariaChatPanel';
import { MariaVoiceCall } from './MariaVoiceCall';

/**
 * Floating bottom-right launcher for Maria — composes the in-house chat and
 * voice panels (no external Retell widget script, which previously caused the
 * uncontrolled mobile overlap). Tapping the FAB reveals three actions:
 *   • Chat with Maria   → text panel (MariaChatPanel)
 *   • Talk to Maria     → in-browser voice (MariaVoiceCall, Retell)
 *   • Call us           → tel: click-to-call
 *
 * Mobile-first: a 56px touch target, safe-area aware, hidden on checkout/admin
 * so it never covers the pay button, and it yields while a panel is open.
 */
const PHONE_DISPLAY = '(512) 894-6823';
const PHONE_TEL = '+15128946823';

// Routes where a floating button would get in the way of a primary action.
const HIDDEN_PREFIXES = ['/checkout', '/admin', '/account/login'];

type Action = 'chat' | 'voice' | 'call';

export function MariaLauncher() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [voiceOpen, setVoiceOpen] = useState(false);

  const hasVoice = Boolean(process.env.NEXT_PUBLIC_RETELL_AGENT_ID);
  const panelOpen = chatOpen || voiceOpen;
  const hidden = HIDDEN_PREFIXES.some((p) => pathname?.startsWith(p));

  // Close the action menu on Escape (panels handle their own Escape).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  if (hidden) return null;

  const pick = (action: Action) => {
    setMenuOpen(false);
    if (action === 'chat') setChatOpen(true);
    if (action === 'voice') setVoiceOpen(true);
    // 'call' is an anchor; navigation handled by the browser.
  };

  const actions: { key: Action; label: string; sub: string; icon: JSX.Element; href?: string }[] = [
    {
      key: 'chat',
      label: 'Chat with Maria',
      sub: 'Quick questions, instant answers',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    ...(hasVoice
      ? [{
          key: 'voice' as Action,
          label: 'Talk to Maria',
          sub: 'Live voice — right in your browser',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
              <path d="M12 1.5a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0v-7a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 10.5v1a7 7 0 0 0 14 0v-1M12 18.5V22M8.5 22h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
        }]
      : []),
    {
      key: 'call',
      label: `Call ${PHONE_DISPLAY}`,
      sub: 'Talk to a real Texan',
      href: `tel:${PHONE_TEL}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <MariaChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} onUnavailable={() => {}} />
      {hasVoice && <MariaVoiceCall isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />}

      {/* Launcher hides while a panel is open so it never doubles up. */}
      {!panelOpen && (
        <div
          className="fixed right-4 z-40 flex flex-col items-end gap-3"
          style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        >
          <AnimatePresence>
            {menuOpen && (
              <>
                {/* Mobile-only scrim — dismiss by tapping outside, no layout shift. */}
                <motion.button
                  type="button"
                  aria-label="Close menu"
                  className="fixed inset-0 -z-10 cursor-default sm:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMenuOpen(false)}
                  style={{ background: 'rgba(40,28,18,0.18)' }}
                />
                <motion.ul
                  role="menu"
                  className="flex w-[min(86vw,320px)] flex-col gap-2"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{ show: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
                >
                  {actions.map((a) => {
                    const inner = (
                      <span className="flex items-center gap-3">
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                          style={{ background: 'rgba(194,65,12,0.10)', color: '#9A3412' }}
                        >
                          {a.icon}
                        </span>
                        <span className="flex flex-col text-left">
                          <span className="text-[15px] font-semibold leading-tight" style={{ color: '#3D2B1A' }}>
                            {a.label}
                          </span>
                          <span className="text-[12px] leading-tight" style={{ color: '#8A7355' }}>
                            {a.sub}
                          </span>
                        </span>
                      </span>
                    );
                    const className =
                      'group block w-full rounded-2xl border px-4 py-3 text-left shadow-[0_10px_30px_-12px_rgba(181,134,80,0.5)] transition-transform active:scale-[0.98]';
                    const style = { background: '#FBF7EF', borderColor: 'rgba(181,134,80,0.25)' };
                    return (
                      <motion.li
                        key={a.key}
                        role="none"
                        variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                      >
                        {a.href ? (
                          <a role="menuitem" href={a.href} className={className} style={style} onClick={() => setMenuOpen(false)}>
                            {inner}
                          </a>
                        ) : (
                          <button role="menuitem" type="button" className={className} style={style} onClick={() => pick(a.key)}>
                            {inner}
                          </button>
                        )}
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </>
            )}
          </AnimatePresence>

          {/* FAB */}
          <motion.button
            type="button"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close Maria menu' : 'Chat or call Maria'}
            onClick={() => setMenuOpen((o) => !o)}
            whileTap={{ scale: 0.94 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-full text-cream-100"
            style={{
              background: 'linear-gradient(135deg,#C2410C 0%,#9A3412 100%)',
              boxShadow: '0 14px 34px -10px rgba(154,52,18,0.6)',
              color: '#FFF7EC',
            }}
          >
            {/* Live dot */}
            <span
              className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full border-2"
              style={{ background: '#34D399', borderColor: '#9A3412' }}
            />
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.svg key="x" viewBox="0 0 24 24" width="24" height="24" fill="none"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
              ) : (
                <motion.svg key="m" viewBox="0 0 24 24" width="26" height="26" fill="none"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z"
                    stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      )}
    </>
  );
}
