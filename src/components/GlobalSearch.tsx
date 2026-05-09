import { useState } from 'react';
import { X, Search, ChevronRight } from 'lucide-react';
import { Icon } from './common/Icon';

interface FilterOption {
  label: string;
  value: string;
  code?: string;
}

interface GlobalSearchProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: T) => void;
  items: T[];
  searchPlaceholder?: string;
  filterCategories?: {
    adminServices?: FilterOption[];
    sectors?: FilterOption[];
  };
  title?: string;
  labelKey?: keyof T;
}

export default function GlobalSearch<T extends { name?: string; category?: string; [key: string]: unknown }>({
  isOpen,
  onClose,
  onSelect,
  items,
  searchPlaceholder = "ស្វែងរកសេវា...",
  labelKey = "name" as keyof T
}: GlobalSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => {
    const label = String(item[labelKey] || '');
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
        {/* Search Header */}
        <div className="relative border-b">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            autoFocus
            type="text" 
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-12 py-5 text-lg outline-none placeholder:text-gray-400"
          />
          <button 
            onClick={onClose}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredItems.length === 0 ? (
            <div className="px-10 py-12 text-center text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-lg">រកមិនឃើញសេវាដែលអ្នកកំពុងស្វែងរកទេ</p>
            </div>
          ) : (
            <div className="px-2">
              <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                លទ្ធផលស្វែងរក ({filteredItems.length})
              </div>
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl flex items-center justify-between hover:bg-blue-50 group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-white flex items-center justify-center text-gray-500 group-hover:text-[#0070c0] transition-colors">
                      <Icon name="fileText" className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-[#0070c0]">{String(item[labelKey] || '')}</div>
                      <div className="text-xs text-gray-500">{String(item.category || 'ទូទៅ')}</div>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[#0070c0] transform group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Footer Hints */}
        <div className="bg-gray-50 px-6 py-3 border-t flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-white border rounded shadow-sm">ESC</span> បិទ
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-white border rounded shadow-sm">ENTER</span> ជ្រើសរើស
          </div>
        </div>
      </div>
    </div>
  );
}