import { useState, useRef } from 'react';
import { X, Check, Upload, Eye } from 'lucide-react';
import type { PaymentInfo } from '../types/service.types';

interface Step4Props {
  paymentInfo: PaymentInfo;
  onUpdatePayment: (info: PaymentInfo) => void;
}

interface UploadedFile {
  id: number;
  label: string;
  file: File | null;
  previewUrl: string | null;
}

export default function Step4_PaymentAttachments({  }: Step4Props) {
  // Initialize slots. In a real app, these labels could come from the selected service's requirements.
  const [slots, setSlots] = useState<UploadedFile[]>([
    { id: 1, label: "ឯកសារថតចម្លង លិខិតអនុញ្ញាត ឬសញ្ញាបត្រច្បាប់ដើម", file: null, previewUrl: null },
    { id: 2, label: "អត្តសញ្ញាណប័ណ្ណ (ច្បាប់ដើម)", file: null, previewUrl: null },
    { id: 3, label: "សៀវភៅគ្រួសារ (ច្បាប់ដើម)", file: null, previewUrl: null },
    { id: 4, label: "ប័ណ្ណកម្មសិទ្ធិដីធ្លី (ច្បាប់ដើម)", file: null, previewUrl: null },
  ]);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFileChange = (id: number, file: File | null) => {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const updatedSlots = slots.map(slot => 
      slot.id === id ? { ...slot, file, previewUrl } : slot
    );

    setSlots(updatedSlots);
    // Optionally update the parent state with the file list
    // onUpdatePayment({ ...paymentInfo, attachments: updatedSlots.filter(s => s.file).map(s => s.file) });
  };

  const removeFile = (id: number) => {
    const updatedSlots = slots.map(slot => {
      if (slot.id === id) {
        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
        return { ...slot, file: null, previewUrl: null };
      }
      return slot;
    });
    setSlots(updatedSlots);
  };

  return (
    <div className="bg-[#f8f9fa] p-6 border border-gray-300 rounded-sm space-y-6 text-[#444]">
      <div className="relative">
        <span className="absolute -top-3 left-4 bg-[#f8f9fa] px-2 text-sm font-bold text-[#0070c0]">ឯកសារភ្ជាប់</span>
        <div className="border border-gray-300 rounded-sm p-4 md:p-8 pt-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {slots.map((slot, index) => (
              <div 
                key={slot.id} 
                className={`relative bg-white border-2 rounded-xl p-4 flex flex-col items-center justify-center text-center min-h-[220px] transition-all ${
                  slot.file ? 'border-green-500 shadow-md' : 'border-dashed border-gray-300 hover:border-[#0070c0]'
                }`}
              >
                {/* Hidden File Input */}
                <input
                  type="file"
                  ref={el => { fileInputRefs.current[index] = el; }}
                  className="hidden"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(slot.id, e.target.files?.[0] || null)}
                />

                {slot.file ? (
                  <>
                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFile(slot.id)}
                      className="absolute -top-3 -right-3 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition-transform active:scale-90"
                    >
                      <X size={18} strokeWidth={3} />
                    </button>

                    {/* Image Preview or Success Icon */}
                    <div className="w-full h-24 mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 border border-gray-100">
                      {slot.previewUrl && slot.file.type.startsWith('image/') ? (
                        <img src={slot.previewUrl} alt="preview" className="object-cover w-full h-full" />
                      ) : (
                        <Check size={40} className="text-green-500" strokeWidth={3} />
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-[11px] font-bold leading-tight text-gray-700 line-clamp-2">
                        {slot.label}
                      </p>
                    </div>

                    <button 
                      onClick={() => window.open(slot.previewUrl!, '_blank')}
                      className="flex items-center gap-1 text-[#0070c0] text-xs font-bold underline hover:text-blue-800"
                    >
                      <Eye size={14} /> ពិនិត្យមើល
                    </button>

                    <div className="mt-4 w-full border-t pt-2">
                      <p className="text-[10px] font-bold text-gray-900">{(slot.file.size / 1024 / 1024).toFixed(2)} MB</p>
                      <p className="text-[9px] text-gray-500 truncate w-full px-2">{slot.file.name}</p>
                    </div>
                  </>
                ) : (
                  /* Empty State / Upload Button */
                  <div 
                    className="cursor-pointer w-full h-full flex flex-col items-center justify-center space-y-3 p-2"
                    onClick={() => fileInputRefs.current[index]?.click()}
                  >
                    <div className="w-12 h-12 bg-blue-50 text-[#0070c0] rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <Upload size={24} />
                    </div>
                    <p className="text-[11px] font-bold text-gray-500 leading-tight">
                      {slot.label}
                    </p>
                    <span className="text-[10px] text-[#0070c0] font-bold">ចុចដើម្បីបញ្ចូលរូបភាព</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
            <span className="text-blue-600 text-sm">ℹ️</span>
            <p className="text-[11px] text-blue-700 font-medium">
              ប្រភេទឯកសារដែលអាចបញ្ចូលបាន៖ <strong>JPG, PNG, PDF</strong> (ទំហំអតិបរមា 5MB ក្នុងមួយឯកសារ)។
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}