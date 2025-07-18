'use client';

'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import { useGetPatients } from '@/src/hooks/patient/use-get-patients';
import { useEffect } from 'react';
import Button from '../../atoms/button/button';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-page';
import PatientInfoRow from '../../molecules/patient-info-row/patient-info-row';

const PatientDetailsTemplate = () => {
  const router = useRouter();
  const param = useParams();
  const id = param?.details ?? '';

  const { getPatient, data, loading } = useGetPatients({
    select: '*',
    id: id,
  });
  const patientInfo = data ? data[0] : '';

  useEffect(() => {
    getPatient();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="px-10 py-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
          onClick={() => router.push('/patients')}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>
        <Button
          className="flex items-center gap-2 text-xs px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
          loading={loading}
          value="Edit"
          onClick={() => router.push(`/patients/edit-patient/${patientInfo?.id}`)}
        />
      </div>
      <div className="border-t border-gray-200"></div>

      <div className="flex justify-between items-start gap-6 mt-6">
        <div className="flex flex-col items-center gap-3 w-[15%]">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            <User2 size={38} />
          </div>
          <span
            className={`px-4 py-1 rounded-full text-sm font-medium shadow-sm ${
              patientInfo?.status === 'admitted'
                ? 'text-green-700 bg-green-100'
                : 'text-blue-700 bg-blue-100'
            }`}
          >
            {patientInfo?.status ?? 'Active'}
          </span>
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

export default PatientDetailsTemplate;
