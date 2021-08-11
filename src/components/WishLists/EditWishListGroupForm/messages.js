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
    defaultMessage: 'Item name',
    description: 'Item name',
  },
  addOtherItem: {
    id: 'ListSettingsForm.addOtherItem',
    defaultMessage: 'Other Item name',
    description: 'Other Item name',
  },
  startValue: {
    id: 'ListSettingsForm.startValue',
    defaultMessage: 'Start value',
    description: 'Start value',
  },
  endValue: {
    id: 'ListSettingsForm.endValue',
    defaultMessage: 'End value',
    description: 'Add end value here ....',
  },
  enable: {
    id: 'ListSettingsForm.enable',
    defaultMessage: 'Enable',
    description: 'Enable',
  },
  disable: {
    id: 'ListSettingsForm.disable',
    defaultMessage: 'Disable',
    description: 'Disable',
  },
  itemNameIsRequired: {
    id: 'ListSettingsForm.itemNameIsRequired',
    defaultMessage: 'Item name is required',
    description: 'itemNameIsRequired',
  },
  otherItemNameIsRequired: {
    id: 'ListSettingsForm.otherItemNameIsRequired',
    defaultMessage: 'Other item name is required',
    description: 'otherItemNameIsRequired',
  },
  startValueIsInvalid: {
    id: 'ListSettingsForm.startValueIsInvalid',
    defaultMessage: 'Invalid Start value, provide a valid number',
    description: 'startValueIsInvalid',
  },
  endValueIsInvalid: {
    id: 'ListSettingsForm.endValueIsInvalid',
    defaultMessage: 'Invalid End value, provide a valid number',
    description: 'endValueIsInvalid',
  },
  endValueGreater: {
    id: 'ListSettingsForm.endValueGreater',
    defaultMessage: 'End value must be greater than Start value',
    description: 'endValueGreater',
  },
  somethingWentWrong: {
    id: 'ListSettingsForm.somethingWentWrong',
    defaultMessage: 'Sorry, something went wrong. Please try again',
    description: 'Wrong went wrong',
  },

});

export default messages;
