import { NextRequest, NextResponse } from 'next/server';
import { generateSEOReport, formatReportAsHTML } from '@/lib/seo-reporting';
import type { ReportConfig } from '@/lib/seo-reporting';

/**
 * API endpoint for SEO reports
 * Generates comprehensive SEO performance reports
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') as 'daily' | 'weekly' | 'monthly') || 'weekly';
    const format = searchParams.get('format') || 'json';

    // Calculate date range based on period
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case 'daily':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }

    // Generate report
    const config: ReportConfig = {
      period,
      startDate,
      endDate,
      includeKeywords: true,
      includeWebVitals: true,
      includeTraffic: true,
    };

    const report = await generateSEOReport(config);

    // Return in requested format
    if (format === 'html') {
      const html = formatReportAsHTML(report);
      return new NextResponse(html, {
        headers: {
          'Content-Type': 'text/html',
        },
      });
    }

    return NextResponse.json(report);
  } catch (error) {
    console.error('Error generating SEO report:', error);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

/**
 * Send report via email
 */
export async function POST(request: NextRequest) {
  try {
    const { recipients, period = 'weekly' } = await request.json();

    if (!recipients || !Array.isArray(recipients)) {
      return NextResponse.json(
        { error: 'Recipients array required' },
        { status: 400 }
      );
    }

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case 'daily':
        startDate.setDate(startDate.getDate() - 1);
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
    }

    // Generate report
    const config: ReportConfig = {
      period,
      startDate,
      endDate,
      includeKeywords: true,
      includeWebVitals: true,
      includeTraffic: true,
    };

    const report = await generateSEOReport(config);
    const html = formatReportAsHTML(report);

    // TODO: Send email using Resend
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    //
    // await resend.emails.send({
    //   from: 'seo-reports@lonestartortillas.com',
    //   to: recipients,
    //   subject: `SEO Report: ${report.period}`,
    //   html,
    // });

    return NextResponse.json({
      success: true,
      message: `Report would be sent to ${recipients.length} recipients`,
      report,
    });
  } catch (error) {
    console.error('Error sending SEO report:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
}
