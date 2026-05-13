CREATE TYPE application_question_type AS ENUM(
  'text',
  'textarea',
  'number',
  'email',
  'phone',
  'date',
  'select',
  'multi_select',
  'checkbox',
  'radio',
  'file_upload',
  'url'
);