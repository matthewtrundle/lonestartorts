'use client';

import { useState } from 'react';
import { MARKETING_TEMPLATES, type EmailTemplate } from '@/lib/marketing-templates';
import { COLD_EMAIL_TEMPLATES, type ColdEmailTemplate } from '@/lib/cold-emails';
import { TEXAS_ORDER_CONFIRMATION, TEXAS_ORDER_SHIPPED } from '@/lib/transactional-emails-texas';
import { Copy, Eye, Mail, Check, FileText } from 'lucide-react';

const TEXAS_EMAILS = [
  { id: 'texas-confirmation', name: 'Order Confirmation (Texas Style)', subject: 'Yee-Haw! Order Confirmed', html: TEXAS_ORDER_CONFIRMATION },
  { id: 'texas-shipped', name: 'Order Shipped (Texas Style)', subject: 'Ride \'Em Cowboy! Order Shipped', html: TEXAS_ORDER_SHIPPED }
];

export default function MarketingTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [selectedColdEmail, setSelectedColdEmail] = useState<ColdEmailTemplate | null>(null);
  const [selectedTexasEmail, setSelectedTexasEmail] = useState<typeof TEXAS_EMAILS[0] | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'html' | 'cold' | 'texas'>('cold');

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const categories = [
    { id: 'bbq', name: 'BBQ', color: 'bg-amber-100 text-amber-800' },
    { id: 'mexican', name: 'Mexican', color: 'bg-green-100 text-green-800' },
    { id: 'restaurant', name: 'Restaurant', color: 'bg-blue-100 text-blue-800' },
    { id: 'foodtruck', name: 'Food Truck', color: 'bg-purple-100 text-purple-800' },
    { id: 'transactional', name: 'Transactional', color: 'bg-slate-100 text-slate-800' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Email Marketing System</h1>
        <p className="text-charcoal-600">HTML templates, plain-text cold emails, and Texas-style transactional emails</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-stone-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('cold')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'cold'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-charcoal-600 hover:text-charcoal-800 hover:border-charcoal-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Cold Emails (Plain Text)
              <span className="ml-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">4</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('texas')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'texas'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-charcoal-600 hover:text-charcoal-800 hover:border-charcoal-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Texas Transactional
              <span className="ml-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">2</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('html')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'html'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-charcoal-600 hover:text-charcoal-800 hover:border-charcoal-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              HTML Marketing
              <span className="ml-1 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">6</span>
            </div>
          </button>
        </nav>
      </div>

      {/* Cold Emails Tab */}
      {activeTab === 'cold' && (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">🎯 Ready to Use: Plain-Text Cold Emails</h3>
            <p className="text-sm text-amber-800">Direct, conversational outreach emails. Copy, personalize with recipient details, and send via your CRM or email tool.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {COLD_EMAIL_TEMPLATES.map((template) => {
              const category = categories.find(c => c.id === template.category);
              return (
                <div key={template.id} className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-stone-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal-950 mb-1">{template.name}</h3>
                        <p className="text-sm text-charcoal-600">{template.description}</p>
                      </div>
                      {category && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded ${category.color}`}>
                          {category.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal-600">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Subject:</span>
                      <span>{template.subject}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-stone-50 flex gap-3">
                    <button
                      onClick={() => setSelectedColdEmail(template)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => copyToClipboard(template.body, template.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-900 rounded-md hover:bg-stone-50 transition-colors font-medium text-sm"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy Text
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Texas Transactional Tab */}
      {activeTab === 'texas' && (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-amber-900 mb-2">🤠 Yee-Haw! Texas-Style Transactional Emails</h3>
            <p className="text-sm text-amber-800">Order confirmation and shipping notifications with Texas personality. Professional but fun!</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TEXAS_EMAILS.map((template) => (
              <div key={template.id} className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6 border-b border-stone-200">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-charcoal-950 mb-1">{template.name}</h3>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded bg-slate-100 text-slate-800">
                      Transactional
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal-600">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">Subject:</span>
                    <span>{template.subject}</span>
                  </div>
                </div>
                <div className="p-4 bg-stone-50 flex gap-3">
                  <button
                    onClick={() => setSelectedTexasEmail(template)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <button
                    onClick={() => copyToClipboard(template.html, template.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-900 rounded-md hover:bg-stone-50 transition-colors font-medium text-sm"
                  >
                    {copiedId === template.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy HTML
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* HTML Marketing Tab */}
      {activeTab === 'html' && (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">📧 HTML Marketing Templates</h3>
            <p className="text-sm text-blue-800">Rich HTML templates for B2B outreach and transactional emails</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {MARKETING_TEMPLATES.map((template) => {
              const category = categories.find(c => c.id === template.category);
              return (
                <div key={template.id} className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-stone-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-charcoal-950 mb-1">{template.name}</h3>
                        <p className="text-sm text-charcoal-600">{template.description}</p>
                      </div>
                      {category && (
                        <span className={`text-xs font-medium px-2.5 py-1 rounded ${category.color}`}>
                          {category.name}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-charcoal-600">
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">Subject:</span>
                      <span>{template.subject}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-stone-50 flex gap-3">
                    <button
                      onClick={() => setSelectedTemplate(template)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button
                      onClick={() => copyToClipboard(template.html, template.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white border border-stone-300 text-stone-900 rounded-md hover:bg-stone-50 transition-colors font-medium text-sm"
                    >
                      {copiedId === template.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy HTML
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Cold Email Modal */}
      {selectedColdEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedColdEmail(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-950">{selectedColdEmail.name}</h2>
                <p className="text-sm text-charcoal-600 mt-1">{selectedColdEmail.subject}</p>
              </div>
              <button
                onClick={() => setSelectedColdEmail(null)}
                className="text-charcoal-500 hover:text-charcoal-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              <pre className="bg-stone-50 p-6 rounded-lg text-sm font-mono leading-relaxed whitespace-pre-wrap text-charcoal-950">
                {selectedColdEmail.body}
              </pre>
            </div>
            <div className="p-6 border-t border-stone-200 flex items-center justify-between bg-stone-50">
              <p className="text-sm text-charcoal-600">
                Replace [PLACEHOLDERS] with recipient details before sending
              </p>
              <button
                onClick={() => copyToClipboard(selectedColdEmail.body, selectedColdEmail.id)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium"
              >
                {copiedId === selectedColdEmail.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy Text
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Texas Email Modal */}
      {selectedTexasEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTexasEmail(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-950">{selectedTexasEmail.name}</h2>
                <p className="text-sm text-charcoal-600 mt-1">{selectedTexasEmail.subject}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-stone-100 rounded-md p-1">
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      viewMode === 'preview'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode('code')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      viewMode === 'code'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    HTML Code
                  </button>
                </div>
                <button
                  onClick={() => setSelectedTexasEmail(null)}
                  className="text-charcoal-500 hover:text-charcoal-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {viewMode === 'preview' ? (
                <div className="p-6 bg-stone-50">
                  <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                    <iframe
                      srcDoc={selectedTexasEmail.html}
                      className="w-full"
                      style={{ height: '70vh', border: 'none' }}
                      title="Email Preview"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <pre className="bg-stone-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                    {selectedTexasEmail.html}
                  </pre>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-stone-200 flex items-center justify-between bg-stone-50">
              <p className="text-sm text-charcoal-600">
                Copy HTML and paste into your email service provider
              </p>
              <button
                onClick={() => copyToClipboard(selectedTexasEmail.html, selectedTexasEmail.id)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium"
              >
                {copiedId === selectedTexasEmail.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy HTML
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HTML Template Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTemplate(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b border-stone-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-charcoal-950">{selectedTemplate.name}</h2>
                <p className="text-sm text-charcoal-600 mt-1">{selectedTemplate.subject}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-stone-100 rounded-md p-1">
                  <button
                    onClick={() => setViewMode('preview')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      viewMode === 'preview'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setViewMode('code')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      viewMode === 'code'
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    HTML Code
                  </button>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-charcoal-500 hover:text-charcoal-700 text-2xl font-bold w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="overflow-auto" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {viewMode === 'preview' ? (
                <div className="p-6 bg-stone-50">
                  <div className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden">
                    <iframe
                      srcDoc={selectedTemplate.html}
                      className="w-full"
                      style={{ height: '70vh', border: 'none' }}
                      title="Email Preview"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <pre className="bg-stone-900 text-green-400 p-6 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                    {selectedTemplate.html}
                  </pre>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-stone-200 flex items-center justify-between bg-stone-50">
              <p className="text-sm text-charcoal-600">
                Copy HTML and paste into your email service provider
              </p>
              <button
                onClick={() => copyToClipboard(selectedTemplate.html, selectedTemplate.id)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium"
              >
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy HTML
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
