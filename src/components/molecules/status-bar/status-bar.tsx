type StatusBarProps = {
  status: 'completed' | 'pending' | 'cancelled' | 'in progress' | 'unavailable';
};

export default function StatusBar({ status }: StatusBarProps) {
  const renderStatus = () => {
    switch (status) {
      case 'completed':
        return (
          <div className="bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs w-fit font-base">
            Completed
          </div>
        );
      case 'pending':
        return (
          <div className="bg-yellow-100 text-yellow-600 rounded-full px-2 py-1 text-xs w-fit font-base">
            Pending
          </div>
        );
      case 'in progress':
        return (
          <div className="bg-blue-100 text-blue-600 rounded-full px-2 py-1 text-xs w-fit font-base">
            In Progress
          </div>
        );
      case 'cancelled':
        return (
          <div className="bg-red-100 text-red-600 rounded-full px-2 py-1 text-xs w-fit font-base">
            Cancelled
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-black rounded-full px-2 py-1 text-xs w-fit font-base">
            Unavailable
          </div>
        );
    }
  };

  return <div>{renderStatus()}</div>;
}
