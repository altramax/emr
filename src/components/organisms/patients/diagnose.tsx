'use client';

import { useState } from 'react';

export default function Diagnose() {
  const [patientName, setPatientName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [observations, setObservations] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [prescription, setPrescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetForm = () => {
    setPatientName('');
    setSymptoms('');
    setObservations('');
    setDiagnosis('');
    setPrescription('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Patient Diagnosis Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            className="text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            // value={patientName}
            // onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Symptoms</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={3}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Observations</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={observations}
            onChange={(e) => setObservations(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Diagnosis</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Prescription</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
            rows={3}
          ></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Submit Diagnosis
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </form>

      {submitted && (
        <div className="mt-8 p-4 bg-green-100 border border-green-300 rounded-md">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Diagnosis Submitted</h3>
          <p>
            <strong>Patient Name:</strong> {patientName}
          </p>
          <p>
            <strong>Symptoms:</strong> {symptoms}
          </p>
          <p>
            <strong>Observations:</strong> {observations}
          </p>
          <p>
            <strong>Diagnosis:</strong> {diagnosis}
          </p>
          <p>
            <strong>Prescription:</strong> {prescription}
          </p>
        </div>
      )}
    </div>
  );
}
