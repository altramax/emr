'use client';

import { useEffect, useState } from 'react';
import PatientDetailsHeader from '@/src/components/organisms/patient-care/patient-care-details-header';
import { useGetDiagnoses } from '@/src/hooks/diagnoses/use-get-diagnoses';
import { useParams } from 'next/navigation';
import LoadingBar from '@/src/components/atoms/loading-bar/loading-bar';
import AddDiagnoses from '@/src/components/organisms/patient-care/add-diagnoses/add-diagnoses';
import Button from '@/src/components/atoms/button/button';
import {
  Stethoscope,
  ClipboardList,
  FlaskConical,
  Pill,
  HeartPulse,
  MessageCircleReply,
} from 'lucide-react';
import VitalsViewTable from '@/src/components/organisms/patient-care/add-diagnoses/view-vitals-table';

export default function AddDiagnosesDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';
  const [currentTab, setCurrentTab] = useState('Add Diagnosis');

  const { getDiagnoses, data, loading } = useGetDiagnoses({
    select: '*',
    filter: id,
    status: 'pending',
  });

  useEffect(() => {
    getDiagnoses();
  }, []);

  if (loading) return <LoadingBar />;

  const tabs = [
    { name: 'Add Diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Vitals', icon: <HeartPulse size={18} /> },
    { name: 'Order Test', icon: <FlaskConical size={18} /> },
    { name: 'Order Medication', icon: <Pill size={18} /> },
    { name: 'Results', icon: <MessageCircleReply size={18} /> },
    { name: 'History', icon: <ClipboardList size={18} /> },
  ];

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderHeader = (tab: any) => {
    setCurrentTab(tab);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'Vitals':
        return (
          <VitalsViewTable
            visit_id={data ? data[0]?.visit_id : null}
            id={data ? data[0]?.patient?.id : null}
          />
        );
      case 'Order Test':
        return <div>Order Test</div>;
      case 'Order Medication':
        return <div>Order Medication</div>;
      case 'Results':
        return <div>Results</div>;
      case 'History':
        return <div>History</div>;
      default:
        return;
    }
  };

  console.log(id, data);
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PatientDetailsHeader data={data ? data[0] : null} back_path="/patients/add-diagnoses" />
      <div className="mt-6 text-white bg-white rounded-lg px-10 py-4">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          {tabs.map((tab) => {
            return (
              <Button
                onClick={() => renderHeader(tab?.name)}
                key={tab?.name}
                className={`${currentTab === tab?.name ? 'text-sm text-white bg-blue-500 rounded-lg px-4 py-2 font-medium' : 'text-gray-500 bg-white'}  text-xs flex justify-start items-center gap-2`}
                value={
                  <>
                    {tab?.icon}
                    {tab?.name}
                  </>
                }
              />
            );
          })}
        </div>
        <div className={`pt-6`}>
          <div className={`${currentTab === 'Add Diagnosis' ? 'block' : 'hidden'}`}>
            <AddDiagnoses />
          </div>
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
