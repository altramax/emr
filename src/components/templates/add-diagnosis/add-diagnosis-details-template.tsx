'use client';

import { useEffect, useState } from 'react';
import PatientDetailsHeader from '@/src/components/organisms/patient-care/patient-care-details-header';
import { useGetDiagnosis } from '@/src/hooks/diagnosis/use-get-diagnosis';
import { useParams } from 'next/navigation';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import AddDiagnosisTab from '@/src/components/organisms/patient-care/add-diagnosis/tabs/add-diagnosis-tab';
import Button from '@/src/components/atoms/button/button';
import OrdersTab from '@/src/components/organisms/patient-care/add-diagnosis/tabs/orders-tab';
import VitalsViewTab from '@/src/components/organisms/patient-care/add-diagnosis/tabs/view-vitals-tab';
import { Stethoscope, ClipboardList, HeartPulse, MessageCircleReply, Plus } from 'lucide-react';
import Results from '@/src/components/organisms/patient-care/add-diagnosis/tabs/results-tab';

export default function AddDiagnosisDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';
  const [currentTab, setCurrentTab] = useState('Orders');

  const { getDiagnosis, data, loading } = useGetDiagnosis({
    select: '*',
    filter: id,
    status: 'pending',
  });

  useEffect(() => {
    getDiagnosis();
  }, []);

  if (loading) return <Loading />;

  const tabs = [
    { name: 'Add Diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Vitals', icon: <HeartPulse size={18} /> },
    { name: 'Orders', icon: <Plus size={18} /> },
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
          <VitalsViewTab
            visit_id={data ? data[0]?.visit_id : null}
            id={data ? data[0]?.patient?.id : null}
          />
        );
      case 'Orders':
        return <OrdersTab data={data ? data[0] : null} />;
      case 'Results':
        return <Results results={data ? data[0] : null} />;
      case 'History':
        return <div>History</div>;
      default:
        return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <PatientDetailsHeader data={data ? data[0] : null} back_path="/patients/add-diagnosis" />
      <div className="mt-6 text-white bg-white rounded-lg px-10 py-4">
        <div className="flex items-center gap-14 border-b border-gray-200 pb-3">
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
            <AddDiagnosisTab data={data ? data[0] : null} />
          </div>
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
