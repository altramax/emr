'use client';

import React from 'react';

import AddVitals from './add-vitals';
import Diagnose from '../patients/diagnose';
// import Prescriptions from '../patients/prescription';
// import LabOrders from '../patients/lab-orders';
// import LabResults from '../patients/lab-results';
// import DispensedMeds from '../patients/dispensed-medication';
// import AdministeredMeds from '../patients/administered-medication';
// import Billing from '../patients/billing';
// import {
//   HeartPulse,
//   Stethoscope,
//   ClipboardList,
//   FlaskConical,
//   TestTube2,
//   Pill,
//   Syringe,
//   CreditCard,
// } from 'lucide-react';
import { usePathname } from 'next/navigation';

// const tabs = [
//   { name: 'Vitals', path: '/patients/add-vitals', icon: <HeartPulse size={18} /> },
//   { name: 'Diagnosis', path: '/patients/diagnosis', icon: <Stethoscope size={18} /> },
//   { name: 'Prescriptions', path: '/patients/prescriptions', icon: <ClipboardList size={18} /> },
//   { name: 'Lab Orders', path: '/patients/lab-orders', icon: <FlaskConical size={18} /> },
//   { name: 'Lab Results', path: '/patients/lab-results', icon: <TestTube2 size={18} /> },
//   {
//     name: 'Dispensed Medications',
//     path: '/patients/dispensed-medication',
//     icon: <Pill size={18} />,
//   },
//   {
//     name: 'Administered Medications',
//     path: '/patients/administered-medication',
//     icon: <Syringe size={18} />,
//   },
//   { name: 'BILLING', icon: <CreditCard size={18} />, component: <Billing /> },
// ];

const PatientDetailsBody = () => {
  const pathname = usePathname();

  return (
    <div className="mt-6 text-white bg-white rounded-lg p-4">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        <h2 className=" text-blue-700">
          {pathname?.split('/')[2].charAt(0).toUpperCase() + pathname?.split('/')[2].slice(1)}
        </h2>
      </div>
      <div className={`pt-6`}>{pathname?.includes('/patients/add-vitals') && <AddVitals />}</div>
      <div className={`pt-6`}>{pathname?.includes('/patients/diagnose') && <Diagnose />}</div>
    </div>
  );
};

export default PatientDetailsBody;
