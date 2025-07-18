type receiptDataType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  receiptData: any;
  Ref: any;
};

export default function ReceiptLayout({ receiptData, Ref }: receiptDataType) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const se = date.getTime().toLocaleString();

  console.log(receiptData);

  const receiptDate = `${day}-${month}-${year}`;
  const receiptTime = `${se}`;

  return (
    <div
      id="receipt"
      className="w-[720px] mx-auto bg-white text-black text-sm p-6 rounded-md border border-gray-300 shadow-md font-sans"
      style={{ fontFamily: 'Arial, sans-serif' }}
      ref={Ref}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="">
          <div className="flex gap-2 items-center mt-2">
            <div className="bg-white text-blue-600 rounded flex items-center justify-center p-2 pt-0 px-1">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.24 23.84c-.04 0-.04 0-.08 0-.4-.04-.72-.36-.76-.76l-1-9.96-.88 2.72c-.12.36-.44.56-.8.56H.84A.83.83 0 0 1 0 15.6c0-.44.36-.84.84-.84h5.32l1.92-6c.12-.36.48-.6.88-.56s.68.36.72.76l.96 9.72 2.04-6.96c.12-.36.4-.6.8-.6.36 0 .68.28.8.64l1.12 4.84.84-1.24c.16-.24.4-.36.68-.36h5.28c.44 0 .84.36.84.84s-.36.84-.84.84h-4.84l-1.64 2.44c-.2.28-.52.4-.84.36s-.6-.32-.64-.64l-.84-3.6-2.36 8.08c-.12.28-.44.52-.8.52z"
                  fill="#1E40AF"
                />
              </svg>
            </div>
            <h1 className="text-lg font-bold">LiLy HealthCare</h1>
          </div>
          <p className="text-xs text-gray-500 text-end">Plot 42, Medical Way, Lagos</p>
        </div>

        <div className="text-right text-xs text-gray-600">
          <p>
            <strong>Date:</strong> {receiptDate}
          </p>
          <p>
            <strong>Time:</strong> {receiptTime}
          </p>
          <p>
            <strong>Receipt No:</strong> RCP-20250712-02
          </p>
        </div>
      </div>

      <hr className="mb-4 border-gray-300" />

      {/* Patient Info */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Patient Information</h3>
        <div className="grid grid-cols-2 gap-y-1 text-xs">
          <p>
            <strong>Full Name:</strong> Ezekiel Opeyemi
          </p>
          <p>
            <strong>Patient ID:</strong> HSP-1021
          </p>
          <p>
            <strong>Visit ID:</strong> VS-3298
          </p>
          <p>
            <strong>Gender:</strong> Male
          </p>
        </div>
      </div>

      {/* Billing Table */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Billed Items</h3>
        <table className="w-full border text-xs">
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border text-left">Item</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Discount</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-800">
              <td className="p-2 border text-center">1</td>
              <td className="p-2 border">CBC Test</td>
              <td className="p-2 border text-center">₦5,000</td>
              <td className="p-2 border text-center">₦0</td>
              <td className="p-2 border text-center font-semibold">₦5,000</td>
            </tr>
            <tr className="text-gray-800">
              <td className="p-2 border text-center">2</td>
              <td className="p-2 border">Chest X-Ray</td>
              <td className="p-2 border text-center">₦8,000</td>
              <td className="p-2 border text-center">₦1,000</td>
              <td className="p-2 border text-center font-semibold">₦7,000</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="text-right text-sm mb-6">
        <p className="mb-1">
          <strong>Subtotal:</strong> ₦13,000
        </p>
        <p className="mb-1">
          <strong>Amount Paid:</strong> ₦10,000
        </p>
        <p className="text-red-600 font-bold">
          <strong>Balance:</strong> ₦3,000
        </p>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 border-t pt-3">
        <p>This is a system-generated receipt. No signature is required.</p>
        <p>Thank you for choosing Lifeline Medical Center.</p>
      </div>
    </div>
  );
}
