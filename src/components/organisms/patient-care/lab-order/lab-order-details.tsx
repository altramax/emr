'use client';

import { useState, useEffect } from 'react';
import { TestTubeDiagonal } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';
import { toast } from 'react-toastify';
import Button from '@/src/components/atoms/button/button';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import RenderForm from './test/render-test-form';
import { useInsertLabResult } from '@/src/hooks/lab-test-result/use-insert-lab-result';
import { useQueryLabResult } from '@/src/hooks/lab-test-result/use-query-lab-result';
import dayjs from 'dayjs';
import Loading from '@/src/components/atoms/loading-bar/loading-bar';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import {
  cbcDefaultValue,
  basicmetabolicpanelDefaultValue,
  lipidpanelDefaultValue,
  thyroidtestDefaultValue,
  livertestDefaultValue,
  urinalysisDefaultValue,
  chestxrayDefaultValue,
  ecgDefaultValue,
  bloodglucoseDefaultValue,
  hba1cDefaultValue,
} from '@/src/utils/test-initial-values';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
};

const LabOrderDetails = ({ data }: vitalsType) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState('');
  const [testName, setTestName] = useState('');

  const {
    queryLabResult,
    data: queryData,
    loading: isResultLoading,
  } = useQueryLabResult({
    select: '*',
    test_name: testName,
  });

  useEffect(() => {
    if (testName) {
      console.log('ran');
      queryLabResult();
    }
  }, [testName]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const formDefaultObj: Record<string, any> = {
    completebloodcount: cbcDefaultValue,
    basicmetabolicpanel: basicmetabolicpanelDefaultValue,
    lipidpanel: lipidpanelDefaultValue,
    thyroidtests: thyroidtestDefaultValue,
    livertests: livertestDefaultValue,
    urinalysis: urinalysisDefaultValue,
    chestxray: chestxrayDefaultValue,
    ecg: ecgDefaultValue,
    bloodglucose: bloodglucoseDefaultValue,
    hba1c: hba1cDefaultValue,
  };

  const { control, getValues, reset, handleSubmit } = useForm({
    defaultValues: { status: { label: '', value: '' } },
    mode: 'onChange',
  });

  const values = getValues();
  const { status, ...result } = values;

  const submitData = {
    status: status?.value,
    patient_id: data?.patient_id,
    task_id: data?.id,
    visit_id: data?.visit_id,
    test_name: testName,
    result: result,
  };

  const { insertLabResult, error, loading } = useInsertLabResult({ columns: submitData });

  const submitForm = async () => {
    console.log(submitData);
    try {
      await insertLabResult();
      if (error) {
        toast.error('error saving test results');
      } else {
        toast.success('Test results saved successfully');
        handleIsConfirmationModalOpen();
      }
    } catch (err) {
      toast.error('Error saving test results');
      console.error(err, error);
    }
  };

  const handleIsConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(!isConfirmationModalOpen);
  };

  const renderConfirmationModal = () => {
    if (isConfirmationModalOpen) {
      return (
        <ConfirmationReviewModal
          isOpen={isConfirmationModalOpen}
          onCancel={handleIsConfirmationModalOpen}
          onConfirm={submitForm}
          title="Confirm Test Results Submission"
          formdata={{ ...submitData.result, Status: values?.status?.value }}
        />
      );
    }
  };

  const options = [
    { label: 'Pending', value: 'Pending' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  const initialStatus = queryData
    ? { label: queryData[0]?.status, value: queryData[0]?.status }
    : { label: 'Pending', value: 'pending' };

  const changeFormInView = (formKey: string) => {
    // if(values?.submit_status !== 'pending')

    //change this status to pick the actual status
    reset({ ...formDefaultObj[formKey], status: initialStatus });
    setCurrentForm(formKey);
  };

  // console.log(queryData);

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {renderConfirmationModal()}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm px-4 pt-4 py-5  border border-gray-100 h-[400px] overflow-auto no-scrollbar">
        <h2 className="text-sm font-semibold mb-4 text-blue-600">Lab Test Requests</h2>
        <div className="space-y-3">
          {data?.task_data.map((item: string, index: number) => {
            const formKey = item.replace(/\s+/g, '').toLowerCase();
            const status: any =
              data?.task_result && Object.entries(data?.task_result).find(([key]) => key === item);

            return (
              <button
                key={`${formKey}-${index}`}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all 
                  ${
                    currentForm === formKey
                      ? 'bg-blue-50 border border-blue-200 shadow-xs'
                      : 'hover:bg-gray-50 border border-gray-100'
                  }`}
                onClick={() => {
                  changeFormInView(formKey);
                  setTestName(item);
                }}
              >
                <TestTubeDiagonal size={18} className="text-blue-500 flex-shrink-0" />
                <div className="text-left overflow-hidden">
                  <p className="font-medium text-gray-800 truncate text-sm">{item}</p>
                  <p className="text-xs text-gray-500 mb-4">
                    {dayjs(data?.created_at).format('h:mm A · DD-MM-YY')}
                  </p>
                  <div className="">
                    {<StatusBar status={status ? status[1]?.toLowerCase() : 'pending'} />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="relative flex-1 bg-white rounded-lg shadow-sm p-6 border border-gray-100"
      >
        {isResultLoading ? (
          <Loading />
        ) : (
          <>
            {currentForm ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {testName
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/(^|\s)\S/g, (l) => l.toUpperCase())
                        .trim()}
                      Test
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      Record all required values for this test
                    </p>
                  </div>
                  <div className="w-[150px]">
                    <SelectDropdown
                      control={control}
                      name="status"
                      options={options}
                      label="Test Status"
                      defaultValue={initialStatus}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <RenderForm control={control} form={currentForm} />
                </div>

                <div className="w-full">
                  <Button
                    type="button"
                    onClick={handleIsConfirmationModalOpen}
                    disabled={loading}
                    className={`absolute bottom-6 right-6 mt-auto px-6 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    loading={loading}
                    value={'Save'}
                  />
                </div>
              </>
            ) : (
              <div className=" flex flex-col items-center justify-center h-64 text-gray-500">
                <TestTubeDiagonal size={48} className="mb-4 text-gray-300" />
                <p className="text-lg mb-2">No test selected</p>
                <p className="text-sm text-gray-400">Choose a test from the left panel to begin</p>
              </div>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default LabOrderDetails;
