import { useState } from 'react';
import GlobalSearch from './GlobalSearch';
import servicesData from '../data/services.json';
import type { Service } from '../types/service.types';

interface Step1Props {
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  sectors: any[];
  adminServices: any[];
}

export default function Step1_ServiceSelection({
  selectedService,
  onSelectService,
  quantity,
  onQuantityChange,
  sectors,
  adminServices
}: Step1Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = selectedService ? selectedService.price * quantity : 0;

  const handleSelectService = (service: Service) => {
    onSelectService(service);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8f9fa] p-4 md:p-6 border border-gray-300 rounded-sm space-y-6 text-[#444] font-khmer">
      {/* Title */}
      <h3 className="text-base md:text-lg font-bold border-b border-gray-300 pb-2">
        ព័ត៌មានសេវារដ្ឋបាល
      </h3>

      {/* Service Search Row */}
      <div className="space-y-2">
        <label className="text-sm font-semibold">សេវារដ្ឋបាល</label>
        <div className="flex flex-col sm:flex-row gap-2 p-2 bg-[#eee] border border-gray-300 rounded-md">
          <div className="flex-1 bg-transparent px-2 py-2 sm:py-1 min-h-[40px] text-gray-700 text-sm md:text-base font-medium leading-relaxed">
            {selectedService?.name || "សូមជ្រើសរើសសេវា..."}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-2 bg-white border border-gray-400 rounded hover:bg-gray-50 text-sm shadow-sm font-bold transition-colors active:scale-95"
          >
            ស្វែងរកសេវា
          </button>
        </div>
      </div>

      {/* Details Grid - Responsive Logic */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Row 1: Price */}
        <div className="space-y-1">
          <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase">តម្លៃសេវា (រៀល)</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-200 rounded h-11 flex items-center font-bold text-gray-700">
            {selectedService ? selectedService.price.toLocaleString() : ""}
          </div>
        </div>

        {/* Row 2: Quantity */}
        <div className="space-y-1">
          <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase">ចំនួន</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
            className="w-full p-2 bg-white border border-gray-400 rounded h-11 outline-none focus:border-[#0070c0] focus:ring-2 focus:ring-blue-100 font-bold"
          />
        </div>

        {/* Row 3: Total - Highlighting on mobile */}
        <div className="space-y-1 sm:col-span-2 md:col-span-1">
          <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase">សរុប (រៀល)</label>
          <div className="w-full p-2 bg-[#e7f3ff] border border-blue-200 text-[#0070c0] rounded h-11 flex items-center font-black">
            {total.toLocaleString()}
          </div>
        </div>

        {/* Row 4: Duration */}
        <div className="space-y-1">
          <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase">រយៈពេល (ថ្ងៃ)</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-200 rounded h-11 flex items-center text-gray-600">
            {selectedService?.duration || ""}
          </div>
        </div>

        {/* Row 5: Validity */}
        <div className="space-y-1">
          <label className="text-[11px] md:text-xs font-bold text-gray-500 uppercase">សុពលភាព</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-200 rounded h-11 flex items-center text-gray-600">
            {selectedService?.validity || ""}
          </div>
        </div>
      </div>

      {/* Required Documents Section */}
      {selectedService && (
        <div className="mt-6 space-y-3 border-t border-gray-200 pt-5 animate-in fade-in duration-500">
          <h4 className="font-bold text-sm text-[#0070c0]">ឯកសារត្រូវភ្ជាប់មកជាមួយ ៖</h4>
          <ul className="space-y-2">
            {selectedService.requirements.map((req, idx) => (
              <li key={idx} className="flex gap-3 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-[#0070c0] rounded-full flex items-center justify-center text-[10px] font-bold">
                  {idx + 1}
                </span>
                {req}
              </li>
            ))}
          </ul>
          
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100 space-y-2">
            <p className="text-red-600 text-xs font-bold italic flex items-center gap-2">
              <span>👉</span> សម្គាល់ : នៅពេលលោក-លោកស្រីមកទទួលលទ្ធផលសម្រេច សូមភ្ជាប់មកជាមួយនូវ :
            </p>
            <div className="ml-6 space-y-1">
              <p className="text-red-600 text-[11px] font-medium">- ពាក្យស្នើសុំសេវាដែលមានចុះហត្ថលេខារបស់អ្នកស្នើសុំ</p>
              <p className="text-red-600 text-[11px] font-medium">- ឯកសារពាក់ព័ន្ធផ្សេងៗ (ច្បាប់ដើម) ។</p>
            </div>
          </div>
        </div>
      )}

      <GlobalSearch
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectService}
        items={servicesData.services}
        sectors={sectors}
        adminServices={adminServices}
        searchPlaceholder="ស្វែងរកសេវា..."
      />
    </div>
  );
}