'use client';

import { useEffect, useState } from 'react';
import { MapPin, Pencil, Plus } from 'lucide-react';
import AddressForm from '@/components/account/AddressForm';
import { useToast } from '@/components/ui/Toast';
import type { AddressFields } from '@/lib/address-validation';

interface SavedAddress extends AddressFields {
  id: string;
}

function normalizeAddress(raw: SavedAddress & { street2: string | null; phone: string | null }): SavedAddress {
  return { ...raw, street2: raw.street2 ?? '', phone: raw.phone ?? '' };
}

export default function AddressCard() {
  const { showToast } = useToast();
  const [address, setAddress] = useState<SavedAddress | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/customer/address')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.address) setAddress(normalizeAddress(data.address));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (fields: AddressFields) => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/customer/address', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to save address. Please try again.');
        return;
      }
      setAddress(normalizeAddress(data.address));
      setEditing(false);
      showToast('Shipping address updated', 'success');
    } catch {
      setError('Failed to save address. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-charcoal-950 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-sunset-600" />
          Shipping Address
        </h2>
        {!loading && address && (
          <button
            type="button"
            onClick={() => setEditing(!editing)}
            aria-expanded={editing}
            className="text-sm text-charcoal-500 hover:text-charcoal-700 font-medium flex items-center gap-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500"
          >
            <Pencil className="w-4 h-4" />
            {editing ? 'Close' : 'Edit'}
          </button>
        )}
      </div>

      {error && (
        <div role="alert" className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-2 animate-pulse" aria-hidden="true">
          <div className="h-4 bg-charcoal-100 rounded w-1/3" />
          <div className="h-4 bg-charcoal-100 rounded w-1/2" />
          <div className="h-4 bg-charcoal-100 rounded w-2/5" />
        </div>
      ) : editing ? (
        <AddressForm
          initial={address}
          submitLabel="Save Address"
          loading={saving}
          onSubmit={handleSave}
          onCancel={address ? () => { setEditing(false); setError(''); } : undefined}
        />
      ) : address ? (
        <address className="not-italic text-sm text-charcoal-600 leading-relaxed">
          <p className="font-medium text-charcoal-950">
            {address.firstName} {address.lastName}
          </p>
          <p>{address.street}</p>
          {address.street2 && <p>{address.street2}</p>}
          <p>
            {address.city}, {address.state} {address.zip}
          </p>
          {address.phone && <p className="mt-1 text-charcoal-500">{address.phone}</p>}
        </address>
      ) : (
        <div className="text-center py-4">
          <p className="text-charcoal-500 text-sm mb-3">
            No shipping address on file. Add one so we know where to send your tortillas.
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            aria-expanded={editing}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-sunset-600 text-white rounded-lg font-medium hover:bg-sunset-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunset-500 focus-visible:ring-offset-2"
          >
            <Plus className="w-4 h-4" />
            Add Address
          </button>
        </div>
      )}
    </div>
  );
}
