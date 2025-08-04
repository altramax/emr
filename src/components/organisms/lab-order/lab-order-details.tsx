'use client';

import { useState, useEffect } from 'react';
import { FlaskConical, MessageCircleWarning } from 'lucide-react';
import { useForm } from 'react-hook-form';
import ConfirmationReviewModal from '@/src/components/molecules/confirmation-review-modal/confirmation-review-modal';
import { toast } from 'react-toastify';
import Button from '@/src/components/atoms/button/button';
import SelectDropdown from '@/src/components/molecules/select-dropdown/select-dropdown';
import RenderForm from './test/render-test-form';
import { useInsertLabResult } from '@/src/hooks/lab-test-result/use-insert-lab-result';
import { useQueryLabResult } from '@/src/hooks/lab-test-result/use-query-lab-result';
import dayjs from 'dayjs';
import Loading from '@/src/components/atoms/loading-bar/loading-bar-section';
import StatusBar from '@/src/components/molecules/status-bar/status-bar';
import { useUpdateLabResult } from '@/src/hooks/lab-test-result/use-update-lab-result';
import {
  cbcDefaultValue,
  basicmetabolicpanelDefaultValue,
  thyroidtestDefaultValue,
  livertestDefaultValue,
  urinalysisDefaultValue,
  chestxrayDefaultValue,
  ecgDefaultValue,
  bloodglucoseDefaultValue,
  hba1cDefaultValue,
  hivAntibodyDefaultValue,
  malariaParasiteDefaultValue,
  widalTestDefaultValue,
  hbsagTestDefaultValue,
  hcvAntibodyDefaultValue,
  vdrlTestDefaultValue,
  pregnancyTestDefaultValue,
  prolactinDefaultValue,
  troponinITestDefaultValue,
  ddimerDefaultValue,
  ptinrDefaultValue,
  abdominalUltrasoundDefaultValue,
  pelvicUltrasoundDefaultValue,
  ctScanHeadDefaultValue,
  mriBrainDefaultValue,
  lipidprofileDefaultValue,
} from '@/src/utils/test-initial-values';
import PriorityBar from '@/src/components/molecules/priority-bar/priority-bar';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  refetch: () => void;
};

