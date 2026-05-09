import { useState } from 'react';
import GlobalSearch from './GlobalSearch';
import servicesData from '../data/services.json';
import type { Service } from '../types/service.types';

interface Step1Props {
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function Step1_ServiceSelection({
  selectedService,
  onSelectService,
  quantity,
  onQuantityChange
}: Step1Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = selectedService ? selectedService.price * quantity : 0;

  const handleSelectService = (service: Service) => {
    onSelectService(service);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-6 text-[#444]">
      {/* Title */}
      <h3 className="text-lg font-bold border-b border-gray-300 pb-2">ព័ត៌មានសេវារដ្ឋបាល</h3>

      {/* Service Search Row */}
      <div className="space-y-1">
        <label className="text-sm font-semibold">
          សេវារដ្ឋបាល
        </label>
        <div className="flex gap-2 p-2 bg-[#eee] border border-gray-300 rounded-md">
          <div className="flex-1 bg-transparent px-2 py-1 min-h-[40px] text-gray-700">
            {selectedService?.name || ""}
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-1 bg-white border border-gray-400 rounded hover:bg-gray-50 text-sm shadow-sm"
          >
            ស្វែងរកសេវា
          </button>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold">តម្លៃសេវា (ជារៀល)</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-300 rounded h-10 flex items-center">
            {selectedService ? selectedService.price.toLocaleString() : ""}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">ចំនួន</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value) || 0)}
            className="w-full p-2 bg-white border border-gray-400 rounded h-10 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">សរុប (ជារៀល)</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-300 rounded h-10 flex items-center">
            {total.toLocaleString()}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">រយៈពេលផ្តល់សេវា (ថ្ងៃធ្វើការ)</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-300 rounded h-10 flex items-center">
            {selectedService?.duration || ""}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold">សុពលភាព</label>
          <div className="w-full p-2 bg-[#eee] border border-gray-300 rounded h-10 flex items-center">
            {selectedService?.validity || ""}
          </div>
        </div>
      </div>

      {/* Required Documents Section */}
      {selectedService && (
        <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
          <h4 className="font-bold text-sm">ឯកសារត្រូវភ្ជាប់មកជាមួយ ៖</h4>
          <ul className="list-decimal ml-8 text-sm space-y-1">
            {selectedService.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
          
          <div className="mt-4 text-xs space-y-1">
            <p className="text-red-600 font-bold italic">
              👉 សម្គាល់ : នៅពេលលោក-លោកស្រីមកទទួលលទ្ធផលសម្រេច សូមភ្ជាប់មកជាមួយនូវ :
            </p>
            <p className="text-red-600 ml-4">- ពាក្យស្នើសុំសេវាដែលមានចុះហត្ថលេខារបស់អ្នកស្នើសុំសេវា</p>
            <p className="text-red-600 ml-4">- ឯកសារពាក់ព័ន្ធផ្សេងៗ (ច្បាប់ដើម) ។</p>
          </div>
        </div>
      )}

      <GlobalSearch
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectService}
        items={servicesData.services}
        searchPlaceholder="ស្វែងរកសេវា..."
      />
    </div>
  );
}