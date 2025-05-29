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
  Minus,
} from 'lucide-react';

type PatientNavProps = {
  isOpen: boolean;
  params: string;
};

const PatientNav = ({ isOpen, params }: PatientNavProps) => {
  const router = useRouter();
  const tabs = [
    { name: 'Vitals', path: '/patients/vitals', icon: <HeartPulse size={18} /> },
    { name: 'Diagnosis', path: '/patients/diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Prescriptions', path: '/patients/prescriptions', icon: <ClipboardList size={18} /> },
    { name: 'Lab Orders', path: '/patients/lab-orders', icon: <FlaskConical size={18} /> },
    { name: 'Lab Results', path: '/patients/lab-results', icon: <TestTube2 size={18} /> },
    { name: 'Dispensed Meds', path: '/patients/dispensed-meds', icon: <Pill size={18} /> },
    { name: 'Administered Meds', path: '/patients/administered-meds', icon: <Syringe size={18} /> },
  ];

  if (!isOpen) return null;

  return (
    <div className=" text-white">
      <div className="flex flex-col gap-3 border-l border-gray-200 pb-3 ml-4">
        {tabs.map((tab) => {
          return (
            <div className={` flex items-center justify-start `} key={tab.name}>
              <Minus size={18} />
              <button
                key={tab.name}
                className={`w-full px-4 py-2 flex items-center hover:bg-blue-500 rounded-md gap-2
                ${params.includes(tab.name.toLowerCase()) && 'bg-blue-500 text-white'}`}
                onClick={() => router.push(tab.path)}
              >
                {tab.icon}
                {tab.name}
              </button>
            </div>
          );
        })}
      </div>
      {/* <div className="border-b border-gray-200 my-6"></div>   */}
    </div>
  );
};

export default PatientNav;
