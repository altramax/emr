'use client';

type vitalsType = {
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  data: any;
  refetch: () => void;
};

const LabOrderDetails = ({ data, refetch }: vitalsType) => {
  console.log(data, refetch);

  return <></>;
};

export default LabOrderDetails;
