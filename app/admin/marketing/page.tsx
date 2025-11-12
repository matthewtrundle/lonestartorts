'use client';

import { useState } from 'react';
import { MARKETING_TEMPLATES, type EmailTemplate } from '@/lib/marketing-templates';
import { Copy, Eye, Mail, Check } from 'lucide-react';

export default function MarketingTemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (html: string, id: string) => {
    try {
      await navigator.clipboard.writeText(html);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  const categories = [
    { id: 'bbq', name: 'BBQ Restaurants', color: 'bg-amber-100 text-amber-800' },
    { id: 'mexican', name: 'Mexican Restaurants', color: 'bg-green-100 text-green-800' },
    { id: 'restaurant', name: 'Generic Restaurant', color: 'bg-blue-100 text-blue-800' },
    { id: 'foodtruck', name: 'Food Trucks', color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-charcoal-950 mb-2">Marketing Email Templates</h1>
        <p className="text-charcoal-600">Professional B2B outreach templates for wholesale partnerships</p>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {MARKETING_TEMPLATES.map((template) => {
          const category = categories.find(c => c.id === template.category);

          return (
            <div key={template.id} className="bg-white rounded-lg shadow-sm border border-stone-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Template Header */}
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

              {/* Template Actions */}
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

      {/* Modal Preview */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTemplate(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
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

            {/* Modal Content */}
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

            {/* Modal Footer */}
            <div className="p-6 border-t border-stone-200 flex items-center justify-between bg-stone-50">
              <p className="text-sm text-charcoal-600">
                Copy the HTML code and paste it into your email service provider
              </p>
              <button
                onClick={() => copyToClipboard(selectedTemplate.html, selectedTemplate.id)}
                className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors font-medium"
              >
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy HTML Code
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Usage Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use These Templates</h3>
        <ol className="space-y-2 text-sm text-blue-900">
          <li className="flex gap-3">
            <span className="font-bold">1.</span>
            <span>Click "Preview" to see how the email will look to recipients</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">2.</span>
            <span>Click "Copy HTML" to copy the email code to your clipboard</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">3.</span>
            <span>Paste the HTML into your email service provider (Mailchimp, SendGrid, etc.)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold">4.</span>
            <span>Customize recipient details and send to your B2B prospects</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
