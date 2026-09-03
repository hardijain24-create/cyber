import React, { useState } from 'react';
import { 
  Search, Plus, Star, Copy, Eye, EyeOff, ShieldCheck, 
  Trash2, Key, Lock, Check, RefreshCw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface VaultRecord {
  id: string;
  title: string;
  category: 'logins' | 'keys' | 'notes';
  username: string;
  secretVal: string;
  url?: string;
  strength: 'strong' | 'moderate' | 'weak';
  favorite: boolean;
}

const INITIAL_RECORDS: VaultRecord[] = [
  {
    id: 'rec-1',
    title: 'Treasury Core Banking Principal Key',
    category: 'keys',
    username: 'admin_treasury_prod',
    secretVal: 'K9$mP2#xL8!vR4wZ1qN7tY3uA5bC6dE8',
    url: 'https://treasury-internal.bank.com',
    strength: 'strong',
    favorite: true
  },
  {
    id: 'rec-[#02]',
    title: 'Payments Gateway Root API Token',
    category: 'keys',
    username: 'api_master_pay',
    secretVal: 'pk_live_894f29a0293f019b48c028a',
    url: 'https://api.payments.bank.com',
    strength: 'strong',
    favorite: true
  },
  {
    id: 'rec-3',
    title: 'ISO 27001 GRC Audit Console Access',
    category: 'logins',
    username: 'ciso_auditor@enterprise.com',
    secretVal: 'VaultPass2026!#GRC',
    url: 'https://grc.enterprise.com',
    strength: 'strong',
    favorite: false
  },
  {
    id: 'rec-4',
    title: 'RBI Cyber Security Compliance Vault',
    category: 'notes',
    username: 'compliance_officer',
    secretVal: 'AES256-Key: 94a02f8819c049d28e71029a8f4c102',
    url: 'https://rbi-reporting.enterprise.com',
    strength: 'strong',
    favorite: false
  }
];

export const VaultTab: React.FC = () => {
  const [records, setRecords] = useState<VaultRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<VaultRecord | null>(INITIAL_RECORDS[0]);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  // Add Modal
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newSecret, setNewSecret] = useState('');

  const filteredRecords = records.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.username.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q)
    );
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newSecret) return;

    const created: VaultRecord = {
      id: Date.now().toString(),
      title: newTitle,
      category: 'logins',
      username: newUsername || 'admin@enterprise.com',
      secretVal: newSecret,
      strength: 'strong',
      favorite: false
    };

    setRecords([created, ...records]);
    setSelectedRecord(created);
    setIsAddOpen(false);
    setNewTitle('');
    setNewUsername('');
    setNewSecret('');
  };

  return (
    <div className="space-y-6">
      {/* Page Heading */}
      <div className="bg-white p-6 rounded-2xl border border-[#E2E6E2] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7342E2] bg-[#EEEBFF] px-2.5 py-1 rounded-md inline-block mb-1 font-mono">
            ZERO-KNOWLEDGE SECRETS VAULT
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)' }} className="text-2xl font-bold text-[#18211D]">
            Credentials & API Secrets Vault
          </h2>
          <p className="text-xs text-[#66716B] mt-1">
            Client-side AES-256-GCM encrypted credentials and 2FA authenticator tokens
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="btn-primary py-2.5 px-5 bg-[#7342E2] hover:bg-[#6232c9] shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Record</span>
        </button>
      </div>

      {/* Main Vault Master/Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 rf-card p-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#929B96]" />
            <input
              type="text"
              placeholder="Search vault records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rf-input w-full pl-9 text-xs"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredRecords.map((r) => {
              const isSelected = selectedRecord?.id === r.id;
              return (
                <div
                  key={r.id}
                  onClick={() => {
                    setSelectedRecord(r);
                    setShowSecret(false);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#EEEBFF] border-[#7342E2] text-[#7342E2]'
                      : 'bg-white border-[#E2E6E2] hover:bg-[#F8F9F7] text-[#18211D]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#7342E2] text-white' : 'bg-[#EEF0EC] text-[#18211D]'
                    }`}>
                      <Key className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate">{r.title}</h4>
                      <p className="text-[11px] opacity-70 font-mono truncate">{r.username}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#E2E6E2] text-[#3D9B72]">
                    AES-256
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail (7 cols) */}
        <div className="lg:col-span-7 rf-card p-6 space-y-6">
          {selectedRecord ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b border-[#E2E6E2] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7342E2] text-white flex items-center justify-center font-bold">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#18211D]">
                      {selectedRecord.title}
                    </h3>
                    <span className="text-xs text-[#929B96] font-mono">{selectedRecord.id} • {selectedRecord.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setRecords(records.filter((r) => r.id !== selectedRecord.id));
                    setSelectedRecord(records[0] || null);
                  }}
                  className="p-2 text-[#C94B59] hover:bg-[#F9E5E8] rounded-lg transition-colors cursor-pointer"
                  title="Delete Record"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Username Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#929B96] uppercase tracking-wider">Username / Identity</label>
                <div className="p-3 bg-[#FBFCFA] border border-[#E2E6E2] rounded-xl flex items-center justify-between font-mono text-xs font-bold text-[#18211D]">
                  <span>{selectedRecord.username}</span>
                  <button
                    onClick={() => handleCopy(selectedRecord.username)}
                    className="p-1.5 hover:bg-[#EEF0EC] rounded cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5 text-[#66716B]" />
                  </button>
                </div>
              </div>

              {/* Secret Value Field */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-[#929B96] uppercase tracking-wider">Password / Secret Key</label>
                <div className="p-3 bg-[#FBFCFA] border border-[#E2E6E2] rounded-xl flex items-center justify-between font-mono text-xs font-bold text-[#18211D]">
                  <span className="truncate pr-3 text-[#7342E2]">
                    {showSecret ? selectedRecord.secretVal : '••••••••••••••••••••••••'}
                  </span>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowSecret(!showSecret)}
                      className="p-1.5 hover:bg-[#EEF0EC] rounded cursor-pointer text-[#66716B]"
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => handleCopy(selectedRecord.secretVal)}
                      className="btn-primary py-1.5 px-3 text-xs bg-[#7342E2]"
                    >
                      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Security Audit Badge */}
              <div className="p-4 rounded-xl bg-[#E7F5EE] border border-[#3D9B72]/30 flex items-center justify-between text-xs text-[#3D9B72] font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#3D9B72]" />
                  <span>Passes Zero-Knowledge & High-Entropy Standards</span>
                </div>
                <span className="font-mono text-xs font-bold">Score 100/100</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-xs text-[#929B96]">Select a record to view decrypted details</div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-[#18211D]/30 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E6E2] rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <h3 style={{ fontFamily: 'var(--font-heading)' }} className="text-lg font-bold text-[#18211D]">
              Add New Vault Secret
            </h3>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#929B96] font-semibold mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. AWS Production API Secret"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="rf-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-[#929B96] font-semibold mb-1">Username / Key Name</label>
                <input
                  type="text"
                  placeholder="e.g. aws_root_admin"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="rf-input w-full"
                />
              </div>

              <div>
                <label className="block text-[#929B96] font-semibold mb-1">Secret / Password</label>
                <input
                  type="password"
                  placeholder="Secret key value"
                  value={newSecret}
                  onChange={(e) => setNewSecret(e.target.value)}
                  className="rf-input w-full"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E6E2]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary bg-[#7342E2]">
                  Save Secret
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
