'use client';

import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, User2 } from 'lucide-react';
import { useGetData } from '@/src/hooks/get-data-hook';
import { useEffect } from 'react';
import { useInsertData } from '@/src/hooks/insert-data-hook';

type PatientInfoRowProps = {
  label: string;
  value: string | undefined;
};

const PatientInfoRow = ({ label, value }: PatientInfoRowProps) => (
  <div className="flex justify-between items-center gap-6 border-b border-gray-200 pb-2">
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="font-medium text-gray-700 text-wrap text-end">{value ?? 'Not specified'}</p>
  </div>
);

const InitiateEncounterTemplate = () => {
  const router = useRouter();
  const param = useParams();
  const id = param?.detailsId ?? '';

  const { getData, data } = useGetData({
    tableName: 'patients',
    select: '*',
    id: id,
  });

  const { insertData, data: newData } = useInsertData({
    tableName: 'medical_records',
    columns: {
      patient_id: id,
      status: 'open',
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const patientInfo = data ? data[0] : null;

  console.log(newData);

  return (
    <div className="px-10 py-4 flex flex-col gap-4 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <button
          className="flex items-center text-blue-600 hover:text-blue-700 gap-2 transition-colors"
          onClick={() => router.push('/records')}
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back</span>
        </button>

        <button
          className="flex items-center gap-2 text-sm px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-all"
          onClick={insertData}
        >
          Start Encounter
        </button>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="flex justify-between items-start gap-6 mt-6">
        <div className="flex flex-col items-center gap-3 w-[20%]">
          <div className="w-[150px] h-[150px] rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 shadow-sm">
            <User2 size={48} />
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
        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[35%]">
          <h3 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 py-2">
            Personal Information
          </h3>
          <PatientInfoRow
            label="Name"
            value={`${patientInfo?.first_name} ${patientInfo?.last_name}`}
          />
          <PatientInfoRow label="Gender" value={patientInfo?.gender} />
          <PatientInfoRow label="Date of Birth" value={patientInfo?.date_of_birth} />
          <PatientInfoRow label="Marital Status" value={patientInfo?.marital_status} />
          <PatientInfoRow label="Occupation" value={patientInfo?.occupation} />
          <PatientInfoRow label="Religion" value={patientInfo?.religion} />
        </div>

        {/* Contact Information Section */}
        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm w-[35%]">
          <h3 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 py-2">
            Contact Information
          </h3>
          <PatientInfoRow label="Phone Number" value={patientInfo?.phone_number} />
          <PatientInfoRow label="Email" value={patientInfo?.email} />
          <PatientInfoRow label="Address" value={patientInfo?.address} />
          <PatientInfoRow label="Emergency Contact" value={patientInfo?.emergency_contact_name} />
          <PatientInfoRow label="Emergency Phone" value={patientInfo?.emergency_contact_number} />
          <PatientInfoRow
            label="Relationship"
            value={patientInfo?.emergency_contact_relationship}
          />
        </div>
      </div>

      {/* Medical Information Section */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 py-2">
            Medical Details
          </h3>
          <PatientInfoRow label="Blood Group" value={patientInfo?.blood_group} />
          <PatientInfoRow label="Genotype" value={patientInfo?.genotype} />
          <PatientInfoRow label="Allergies" value={patientInfo?.allergies} />
        </div>

        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 py-2">
            Health Status
          </h3>
          <PatientInfoRow label="Existing Conditions" value={patientInfo?.existing_conditions} />
          <PatientInfoRow label="Current Medications" value={patientInfo?.current_medications} />
        </div>

        <div className="flex flex-col gap-2 border rounded-lg border-gray-100 p-4 bg-gray-50 shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2 border-b border-gray-200 py-2">
            System Information
          </h3>
          <PatientInfoRow
            label="Registration Date"
            value={new Date(patientInfo?.created_at).toLocaleDateString()}
          />
          <PatientInfoRow label="Patient ID" value={patientInfo?.id} />
        </div>
      </div>
    </div>
  );
};

export default InitiateEncounterTemplate;
