import { useState } from 'react';
import { X, Check } from 'lucide-react';
import type { PaymentInfo } from '../types/service.types';

interface Step4Props {
  paymentInfo: PaymentInfo;
  onUpdatePayment: (info: PaymentInfo) => void;
}

export default function Step4_PaymentAttachments({ paymentInfo }: Step4Props) {
  const [] = useState<PaymentInfo>(paymentInfo);

  // Mock data for the 4 required image slots seen in watermarked_img_3338033500716564226.png
  const uploadSlots = [
    { id: 1, label: "ឯកសារថតចម្លង លិខិតអនុញ្ញាត ឬសញ្ញាបត្រ ឬសញ្ញាបត្រច្បាប់ដើម", fileName: "Logo_អង្គភាពច្រកចេញចូលតែមួយ.png", size: "1.5 MB" },
    { id: 2, label: "អត្តសញ្ញាណប័ណ្ណ (ច្បាប់ដើម)", fileName: "ID_Card_Front.png", size: "0.8 MB" },
    { id: 3, label: "សៀវភៅគ្រួសារ (ច្បាប់ដើម)", fileName: "Family_Book.png", size: "2.1 MB" },
    { id: 4, label: "ប័ណ្ណកម្មសិទ្ធិដីធ្លី (ច្បាប់ដើម)", fileName: "Land_Title_Main.png", size: "1.9 MB" }
  ];

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-6 text-[#444]">
      {/* Header aligned with image_73a91d.png */}
      <div className="relative">
        <span className="absolute -top-3 left-4 bg-[#f8f9fa] px-2 text-sm font-bold">ឯកសារភ្ជាប់</span>
        <div className="border border-gray-300 rounded-sm p-8 pt-10">
          
          {/* 4-Column Grid for Uploaded Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {uploadSlots.map((slot) => (
              <div 
                key={slot.id} 
                className="relative bg-white border border-red-500 rounded-sm p-4 flex flex-col items-center justify-center text-center min-h-[200px] shadow-sm"
              >
                {/* Delete Button (Red Circle with X) */}
                <button className="absolute -top-3 -right-3 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors">
                  <X size={16} strokeWidth={3} />
                </button>

                {/* Slot Label & Success Check */}
                <div className="flex items-center gap-2 mb-2 px-2">
                  <p className="text-[11px] font-bold leading-tight text-gray-700">
                    {slot.label}
                  </p>
                  <Check size={14} className="text-green-600 flex-shrink-0" strokeWidth={3} />
                </div>

                {/* View Link */}
                <button className="text-[#0070c0] text-xs font-bold underline mb-4 hover:text-blue-800">
                  ពិនិត្យមើល
                </button>

                {/* File Metadata */}
                <div className="mt-auto space-y-1">
                  <p className="text-[11px] font-bold text-gray-900">{slot.size}</p>
                  <p className="text-[10px] text-gray-500 break-all px-2">
                    {slot.fileName}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}