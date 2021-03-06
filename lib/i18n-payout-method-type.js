import { defineMessages } from 'react-intl';

import { PayoutMethodType } from './constants/payout-method';

const TypesI18n = defineMessages({
  [PayoutMethodType.OTHER]: {
    id: 'PayoutMethod.Type.Other',
    defaultMessage: 'Other',
  },
  [PayoutMethodType.BANK_ACCOUNT]: {
    id: 'PayoutMethod.Type.BankAccount',
    defaultMessage: 'Wire transfer',
  },
});

/**
 * Translate a member role
 *
 * @param {object} `intl` - see `injectIntl`
 * @param {string} `type`
 */
const i18nPayoutMethodType = (formatMessage, type, { aliasBankAccountToTransferWise } = {}) => {
  if (!type) {
    return formatMessage(TypesI18n[PayoutMethodType.OTHER]);
  } else if (type === PayoutMethodType.PAYPAL) {
    return 'PayPal';
  } else if (type === PayoutMethodType.BANK_ACCOUNT && aliasBankAccountToTransferWise) {
    return 'Transferwise';
  }

  const i18nMsg = TypesI18n[type];
  return i18nMsg ? formatMessage(i18nMsg) : type;
};

export default i18nPayoutMethodType;
