import { useState } from 'react';
import type { DocumentInfo } from '../types/service.types';

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
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-8 text-[#444]">
      
      {/* Location Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold border-b border-gray-300 pb-2">
          ទីតាំងអង្គភាពច្រកចេញចូលតែមួយ
        </h3>
        <div className="space-y-1">
          <label className="text-[13px] font-semibold text-gray-700">
            ទីតាំង
          </label>
          <div className="relative">
            <select
              value={(formData as any).location || ""}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded bg-white text-sm outline-none appearance-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1rem'
              }}
            >
              <option value="" disabled>--- សូមជ្រើសរើសទីតាំង ---</option>
              {cambodiaProvinces.map((province) => (
                <option key={province} value={province}>{province}</option>
              ))}
            </select>
          </div>
          <div className="flex items-start gap-2 pt-2">
            <span className="text-red-600 text-sm">👉</span>
            <p className="text-red-600 text-[13px] font-bold">
              សូមបញ្ជាក់៖ ទីតាំងដែលលោកអ្នកបានជ្រើសរើស ជាកន្លែងទទួលលទ្ធផលសម្រេច។
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}