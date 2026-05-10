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
  sectors: FilterOption[];
  adminServices: FilterOption[];
  searchPlaceholder?: string;
  labelKey?: keyof T;
}

export default function GlobalSearch<T extends { name?: string; sectorCode?: string; adminCode?: string; [key: string]: any }>({
  isOpen,
  onClose,
  onSelect,
  items = [],
  sectors = [],
  adminServices = [],
  searchPlaceholder = "ស្វែងរកសេវា...",
  labelKey = "name" as keyof T
}: GlobalSearchProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedAdminCode, setSelectedAdminCode] = useState('');
  const [selectedSectorCode, setSelectedSectorCode] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  const filteredItems = items.filter(item => {
    const matchesSearch = String(item[labelKey] || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAdmin = !selectedAdminCode || item.adminCode === selectedAdminCode;
    const matchesSector = !selectedSectorCode || item.sectorCode === selectedSectorCode;
    return matchesSearch && matchesAdmin && matchesSector;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    if (isFilterOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isFilterOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm font-khmer">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-5xl flex flex-col h-[95vh] sm:h-[85vh] relative animate-in slide-in-from-bottom sm:zoom-in-95 duration-300">
        
        {/* Header - Compact on mobile */}
        <div className="bg-[#0070c0] px-4 md:px-8 py-4 md:py-5 flex justify-between items-center text-white shrink-0 rounded-t-2xl">
          <h2 className="text-base md:text-xl font-medium">ស្វែងរក និងជ្រើសរើសសេវា</h2>
          <button onClick={onClose} className="hover:bg-white/20 rounded-full p-1.5 md:p-2">
            <X size={24} className="md:w-7 md:h-7" />
          </button>
        </div>

        {/* Search & Filter Bar - Stacked on mobile */}
        <div className="p-4 md:p-6 border-b bg-white relative z-[120]">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center border-2 border-gray-200 rounded-xl md:rounded-2xl shadow-sm focus-within:border-[#0070c0] bg-white overflow-hidden">
            <input 
              autoFocus
              type="text" 
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 md:px-6 py-3 md:py-4 text-sm md:text-lg outline-none bg-transparent"
            />
            
            <div className="hidden sm:block h-8 w-[1px] bg-gray-200"></div>
            
            <div className="relative border-t sm:border-t-0 sm:border-l border-gray-100" ref={filterRef}>
              <button 
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`w-full sm:w-auto px-4 md:px-8 py-3 md:py-4 flex items-center justify-between sm:justify-center gap-2 text-sm md:text-base font-medium ${
                  isFilterOpen || selectedAdminCode || selectedSectorCode ? 'text-[#0070c0] bg-blue-50' : 'text-gray-600'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>ច្រោះ</span>
                  {(selectedAdminCode || selectedSectorCode) && <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                </div>
                <ChevronDown size={18} className={isFilterOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              {/* Filter Dropdown - Full width on mobile */}
              {isFilterOpen && (
                <div className="absolute right-0 sm:right-0 top-full mt-2 w-full sm:w-[400px] bg-white border border-gray-200 rounded-xl shadow-2xl p-5 md:p-6 z-[130] animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-[#0070c0] text-xs uppercase">ជម្រើសចម្រោះ</h3>
                    <button 
                      onClick={() => { setSelectedAdminCode(''); setSelectedSectorCode(''); }}
                      className="text-[10px] text-red-500 flex items-center gap-1 hover:underline font-bold"
                    >
                      <RotateCcw size={12} /> សម្អាត
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">សេវារដ្ឋបាល</label>
                      <select 
                        value={selectedAdminCode}
                        onChange={(e) => setSelectedAdminCode(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-400"
                      >
                        <option value="">សេវារដ្ឋបាលទាំងអស់</option>
                        {adminServices.map((admin) => (
                          <option key={admin.code} value={admin.code}>{admin.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">វិស័យ</label>
                      <select 
                        value={selectedSectorCode}
                        onChange={(e) => setSelectedSectorCode(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-xs outline-none focus:border-blue-400"
                      >
                        <option value="">វិស័យទាំងអស់</option>
                        {sectors.map((sector) => (
                          <option key={sector.code} value={sector.code}>{sector.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results - Scrollable Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50/30">
          {filteredItems.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => { onSelect(item); onClose(); }}
                  className={`w-full text-left px-4 md:px-10 py-4 md:py-6 flex items-center gap-3 md:gap-6 transition-all ${
                    index === selectedIndex ? 'bg-blue-50/50 border-l-4 border-[#0070c0]' : 'bg-white'
                  }`}
                >
                  <div className={`shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full border flex items-center justify-center ${
                    index === selectedIndex ? 'border-[#0070c0] bg-blue-100 text-[#0070c0]' : 'border-gray-200 text-gray-300'
                  }`}>
                    <ChevronRight size={18} />
                  </div>
                  <div className="flex-1 text-sm md:text-lg font-medium text-gray-800 leading-snug">
                    {String(item[labelKey] || '')}
                  </div>
                  <CornerDownLeft size={18} className="text-gray-300 hidden md:block opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
              <RotateCcw size={48} className="mb-4 opacity-20" />
              <div className="text-sm md:text-xl">មិនមានទិន្នន័យ</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}