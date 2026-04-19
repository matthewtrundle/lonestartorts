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

  // Hide the Retell widget + popup when the cart drawer is open.
  // Uses a MutationObserver to detect the cart backdrop appearing in the DOM
  // since this component renders outside the CartProvider.
  useEffect(() => {
    function setWidgetVisibility(hidden: boolean) {
      const widget = document.querySelector('retell-widget') as HTMLElement | null;
      if (widget) widget.style.display = hidden ? 'none' : '';
      // The popup bubble is a sibling element injected by the Retell script
      document.querySelectorAll<HTMLElement>('[class*="retell"]').forEach(el => {
        if (el.tagName !== 'SCRIPT') el.style.display = hidden ? 'none' : '';
      });
    }

    const observer = new MutationObserver(() => {
      // Cart sidebar renders a backdrop with data-cart-backdrop or a fixed overlay
      const cartOpen = !!document.querySelector('[data-cart-overlay]');
      setWidgetVisibility(cartOpen);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
