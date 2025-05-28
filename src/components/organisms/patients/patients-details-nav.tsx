'use client';

import React, { useState } from 'react';

import Vitals from './vitals';
import Diagnosis from './diagnosis';
import Prescriptions from './prescription';
import LabOrders from './lab-orders';
import LabResults from './lab-results';
import DispensedMeds from './dispensed-medication';
import AdministeredMeds from './administered-medication';
import Billing from './billing';
import {
  HeartPulse,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  TestTube2,
  Pill,
  Syringe,
  CreditCard,
} from 'lucide-react';

const tabs = [
  { name: 'Vitals', icon: <HeartPulse size={18} />, component: <Vitals /> },
  { name: 'Diagnosis', icon: <Stethoscope size={18} />, component: <Diagnosis /> },
  { name: 'Prescriptions', icon: <ClipboardList size={18} />, component: <Prescriptions /> },
  { name: 'Lab Orders', icon: <FlaskConical size={18} />, component: <LabOrders /> },
  { name: 'Lab Results', icon: <TestTube2 size={18} />, component: <LabResults /> },
  { name: 'Dispensed Medications', icon: <Pill size={18} />, component: <DispensedMeds /> },
  {
    name: 'Administered Medications',
    icon: <Syringe size={18} />,
    component: <AdministeredMeds />,
  },
  { name: 'BILLING', icon: <CreditCard size={18} />, component: <Billing /> },
];

const PatientDetailsNav = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="mt-6 text-white bg-white rounded-lg p-4">
      <div className="flex items-center gap-3 border-b border-gray-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`text-sm px-4 py-2 rounded-md flex items-center gap-2 font-medium transition-all duration-200 ${
              activeTab === tab.name
                ? 'bg-blue-50 text-blue-700 border border-blue-300 shadow-sm'
                : 'text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>
      <div
        className={`pt-6 ${activeTab !== 'Vitals' && 'hidden'}`}
        aria-hidden={activeTab !== 'Vitals'}
      >
        {' '}
        <Vitals />{' '}
      </div>
      <div
        className={`pt-6 ${activeTab !== 'Diagnosis' && 'hidden'}`}
        aria-hidden={activeTab !== 'Diagnosis'}
      >
        {' '}
        <Diagnosis />{' '}
      </div>
    </div>
  );
};

export default PatientDetailsNav;
