import { defineMessages } from 'react-intl';

const messages = defineMessages({

  add: {
    id: 'AddListSettingsForm.add',
    defaultMessage: 'Add',
    description: 'Add Button',
  },
  update: {
    id: 'ListSettingsForm.update',
    defaultMessage: 'Update',
    description: 'Update Button',
  },
  delete: {
    id: 'ListSettingsForm.delete',
    defaultMessage: 'Delete',
    description: 'Delete Button',
  },
  addNew: {
    id: 'ListSettingsForm.addNew',
    defaultMessage: 'Name',
    description: 'Name',
  },
  addNewDescription: {
    id: 'ListSettingsForm.addNewDescription',
    defaultMessage: 'Description',
    description: 'description',
  },
  required: {
    id: 'ListSettingsForm.required',
    defaultMessage: '*Required',
    description: 'Required',
  },
  exceedLimit: {
    id: 'exceedLimit',
    defaultMessage: 'Maximum allowed character is 255.',
    description: 'exceedLimit',
  },
  emailInvalid: {
    id: 'ListSettingsForm.emailInvalid',
    defaultMessage: '*Invalid email address',
    description: 'email address error',
  },
  emailBlankSpace: {
    id: 'ListSettingsForm.emailBlankSpace',
    defaultMessage: 'Email should not be blank spaces',
    description: 'email address error',
  },
  passwordInvalid: {
    id: 'ListSettingsForm.passwordInvalid',
    defaultMessage: 'Password should be minimum 8 characters.',
    description: 'Password minimum characters error',
  },
  passwordBlankSpace: {
    id: 'ListSettingsForm.blankSpace',
    defaultMessage: 'Password should not be blank space.',
    description: 'Password error',
  }
});

export default messages;
