import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Download } from 'lucide-react';

type billTableType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  billInfo: any;
  setFinalTasks: (
    items: {
      name: string;
      quantity: number;
      discount: number;
    }[]
  ) => void;
  selectedReceipt: (id: string, name: string) => void;
};

export interface TaskItem {
  name: string;
  price: number;
  quantity?: number;
  discountable?: boolean;
  bill?: string;
  discount?: number;
  bill_id?: string;
}

export default function BillingDetailsTable({
  billInfo,
  setFinalTasks,
  selectedReceipt,
}: billTableType) {
  const [allTasks, setAllTasks] = useState<
    {
      key: string;
      task: TaskItem;
      category: string;
      discount: number;
      subTotal: number;
      checked: boolean;
      bill_id: string;
    }[]
  >([]);
  const [selectedTaskKey, setSelectedTaskKey] = useState<string>('');
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  useEffect(() => {
    const tasks: typeof allTasks = [];

    billInfo?.tasks?.forEach((item: any, taskIndex: number) => {
      item?.task_data?.forEach((task: TaskItem, i: number) => {
        const key = `${item.task_name}-${task.name}-${taskIndex}-${i}`;
        const quantity = task.quantity ?? 1;
        const price = task.price;
        if (task?.bill === 'paid') {
          tasks.push({
            key,
            task,
            category: item.task_name.replace(/_/g, ' '),
            discount: task?.discount ?? 0,
            subTotal: price * quantity - (task?.discount ?? 0),
            checked: true,
            bill_id: task?.bill_id ?? '',
          });
        } else {
          tasks.push({
            key,
            task,
            category: item.task_name.replace(/_/g, ' '),
            discount: 0,
            subTotal: price * quantity,
            checked: false,
            bill_id: task?.bill_id ?? '',
          });
        }
      });
    });

    setAllTasks(tasks);
  }, [billInfo]);

  useEffect(() => {
    const selected = allTasks.filter((item) => item.task?.bill !== 'paid' && item.checked);
    const exist = selected.filter((item) => item?.key === selectedTaskKey);
    const allChecked = allTasks.every((item) => item.checked);

    if (exist.length === 0 && selectedTaskKey) {
      setSelectedTaskKey('');
      return;
    }

    if (allChecked) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }

    const newItems = selected.map((item) => ({
      name: item.task.name,
      quantity: item.task.quantity ?? 1,
      discount: item.discount,
    }));

    setSelectedTaskKey('');
    return setFinalTasks(newItems);
  }, [allTasks]);

  const handleCheckAll = (checked: boolean) => {
    if (checked === true) {
      setAllTasks((prev) =>
        prev.map((item) => ({
          ...item,
          checked: true,
        }))
      );
      setIsAllChecked(true);
    } else {
      setAllTasks((prev) =>
        prev.map((item) => ({
          ...item,
          checked: false,
        }))
      );
      setIsAllChecked(false);
    }
  };

  const toggleCheckbox = (key: string) => {
    setAllTasks((prev) =>
      prev.map((item) => (item.key === key ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleDiscountInput = (key: string, value: string) => {
    const sanitized = value.replace(/^0+(?!$)/, ''); // Remove leading zeros

    if (/^\d*$/.test(sanitized)) {
      const input = Number(sanitized);

      const updatedTasks = allTasks.map((item) => {
        if (item.key !== key) return item;

        const quantity = item.task.quantity ?? 1;
        const maxAllowed = item.task.price * quantity * 0.1;

        if (input > maxAllowed) {
          toast.error('Discount cannot exceed 10% of total');
          return item; // return the original item if validation fails
        }

        return {
          ...item,
          discount: input,
          subTotal: item.task.price * quantity - input,
        };
      });

      setAllTasks(updatedTasks);
    }
  };

  return (
    <div className="bg-white shadow-md mb-8 overflow-hidden border mt-8 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-100 text-gray-700 text-sm font-medium">
          <tr className="px-4">
            <th className="text-left px-3 py-3">
              <input
                type="checkbox"
                className="checkbox cursor-pointer"
                checked={isAllChecked}
                onChange={(e) => {
                  handleCheckAll(e.target.checked);
                }}
              />
            </th>
            <th className="text-left px-3 py-3">Item</th>
            <th className="text-left px-3 py-3">Category</th>
            <th className="text-right px-3 py-3">Qty</th>
            <th className="text-right px-3 py-3">Unit Cost</th>
            <th className="text-right px-3 py-3">Discount</th>
            <th className="text-right px-3 py-3">Total</th>
            <th className=" px-3 py-3 relative group">Receipt</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {allTasks.map(({ key, task, category, discount, subTotal, checked, bill_id }) => {
            const quantity = task.quantity ?? 1;
            return (
              <tr key={key} className="border-t px-4">
                <td className="px-3 py-4">
                  <input
                    type="checkbox"
                    className="checkbox cursor-pointer"
                    checked={task?.bill === 'paid' ? true : checked}
                    disabled={task?.bill === 'paid'}
                    onChange={() => toggleCheckbox(key)}
                  />
                </td>

                <td className="px-3 py-4 font-medium">{task.name}</td>
                <td className="px-3 py-4">{category}</td>
                <td className="px-3 py-4 text-right">{quantity}</td>
                <td className="px-3 py-4 text-right">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(task.price)}
                </td>
                <td className="px-4 py-4 text-right">
                  {task.discountable ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      value={discount === 0 ? '' : discount}
                      onChange={(e) => {
                        setSelectedTaskKey(key);
                        handleDiscountInput(key, e.target.value);
                      }}
                      className="w-[70px] border px-1 rounded"
                      placeholder={`Max 10%`}
                      disabled={task?.bill === 'paid'}
                    />
                  ) : (
                    'N/A'
                  )}
                </td>
                <td className="px-3 py-4 text-right">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                  }).format(subTotal)}
                </td>
                <td
                  className="text-right px-3 py-3 relative "
                  onClick={() => selectedReceipt(bill_id, task?.name)}
                >
                  <Download
                    size={18}
                    className={`m-auto 
                    ${task?.bill === 'paid' ? 'text-green-500 cursor-pointer' : 'text-gray-500'}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
