'use client';

import PatientDetailsHeader from '../../organisms/patients/patient-details-header';
import PatientDetailsNav from '../../organisms/patients/patients-details-nav';

export default function PatientDetails() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div>
        <PatientDetailsHeader />
        <PatientDetailsNav />
      </div>
    </div>
  );
}
