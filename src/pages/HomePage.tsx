import DashboardCard from '../components/common/DashboardCard';
import type { IconName } from '../components/common/icons.data';

interface HomePageProps {
  onNavigate: (page: 'home' | 'requests' | 'new-request') => void;
  onNewRequest: () => void;
}

export default function HomePage({ onNewRequest, onNavigate }: HomePageProps) {
  const handleCardClick = (action?: string) => {
    if (action === 'new-request') {
      onNewRequest();
    } else if (action === 'requests') {
      onNavigate('requests');
    }
  };

  const cards: { 
    title: string; 
    total: string; 
    borderColor: string; 
    iconColor: string; 
    iconName: IconName; 
    action?: 'home' | 'requests' | 'new-request'; 
  }[] = [
    {
      title: "សរុបពាក្យស្នើសុំ",
      total: "១២៥",
      borderColor: "border-l-[#2ea7ff]",
      iconColor: "bg-[#eaf6ff] text-[#2ea7ff]",
      iconName: "fileText",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំបានសម្រេច",
      total: "៨៩",
      borderColor: "border-l-[#27c28c]",
      iconColor: "bg-[#e9f9f3] text-[#27c28c]",
      iconName: "checkCircle",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំកំពុងពិនិត្យ",
      total: "២៤",
      borderColor: "border-l-[#ffb822]",
      iconColor: "bg-[#fff8e6] text-[#ffb822]",
      iconName: "refresh",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំមិនបានសម្រេច",
      total: "១២",
      borderColor: "border-l-[#f4516c]",
      iconColor: "bg-[#feeef1] text-[#f4516c]",
      iconName: "xCircle",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំក្នុងថ្ងៃនេះ",
      total: "០៨",
      borderColor: "border-l-[#8c52ff]",
      iconColor: "bg-[#f2edff] text-[#8c52ff]",
      iconName: "plusCircle",
      action: "requests"
    },
    {
      title: "រង់ចាំការទូទាត់",
      total: "០៥",
      borderColor: "border-l-[#00d2d3]",
      iconColor: "bg-[#ebffff] text-[#00d2d3]",
      iconName: "creditCard",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំព្រាង",
      total: "០៣",
      borderColor: "border-l-[#636e72]",
      iconColor: "bg-[#f5f6fa] text-[#636e72]",
      iconName: "bookmark",
      action: "requests"
    },
    {
      title: "ពាក្យស្នើសុំបានលុបចោល",
      total: "០២",
      borderColor: "border-l-[#fab1a0]",
      iconColor: "bg-[#fff4f2] text-[#fab1a0]",
      iconName: "menu",
      action: "requests"
    }
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl text-[#0070c0]">ផ្ទាំងគ្រប់គ្រង</h1>
          <p className="text-sm text-gray-500">សូមស្វាគមន៍មកកាន់ប្រព័ន្ធគ្រប់គ្រងសេវារដ្ឋបាល</p>
        </div>
        <button
          type="button"
          onClick={onNewRequest}
          className="w-full sm:w-auto inline-flex h-11 items-center justify-center whitespace-nowrap rounded-lg bg-[#0070c0] px-6 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#005c9e] hover:shadow-lg active:scale-95"
        >
          + ដាក់ពាក្យស្នើសុំថ្មី
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            total={card.total}
            borderColor={card.borderColor}
            iconColor={card.iconColor}
            iconName={card.iconName}
            onClick={() => handleCardClick(card.action)} 
          />
        ))}
      </div>
    </div>
  );
}