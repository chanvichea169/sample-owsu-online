import { useState, useEffect, useRef } from 'react';
import { X, ChevronRight, CornerDownLeft, ChevronDown, RotateCcw } from 'lucide-react';

interface FilterOption {
  label: string;
  value: string;
  code: string;
}

interface GlobalSearchProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: T) => void;
  items: T[];
  sectors: FilterOption[];      // Your sectors.json
  adminServices: FilterOption[]; // Your adminServices.json
  searchPlaceholder?: string;
  labelKey?: keyof T;
}

export default function GlobalSearch<T extends { name?: string; sectorCode?: string; adminCode?: string; [key: string]: any }>({
  isOpen,
  onClose,
  onSelect,
  items = [],
  sectors = [], // Default to empty array to prevent .map errors
  adminServices = [],
  searchPlaceholder = "ស្វែងរក និងជ្រើសរើសសេវា",
  labelKey = "name" as keyof T
}: GlobalSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [selectedAdminCode, setSelectedAdminCode] = useState('');
  const [selectedSectorCode, setSelectedSectorCode] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  // 1. FILTER LOGIC
  const filteredItems = items.filter(item => {
    const matchesSearch = String(item[labelKey] || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAdmin = !selectedAdminCode || item.adminCode === selectedAdminCode;
    const matchesSector = !selectedSectorCode || item.sectorCode === selectedSectorCode;
    return matchesSearch && matchesAdmin && matchesSector;
  });

  // 2. CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  // 3. KEYBOARD NAV
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm font-khmer">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl flex flex-col h-[90vh] relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#0070c0] px-8 py-5 flex justify-between items-center text-white shrink-0 rounded-t-2xl">
          <h2 className="text-xl font-medium tracking-wide">ស្វែងរក និងជ្រើសរើសសេវា</h2>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2"><X size={28} /></button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-8 border-b bg-white relative z-[120]">
          <div className="flex items-center border-2 border-gray-200 rounded-2xl shadow-sm focus-within:border-[#0070c0] bg-white">
            <input 
              autoFocus
              type="text" 
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-8 py-5 text-lg outline-none bg-transparent"
            />
            <div className="h-10 w-[2px] bg-gray-100"></div>
            
            {/* FILTER BUTTON */}
            <div className="relative" ref={filterRef}>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  setIsFilterOpen(!isFilterOpen);
                }}
                className={`px-8 py-5 flex items-center gap-3 text-base font-medium border-l border-gray-100 ${
                  isFilterOpen || selectedAdminCode || selectedSectorCode ? 'text-[#0070c0] bg-blue-50' : 'text-gray-600'
                }`}
              >
                <span>ច្រោះ</span>
                <ChevronDown size={20} className={isFilterOpen ? 'rotate-180 transition-transform' : ''} />
              </button>

              {/* DROPDOWN MENU */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-4 w-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl p-8 z-[130] animate-in fade-in slide-in-from-top-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-[#0070c0] text-sm uppercase">ជម្រើសចម្រោះ</h3>
                    <button 
                      onClick={() => { setSelectedAdminCode(''); setSelectedSectorCode(''); }}
                      className="text-xs text-red-500 flex items-center gap-1 hover:underline"
                    >
                      <RotateCcw size={14} /> សម្អាត
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Admin Services Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">សេវារដ្ឋបាល</label>
                      <select 
                        value={selectedAdminCode}
                        onChange={(e) => setSelectedAdminCode(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 cursor-pointer"
                      >
                        <option value="">សេវារដ្ឋបាល</option>
                        {adminServices.map((admin) => (
                          <option key={admin.code} value={admin.code}>
                            {admin.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sectors Selection */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase mb-2">វិស័យ</label>
                      <select 
                        value={selectedSectorCode}
                        onChange={(e) => setSelectedSectorCode(e.target.value)}
                        className="w-full border-2 border-gray-100 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-blue-400 cursor-pointer"
                      >
                        <option value="">វិស័យ</option>
                        {sectors.map((sector) => (
                          <option key={sector.code} value={sector.code}>
                            {sector.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50/20 z-10">
          {filteredItems.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { onSelect(item); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-10 py-6 flex items-center gap-6 ${
                    index === selectedIndex ? 'bg-[#0070c0] text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center ${
                    index === selectedIndex ? 'border-white bg-white/20' : 'border-gray-300'
                  }`}>
                    <ChevronRight size={22} />
                  </div>
                  <div className="flex-1 text-lg font-medium">{String(item[labelKey] || '')}</div>
                  {index === selectedIndex && <CornerDownLeft size={24} className="opacity-70" />}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-xl">មិនមានទិន្នន័យ</div>
          )}
        </div>
      </div>
    </div>
  );
}