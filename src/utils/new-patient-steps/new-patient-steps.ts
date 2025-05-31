const newPatientSteps = [
  {
    step: 1,
    title: 'patient biodata',
    fields: [
      'first_name',
      'last_name',
      'date_of_birth',
      'gender',
      'marital_status',
      'occupation',
      'religion',
    ],
    show: true,
  },
  {
    step: 2,
    title: 'patient contact details',
    fields: [
      'email',
      'phone_number',
      'address',
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship',
    ],
    show: false,
  },
];

export default newPatientSteps;
