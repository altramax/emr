'use client';

import { useRouter } from 'next/navigation';
import {
  HeartPulse,
  Stethoscope,
  ClipboardList,
  FlaskConical,
  TestTube2,
  Pill,
  Syringe,
  CreditCard,
  Minus,
} from 'lucide-react';

type PatientNavProps = {
  isOpen: boolean;
  params: string;
};

const PatientNav = ({ isOpen, params }: PatientNavProps) => {
  const router = useRouter();
  const tabs = [
    { name: 'Vitals', icon: <HeartPulse size={18} /> },
    { name: 'Diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Prescriptions', icon: <ClipboardList size={18} /> },
    { name: 'Lab Orders', icon: <FlaskConical size={18} /> },
    { name: 'Lab Results', icon: <TestTube2 size={18} /> },
    { name: 'Dispensed Medications', icon: <Pill size={18} /> },
    { name: 'Administered Medications', icon: <Syringe size={18} /> },
    { name: 'BILLING', icon: <CreditCard size={18} /> },
  ];

  if (!isOpen) return null;

  return (
    <div className="mt-6 text-white">
      <div className="flex flex-col gap-3 border-l border-gray-200 pb-3 ml-4">
        {tabs.map((tab) => {
          return (
            <div className={` flex items-center justify-start `} key={tab.name}>
              <Minus size={18} />
              <button
                key={tab.name}
                className={`w-full px-4 py-2 flex items-center hover:bg-blue-500 rounded-md gap-2
                ${params.includes(tab.name.toLowerCase()) && 'bg-blue-500 text-white'}`}
                onClick={() => router.push(`/patients/${tab.name.toLowerCase()}`)}
              >
                {tab.icon}
                {tab.name}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientNav;
