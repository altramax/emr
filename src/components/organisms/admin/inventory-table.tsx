interface PatientCareTableProps {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  items: Record<string, any>[];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  department: any;
}

export default function InventoryTable({ items, department }: PatientCareTableProps) {
  console.log(department);
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left text-xs text-gray-600">
          <th className="px-4 py-2">Name</th>
          <th className="px-4 py-2">Department</th>
          <th className="px-4 py-2">Type</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Unit of measure</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item: any, index) => (
          <tr
            key={index + 1}
            className="border-b text-xs cursor-pointer"
            // onClick={() => navigateToitemDetails(item?.id)}
          >
            <td className="p-4 flex items-center gap-4">
              {`${item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}`}
            </td>
            <td className="p-4">
              {department?.map((dept: any) => {
                if (item.department_id === dept.value) return dept.label;
              })}
            </td>
            <td className="p-4">{item?.type}</td>
            <td className="p-4">
              {item?.unit_price &&
                new Intl.NumberFormat('en-NG', {
                  style: 'currency',
                  currency: 'NGN',
                }).format(item?.unit_price)}
            </td>
            <td className="p-4">{item?.unit_of_measure}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