const LabOrderDetails = ({ data, refetch }: vitalsType) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState<boolean>(false);
  const [currentForm, setCurrentForm] = useState('');
  const [testName, setTestName] = useState('');

  const {
    queryLabResult,
    data: queryData,
    loading: isResultLoading,
    refetch: refetchLabResult,
  } = useQueryLabResult({
    select: '*',
    test_name: testName,
    task_id: data ? data?.id : '',
  });

  useEffect(() => {
    if (testName) {
      queryLabResult();
    }
  }, [testName]);

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const formDefaultObj: Record<string, any> = {
    'completebloodcount(cbc)': cbcDefaultValue,
    basicmetabolicpanel: basicmetabolicpanelDefaultValue,
    lipidprofileDefaultValue: lipidprofileDefaultValue,
    thyroidfunctiontests: thyroidtestDefaultValue,
    'liverfunctiontest(lft)': livertestDefaultValue,
    urinalysis: urinalysisDefaultValue,
    'chestx-ray': chestxrayDefaultValue,
    ecg: ecgDefaultValue,
    bloodglucosefasting: bloodglucoseDefaultValue,
    hemoglobina1c: hba1cDefaultValue,
    'hiv1+2antibody': hivAntibodyDefaultValue,
    malariaparasitetest: malariaParasiteDefaultValue,
    widaltest: widalTestDefaultValue,
    hbsagtest: hbsagTestDefaultValue,
    hcvantibodytest: hcvAntibodyDefaultValue,
    vdrltest: vdrlTestDefaultValue,
    'pregnancytest(β-hcg)': pregnancyTestDefaultValue,
    prolactin: prolactinDefaultValue,
    troponini: troponinITestDefaultValue,
    'd-dimer': ddimerDefaultValue,
    'pt/inr': ptinrDefaultValue,
    abdominalultrasound: abdominalUltrasoundDefaultValue,
    pelvicultrasound: pelvicUltrasoundDefaultValue,
    'ctscanhead(withcontrast)': ctScanHeadDefaultValue,
    'mribrain(withoutcontrast)': mriBrainDefaultValue,
  };

  const { control, getValues, reset, handleSubmit, setValue } = useForm({
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
    ordered_at: data?.created_at,
  };

  // const selectedData = queryData
  //   ? queryData.filter((item: any) => item.test_name === testName)[0]
  //   : null;

  const { insertLabResult, error, loading } = useInsertLabResult({ columns: submitData });
  const {
    updateLabResult,
    error: updateError,
    loading: updateLoading,
  } = useUpdateLabResult({
    columns: submitData,
    id: queryData ? queryData[0]?.id : '',
  });

  const submitForm = async () => {
    if (!submitData?.status) {
      toast.error('Please select a status before submitting');
      return;
    }

    if (submitData?.status === 'Pending') {
      toast.error('Please update status before submitting');
      return;
    }

    try {
      if (queryData[0]?.id) {
        await updateLabResult();
        if (updateError) {
          toast.error('error saving test results');
        } else {
          toast.success('Test results updated successfully');
          handleIsConfirmationModalOpen();
        }
      } else {
        await insertLabResult();
        if (error) {
          toast.error('error saving test results');
        } else {
          toast.success('Test results saved successfully');
          handleIsConfirmationModalOpen();
        }
      }
    } catch (err) {
      toast.error('Error saving test results');
      console.error(err, error);
    } finally {
      refetch();
      refetchLabResult();
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
    reset({ ...formDefaultObj[formKey], status: initialStatus });
    setCurrentForm(formKey);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto">
      {renderConfirmationModal()}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-sm px-4 pt-4 py-5  border border-gray-100 h-[400px] overflow-auto no-scrollbar">
        <div className="flex items-center gap-2 justify-between">
          <h2 className="text-sm font-semibold mb-4 text-blue-600">Lab Test Requests</h2>
          {data?.note && (
            <Button
              value={
                <>
                  <MessageCircleWarning size={18} className="text-red-600" />

                  <span
                    className={`group-hover:block hidden text-xs absolute bg-gray-800 text-white top-5 p-2 rounded-lg right-0 text-wrap w-[170px]`}
                  >
                    {data?.note}
                  </span>
                </>
              }
              className="relative text-sm font-semibold mb-4 text-blue-600 group"
            />
          )}
        </div>
        <div className="space-y-4">
          {data?.task_data.map((item: { name: string; bill: string }, index: number) => {
            const formKey = item?.name.replace(/\s+/g, '').toLowerCase();
            const status: any =
              data?.task_result &&
              Object.entries(data?.task_result).find(([key]) => key === item?.name);
            if (item?.bill === 'unpaid') return;
            return (
              <button
                key={`${formKey}-${index}`}
                className={`w-full flex flex-col justify-center gap-2 p-3 rounded-lg transition-all 
                  ${
                    currentForm === formKey
                      ? 'bg-blue-50 border border-blue-200 shadow-xs'
                      : 'hover:bg-gray-50 border border-gray-100'
                  }`}
                onClick={() => {
                  changeFormInView(formKey);
                  setTestName(item?.name);
                }}
              >
                <div className="w-full flex items-top gap-2">
                  <FlaskConical size={18} className="text-blue-500 flex-shrink-0" />
                  <div className="text-left overflow-hidden">
                    <p className="font-medium text-gray-800 truncate text-sm">{item?.name}</p>
                    <p className="text-xs text-gray-500 mb-4">
                      {dayjs(data?.created_at).format('h:mm A · DD-MM-YY')}
                    </p>
                  </div>
                  <div className="">{<PriorityBar priority={data?.priority ?? 'N/A'} />}</div>
                </div>
                <div className="">
                  {<StatusBar status={status ? status[1]?.toLowerCase() : 'pending'} />}
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
                      disabled={initialStatus?.value === 'Completed'}
                    />
                  </div>
                </div>

                <div className="grid items-end grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                  <RenderForm
                    control={control}
                    form={currentForm}
                    initialValue={
                      initialStatus?.value !== 'Pending' && queryData ? queryData[0]?.result : null
                    }
                    setValue={setValue}
                    disabled={initialStatus?.value === 'Completed'}
                  />
                </div>

                <div className="w-full">
                  <Button
                    type="button"
                    onClick={handleIsConfirmationModalOpen}
                    disabled={loading || updateLoading || initialStatus?.value === 'Completed'}
                    className={`absolute bottom-6 right-6 mt-auto px-6 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${loading || updateLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    loading={loading || updateLoading}
                    value={'Save'}
                  />
                </div>
              </>
            ) : (
              <div className=" flex flex-col items-center justify-center h-64 text-gray-500">
                <FlaskConical size={48} className="mb-4 text-gray-300" />
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
