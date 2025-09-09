'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import PatientInfoRow from '../../molecules/patient-info-row/patient-info-row';
import { useQueryData } from '@/src/hooks/use-query-data';
import { useGetData } from '@/src/hooks/use-get-data';
import { useInsertData } from '@/src/hooks/use-insert-data';
import Avatar from '../../atoms/Avatar/Avatar';
import StatusBar from '../../molecules/status-bar/status-bar';

const StartConsultationTemplate = () => {
  const router = useRouter();
  const param = useParams();
  const id = param?.detailsId ?? '';

  const {
    getData: getPatient,
    data,
    loading,
  } = useGetData({
    table: 'patients',
    select: '*',
    params: [
      {
        column: 'id',
        value: id,
      },
    ],
  });

  const patientInfo = data ? data[0] : '';

  const { queryData, data: visitData } = useQueryData({
    table: 'visits',
    select: '*',

    params: [
      {
        column: 'patient_id',
        value: patientInfo?.patient_id,
      },
      {
        column: 'status',
        value: 'open',
      },
    ],
  });

  const visit = visitData ? visitData[0] : null;

  const { insertData: insertVisit } = useInsertData({
    table: 'visits',
    params: {
      patient_id: patientInfo?.patient_id,
      status: 'open',
    },
  });

  useEffect(() => {
    getPatient();
  }, []);

  useEffect(() => {
    if (data) {
      queryData();
    }
  }, [data]);

  const StartConsultationHandler = async () => {
    const response = await insertVisit();
    if (response === 'success') {
      console.log('success');
      queryData();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className=" p-5 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-4">
          <button
            className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
            onClick={() => router.push('/records')}
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back</span>
          </button>
          <p className="px-4 text-blue-600 text-sm font-medium ">{patientInfo?.id}</p>
        </div>

        {visit?.status !== 'open' && (
          <Button
            className="flex items-center gap-2 text-xs px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
            onClick={StartConsultationHandler}
            loading={loading}
            value="Start Consultation"
          />
        )}

        {visit?.status === 'open' && (
          <div className="flex items-center gap-2 text-xs px-5 py-2 bg-green-600 text-white rounded-md shadow-sm transition-all">
            Consultation in Progress
          </div>
        )}
      </div>
      <div className="border-t border-gray-200"></div>

      <div className="flex justify-between items-start gap-6 mt-6">
        <div className="flex flex-col items-center gap-2 w-[20%]">
          <div className="w-[90px] h-[90px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            {patientInfo.first_name && patientInfo.last_name ? (
              <Avatar
                firstname={patientInfo.first_name}
                lastname={patientInfo.last_name}
                size={100}
              />
            ) : (
              <User2 size={40} />
            )}
          </div>

          <StatusBar status={patientInfo.status} />
        </div>

        {/* Personal Information Section */}
        <div className="flex flex-col border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[35%]">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 py-2">
            Personal information
          </h3>
          <PatientInfoRow
            label="Name"
            value={`${patientInfo?.first_name} ${patientInfo?.last_name}`}
          />
          <PatientInfoRow label="Gender" value={patientInfo?.gender} />
          <PatientInfoRow label="Date of birth" value={patientInfo?.date_of_birth} />
          <PatientInfoRow label="Marital status" value={patientInfo?.marital_status} />
          <PatientInfoRow label="Occupation" value={patientInfo?.occupation} />
          <PatientInfoRow label="Religion" value={patientInfo?.religion} />
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[40%]">
          <h3 className="text-sm font-semibold text-gray-700 border-b border-gray-200 py-2">
            Contact information
          </h3>
          <PatientInfoRow label="Phone number" value={patientInfo?.phone_number} />
          <PatientInfoRow label="Email" value={patientInfo?.email} />
          <PatientInfoRow label="Address" value={patientInfo?.address} />
          <PatientInfoRow label="Emergency contact" value={patientInfo?.emergency_contact_name} />
          <PatientInfoRow label="Emergency phone" value={patientInfo?.emergency_contact_number} />
          <PatientInfoRow
            label="Emergency contact relationship"
            value={patientInfo?.emergency_contact_relationship}
          />
        </div>
      </div>
    </div>
  );
};

export default StartConsultationTemplate;
