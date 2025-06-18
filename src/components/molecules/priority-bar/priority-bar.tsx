type PriorityBarProps = {
  priority: 'routine' | 'urgent' | 'stat' | string | null | undefined;
};

export default function PriorityBar({ priority }: PriorityBarProps) {
  const renderPriority = () => {
    switch (priority?.toLowerCase()) {
      case 'routine':
        return (
          <div className="bg-gray-100 text-gray-700 rounded-full px-2 py-1 text-xs w-fit">
            Routine
          </div>
        );
      case 'urgent':
        return (
          <div className="bg-amber-100 text-amber-700 rounded-full px-2 py-1 text-xs w-fit">
            Urgent
          </div>
        );
      case 'stat':
        return (
          <div className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs w-fit">STAT</div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-500 italic rounded-full px-2 py-1 text-xs w-[40px]">
            N/A
          </div>
        );
    }
  };

  return <div>{renderPriority()}</div>;
}
