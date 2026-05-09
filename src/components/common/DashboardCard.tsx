import { Icon } from "./Icon";
import type { IconName } from "./icons.data";


interface DashboardCardProps {
  title: string;
  total: string;
  borderColor: string;
  iconColor: string;
  iconName: IconName;
  onClick?: () => void;
}

export default function DashboardCard({
  title,
  total,
  borderColor,
  iconColor,
  iconName,
  onClick
}: DashboardCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${borderColor} p-6 flex items-center gap-6 hover:shadow-md transition-all text-left w-full group`}
    >
      <div className={`w-16 h-16 rounded-2xl ${iconColor} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110`}>
        <Icon name={iconName} className="w-8 h-8" />
      </div>
      <div className="flex flex-col">
        <span className="text-gray-500 text-xs font-bold uppercase mb-1">
          {title}
        </span>
        <span className="text-2xl font-extrabold text-gray-900 leading-none">
          {total}
        </span>
      </div>
    </button>
  );
}