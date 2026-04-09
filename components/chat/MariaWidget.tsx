'use client';

import { useEffect } from 'react';

export function MariaWidget() {
  const publicKey = process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY;
  const agentId = process.env.NEXT_PUBLIC_RETELL_AGENT_ID;

  useEffect(() => {
    if (!publicKey || !agentId) return;
    if (document.getElementById('retell-widget')) return;

    const script = document.createElement('script');
    script.id = 'retell-widget';
    script.src = 'https://dashboard.retellai.com/retell-widget.js';
    script.type = 'module';
    script.dataset.publicKey = publicKey;
    script.dataset.agentId = agentId;
    script.dataset.title = 'Chat with Maria';
    script.dataset.botName = 'Maria';
    script.dataset.color = '#ea580c';
    script.dataset.popupMessage = 'Howdy! Need help with tortillas?';
    script.dataset.showAiPopup = 'true';
    script.dataset.showAiPopupTime = '5';
    script.dataset.autoOpen = 'false';
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('retell-widget');
      el?.remove();
    };
  }, [publicKey, agentId]);

  return null;
}
