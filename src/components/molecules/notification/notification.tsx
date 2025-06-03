type NotificationProps = {
  count: number;
};

export default function Notification({ count }: NotificationProps) {
  return (
    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
      {count}
    </div>
  );
}
