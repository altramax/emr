type RoleBarProps = {
  role:
    | 'doctor'
    | 'nurse'
    | 'lab_attendant'
    | 'pharmacist'
    | 'radiologist'
    | 'cashier'
    | 'receptionist'
    | 'admin'
    | 'super_admin'
    | 'patient';
};

export default function RoleBar({ role }: RoleBarProps) {
  const renderRole = () => {
    switch (role) {
      case 'doctor':
        return (
          <div className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs w-fit">
            Doctor
          </div>
        );
      case 'nurse':
        return (
          <div className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs w-fit">
            Nurse
          </div>
        );
      case 'lab_attendant':
        return (
          <div className="bg-purple-100 text-purple-700 rounded-full px-2 py-1 text-xs w-fit">
            Lab Attendant
          </div>
        );
      case 'pharmacist':
        return (
          <div className="bg-teal-100 text-teal-700 rounded-full px-2 py-1 text-xs w-fit">
            Pharmacist
          </div>
        );
      case 'radiologist':
        return (
          <div className="bg-pink-100 text-pink-700 rounded-full px-2 py-1 text-xs w-fit">
            Radiologist
          </div>
        );
      case 'cashier':
        return (
          <div className="bg-yellow-100 text-yellow-700 rounded-full px-2 py-1 text-xs w-fit">
            Cashier
          </div>
        );
      case 'receptionist':
        return (
          <div className="bg-orange-100 text-orange-700 rounded-full px-2 py-1 text-xs w-fit">
            Receptionist
          </div>
        );
      case 'admin':
        return (
          <div className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs w-fit">
            Admin
          </div>
        );
      case 'super_admin':
        return (
          <div className="bg-indigo-700 text-white rounded-full px-2 py-1 text-xs w-fit font-semibold shadow-md">
            Super Admin
          </div>
        );
      case 'patient':
        return (
          <div className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs w-fit">
            Patient
          </div>
        );

      default:
        return (
          <div className="bg-gray-100 text-black rounded-full px-2 py-1 text-xs w-fit">
            Unknown Role
          </div>
        );
    }
  };

  return <div>{renderRole()}</div>;
}
