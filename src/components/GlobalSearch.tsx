import { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronRight, CornerDownLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Icon } from './common/Icon';

interface GlobalSearchProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: T) => void;
  items: T[];
  searchPlaceholder?: string;
  labelKey?: keyof T;
}

export default function GlobalSearch<T extends { name?: string; category?: string; [key: string]: any }>({
  isOpen,
  onClose,
  onSelect,
  items,
  searchPlaceholder = "ស្វែងរកសេវា...",
  labelKey = "name" as keyof T
}: GlobalSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter logic
  const filteredItems = items.filter(item => {
    const label = String(item[labelKey] || '');
    const category = String(item.category || '');
    return (
      label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Reset selection index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : prev));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
      }
      if (e.key === 'Enter' && filteredItems.length > 0) {
        onSelect(filteredItems[selectedIndex]);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] bg-gray-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] w-full max-w-2xl flex flex-col overflow-hidden animate-in slide-in-from-top-8 duration-300">
        
        {/* Search Header */}
        <div className="relative flex items-center px-5 py-4 border-b">
          <Search className="h-5 w-5 text-[#0070c0]" />
          <input 
            autoFocus
            type="text" 
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 text-lg outline-none placeholder:text-gray-400 font-khmer"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-sans font-semibold text-gray-400 bg-gray-100 border rounded-md">
            ESC
          </kbd>
          <button 
            onClick={onClose}
            className="ml-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Results */}
        <div 
          ref={scrollRef}
          className="max-h-[50vh] overflow-y-auto custom-scrollbar bg-white"
        >
          {filteredItems.length === 0 ? (
            <div className="px-10 py-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                <Search size={32} className="text-gray-200" />
              </div>
              <p className="text-gray-500 font-khmer">រកមិនឃើញសេវាដែលអ្នកកំពុងស្វែងរកទេ</p>
            </div>
          ) : (
            <div className="p-2">
              <div className="px-3 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest flex justify-between">
                <span>លទ្ធផលស្វែងរក</span>
                <span>{filteredItems.length} សេវា</span>
              </div>
              
              {filteredItems.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={index}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className={`
                      w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200
                      ${isSelected ? 'bg-blue-50 ring-1 ring-[#0070c0]/10' : 'hover:bg-gray-50'}
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-11 h-11 rounded-lg flex items-center justify-center transition-colors
                        ${isSelected ? 'bg-white text-[#0070c0] shadow-sm' : 'bg-gray-100 text-gray-500'}
                      `}>
                        <Icon name="fileText" className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`font-semibold font-khmer transition-colors ${isSelected ? 'text-[#0070c0]' : 'text-gray-900'}`}>
                          {String(item[labelKey] || '')}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <span className="bg-gray-200/50 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter">
                            {String(item.category || 'ទូទៅ')}
                          </span>
                          {item.code && <span>• {item.code}</span>}
                        </div>
                      </div>
                    </div>
                    
                    {isSelected ? (
                      <div className="flex items-center gap-2 text-[#0070c0] animate-in fade-in slide-in-from-right-2">
                        <span className="text-[10px] font-bold font-sans">ជ្រើសរើស</span>
                        <CornerDownLeft size={14} />
                      </div>
                    ) : (
                      <ChevronRight size={18} className="text-gray-300" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Help */}
        <div className="bg-gray-50/80 backdrop-blur-sm px-6 py-3 border-t flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center w-5 h-5 bg-white border rounded shadow-sm"><ArrowUp size={10} /></span>
              <span className="flex items-center justify-center w-5 h-5 bg-white border rounded shadow-sm"><ArrowDown size={10} /></span>
              រុករក
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center justify-center px-1.5 h-5 bg-white border rounded shadow-sm">ENTER</span> ជ្រើសរើស
            </div>
          </div>
          
          <div className="hidden sm:block italic">
            ច្រកចេញចូលតែមួយ
          </div>
        </div>
      </div>
    </div>
  );
}