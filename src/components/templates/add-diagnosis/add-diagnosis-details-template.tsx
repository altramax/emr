'use client';

import { useEffect, useState } from 'react';
import DiagnosisHeader from '../../organisms/add-diagnosis/diagnosis-header';
import { useGetDiagnosis } from '@/src/hooks/diagnosis/use-get-diagnosis';
import { useParams } from 'next/navigation';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import AddDiagnosisTab from '@/src/components/organisms/add-diagnosis/tabs/add-diagnosis-tab';
import Button from '@/src/components/atoms/button/button';
import VitalsViewTab from '@/src/components/organisms/add-diagnosis/tabs/view-vitals-tab';
import Medications from '@/src/components/organisms/add-diagnosis/tabs/medication-orders-tab';
import { Stethoscope, ClipboardList, FlaskConical, Pill } from 'lucide-react';
import TestTab from '../../organisms/add-diagnosis/tabs/test-tab';

export default function AddDiagnosisDetailsTemplate() {
  const param = useParams();
  const id = param?.detailsId ?? '';
  const [currentTab, setCurrentTab] = useState('Add Diagnosis');

  const { getDiagnosis, data, loading, refetch } = useGetDiagnosis({
    select: '*',
    filter: id,
  });

  useEffect(() => {
    getDiagnosis();
  }, [data?.[0]?.status]);

  const tabs = [
    { name: 'Add Diagnosis', icon: <Stethoscope size={18} /> },
    { name: 'Test', icon: <FlaskConical size={18} /> },
    { name: 'Medication', icon: <Pill size={18} /> },
    { name: 'Patient history', icon: <ClipboardList size={18} /> },
  ];

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const renderHeader = (tab: any) => {
    setCurrentTab(tab);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'Test':
        return <TestTab data={data ? data[0] : null} />;
      case 'Medication':
        return <Medications />;
      case 'Patient history':
        return <div>History</div>;
      default:
        return;
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex gap-4 min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col gap-4">
        <DiagnosisHeader
          data={data ? data[0] : null}
          back_path="/add-diagnosis"
          diagnosisStatus={data?.[0]?.status ?? null}
          refetch={getDiagnosis}
        />
      </div>
      <div className="w-full">
        <VitalsViewTab
          visit_id={data ? data[0]?.visit_id : null}
          id={data ? data[0]?.patient?.id : null}
        />
        <div className="mt-4 text-white bg-white rounded-lg py-4 px-5">
          <div className="flex items-center gap-6 border-b border-gray-200">
            {tabs.map((tab) => {
              return (
                <Button
                  onClick={() => renderHeader(tab?.name)}
                  key={tab?.name}
                  className={`${currentTab === tab?.name ? 'text-sm text-blue-500 px-4 py-2 font-medium border-b-2 border-blue-500' : 'text-gray-500'}  text-xs flex justify-start items-center gap-2`}
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

          <div className={`pt-6 min-h-[62vh] overflow-auto`}>
            <div className={`${currentTab === 'Add Diagnosis' ? 'block' : 'hidden'}`}>
              <AddDiagnosisTab data={data ? data[0] : null} refetch={refetch} />
            </div>
            <div>{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
