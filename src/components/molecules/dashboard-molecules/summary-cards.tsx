import { Clock, CheckCircle, Loader, XCircle } from 'lucide-react';

type StatCardProps = {
  title: string;
  count: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  icon?: any;
  variant: 'pending' | 'success' | 'inprogress' | 'failed';
};

const variantStyles: Record<StatCardProps['variant'], { bg: string; text: string; icon: any }> = {
  pending: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-800',
    icon: Clock,
  },
  success: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    icon: CheckCircle,
  },
  inprogress: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    icon: Loader,
  },
  failed: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    icon: XCircle,
  },
};

const SummaryCards = ({ title, count, icon, variant }: StatCardProps) => {
  const { bg, text, icon: DefaultIcon } = variantStyles[variant];
  const IconComponent = icon || DefaultIcon;

  const iconClasses = `${text} w-5 h-5 ${variant === 'inprogress' ? 'animate-spin' : ''}`;

  return (
    <div
      className={`${bg} ${text} rounded-lg shadow px-4 py-2 w-[200px] h-[*0px] flex flex-col justify-between hover:shadow-md transition-shadow`}
    >
      {/* Title + Icon */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">{title}</h3>
        <IconComponent className={iconClasses} size={18} />
      </div>

      {/* Count */}
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

export default SummaryCards;
