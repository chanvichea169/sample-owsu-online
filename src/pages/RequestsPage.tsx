import { Icon } from "lucide-react";


interface RequestsPageProps {
  onBack: () => void;
}

export default function RequestsPage({ onBack }: RequestsPageProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 flex items-center gap-2 text-gray-600 hover:text-[#2491ff] transition-colors"
      >
        <Icon name="arrowLeft" className="h-5 w-5" iconNode={[]} />
        <span>ត្រឡប់ក្រោយ</span>
      </button>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">បញ្ជីពាក្យស្នើសុំ</h2>
        <p className="text-gray-500">គ្មានទិន្នន័យ</p>
      </div>
    </div>
  );
}