import { useState } from 'react';
import type { DocumentInfo } from '../types/service.types';
import { MapPin, Info } from 'lucide-react';

interface Step3Props {
  documentInfo: DocumentInfo;
  onUpdateDocument: (info: DocumentInfo) => void;
}

export default function Step3_PositionToRecieve({ documentInfo, onUpdateDocument }: Step3Props) {
  const [formData, setFormData] = useState<DocumentInfo>(documentInfo);

  const handleChange = (field: string, value: any) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    onUpdateDocument(updated);
  };

  const cambodiaProvinces = [
    "រាជធានីភ្នំពេញ", "ខេត្តកណ្តាល", "ខេត្តកំពង់ចាម", "ខេត្តកំពង់ឆ្នាំង", 
    "ខេត្តកំពង់ធំ", "ខេត្តកំពង់ស្ពឺ", "ខេត្តកំពត", "ខេត្តកោះកុង", 
    "ខេត្តក្រចេះ", "ខេត្តតាកែវ", "ខេត្តបាត់ដំបង", "ខេត្តប៉ៃលិន", 
    "ខេត្តបន្ទាយមានជ័យ", "ខេត្តពោធិ៍សាត់", "ខេត្តព្រះវិហារ", "ខេត្តព្រៃវែង", 
    "ខេត្តព្រះសីហនុ", "ខេត្តមណ្ឌលគិរី", "ខេត្តរតនគិរី", "ខេត្តសៀមរាប", 
    "ខេត្តស្ទឹងត្រែង", "ខេត្តស្វាយរៀង", "ខេត្តឧត្តរមានជ័យ", "ខេត្តកែប", "ខេត្តត្បូងឃ្មុំ"
  ];

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-lg space-y-8 text-[#444] animate-in fade-in slide-in-from-bottom-2">
      
      {/* Location Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-300 pb-3">
          <MapPin className="text-[#0070c0]" size={24} />
          <h3 className="text-lg font-bold">
            ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ
          </h3>
        </div>

        <div className="space-y-3 max-w-2xl">
          <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
            ជ្រើសរើសរាជធានី/ខេត្ត <span className="text-red-500">*</span>
          </label>
          
          <div className="relative group">
            <select
              value={(formData as any).location || ""}
              onChange={(e) => handleChange('location', e.target.value)}
              // "relative z-10" and ensuring parent has no "overflow-hidden" 
              // helps the browser dropdown display properly.
              className="w-full h-12 px-4 border border-gray-300 rounded-xl bg-white text-base outline-none appearance-none focus:border-[#0070c0] focus:ring-4 focus:ring-blue-100 transition-all cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%230070c0'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.2rem'
              }}
            >
              <option value="" disabled>--- សូមជ្រើសរើសទីតាំង ---</option>
              {cambodiaProvinces.map((province) => (
                <option key={province} value={province} className="py-2">
                  {province}
                </option>
              ))}
            </select>
          </div>

          {/* Warning Message Box */}
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl mt-4">
            <Info className="text-red-500 shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-red-700 text-sm font-bold leading-relaxed">
                សូមបញ្ជាក់៖
              </p>
              <p className="text-red-600 text-[13px] mt-0.5">
                ទីតាំងដែលលោកអ្នកបានជ្រើសរើសគឺ 
                <span className="mx-1 font-bold text-cyan-500 underline-offset-4">
                  {formData.location || "..."}
                </span> 
                ដែលជាកន្លែងដែលអ្នកត្រូវទៅទទួលលទ្ធផលសម្រេចជាផ្លូវការ។
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}