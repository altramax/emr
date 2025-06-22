const newStaffSteps = [
  {
    step: 1,
    title: 'Staff Biodata',
    fields: [
      'first_name',
      'last_name',
      'other_names',
      'date_of_birth',
      'gender',
      'marital_status',
      'nationality',
      'religion',
      'address',
    ],
    show: true,
  },
  {
    step: 2,
    title: 'Staff Contact Details',
    fields: [
      'email',
      'phone_number',
      'emergency_contact_name',
      'emergency_contact_number',
      'emergency_contact_relationship',
    ],
    show: false,
  },
  {
    step: 3,
    title: 'Employment Details',
    fields: ['role', 'department', 'job_title', 'employment_type', 'date_hired'],
    show: false,
  },
  {
    step: 4,
    title: 'review information',
    show: false,
  },
];

export default newStaffSteps;
