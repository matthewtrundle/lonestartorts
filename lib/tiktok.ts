// TikTok Events API - Server-side event tracking
// Docs: https://business-api.tiktok.com/portal/docs?id=1741601162187777

const TIKTOK_PIXEL_ID = 'D5AHHTRC77U7I26540JG';
const TIKTOK_API_URL = 'https://business-api.tiktok.com/open_api/v1.3/event/track/';

interface TikTokEventContent {
  content_id: string;
  content_type: string;
  content_name: string;
  quantity: number;
  price: number;
}

interface TikTokPurchaseEvent {
  orderNumber: string;
  email: string;
  phone?: string;
  value: number; // Total in dollars
  currency: string;
  contents: TikTokEventContent[];
  userAgent?: string;
  ip?: string;
}

/**
 * Send a Purchase event to TikTok Events API (server-side)
 * This provides more reliable conversion tracking than browser-only pixel
 */
export async function trackTikTokPurchase(event: TikTokPurchaseEvent): Promise<boolean> {
  const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

  if (!accessToken) {
    console.warn('TikTok Events API: TIKTOK_ACCESS_TOKEN not configured');
    return false;
  }

  try {
    // Build the event payload following TikTok's Events API v1.3 format
    const eventId = `purchase_${event.orderNumber}_${Date.now()}`;

    const payload = {
      pixel_code: TIKTOK_PIXEL_ID,
      event: 'Purchase', // Use 'Purchase' for server-side (CompletePayment for browser)
      event_id: eventId,
      timestamp: new Date().toISOString(),
      context: {
        user_agent: event.userAgent || 'Mozilla/5.0 (Server)',
        ip: event.ip || '127.0.0.1',
      },
      properties: {
        contents: event.contents,
        content_type: 'product',
        currency: event.currency,
        value: event.value,
      },
      user: {
        email: event.email,
        ...(event.phone && { phone: event.phone }),
        external_id: event.orderNumber,
      },
    };

    console.log('TikTok Events API: Sending event', {
      event: 'Purchase',
      orderNumber: event.orderNumber,
      value: event.value,
      pixelId: TIKTOK_PIXEL_ID,
    });

    const response = await fetch(TIKTOK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify({
        data: [payload],
      }),
    });

    const result = await response.json();

    console.log('TikTok Events API response:', {
      status: response.status,
      code: result.code,
      message: result.message,
    });

    if (response.ok && result.code === 0) {
      console.log('TikTok Events API: Purchase event sent successfully', {
        orderNumber: event.orderNumber,
        value: event.value,
        eventId,
      });
      return true;
    } else {
      console.error('TikTok Events API error:', result);
      return false;
    }
  } catch (error) {
    console.error('TikTok Events API: Failed to send event', error);
    return false;
  }
}
