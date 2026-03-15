'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, Search } from 'lucide-react';

interface Asset {
  id: number;
  originalFilename: string;
  blobUrl: string;
  thumbnailUrl: string | null;
  sourceFormat: string;
  width: number | null;
  height: number | null;
}

interface AssetPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function AssetPickerModal({ open, onClose, onSelect }: AssetPickerModalProps) {
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAssets = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ limit: '50' });
    if (search) params.set('search', search);
    const res = await fetch(`/api/assets?${params}`);
    if (res.ok) {
      const data = await res.json();
      setAssetList(data.assets);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    if (open) fetchAssets();
  }, [open, fetchAssets]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-3xl max-h-[80vh] rounded-2xl border border-border bg-background shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">Select Asset</h2>
          <button onClick={onClose} className="rounded-lg p-1 text-muted hover:text-foreground hover:bg-border transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-border p-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search assets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-surface pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-ignite focus:outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-ignite border-t-transparent" />
            </div>
          ) : assetList.length === 0 ? (
            <p className="py-12 text-center text-muted">No assets found.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {assetList.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => { onSelect(asset.blobUrl); onClose(); }}
                  className="group rounded-lg border border-border bg-surface overflow-hidden transition-all hover:border-ignite hover:shadow-md"
                >
                  <div className="aspect-square bg-charcoal/50 flex items-center justify-center">
                    {asset.thumbnailUrl ? (
                      <img src={asset.thumbnailUrl} alt={asset.originalFilename} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-xs text-muted/40 font-mono uppercase">{asset.sourceFormat}</span>
                    )}
                  </div>
                  <p className="truncate px-2 py-1.5 text-[10px] text-muted group-hover:text-foreground">
                    {asset.originalFilename}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
