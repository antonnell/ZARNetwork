import { CREATE_BENEFICIARY, BENEFICIARY_DETAIL, _SUCCESS } from '../base/constants';
import { decryptPayload } from '../../utility/decryption';

const defaultState = {
  beneficiaries: [],
};

/**
 * @method getFormattedNewBeneficiaryData : To format result of create beneficiary api.
 */

const getFormattedNewBeneficiaryData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const newBeneficaryData = decryptPayload(data.message);
        if (newBeneficaryData.status === 'success' && newBeneficaryData.payload) {
          const { payload } = newBeneficaryData;
          if (state && state.beneficiaries) {
            const oldBeneficiaries = state.beneficiaries.slice();
            oldBeneficiaries.push(payload);
            const updatedState = Object.assign({}, state, {
              wallets: oldBeneficiaries,
            });
            return updatedState;
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method getFormattedBeneficiaryData : To format result of get beneficiaries for account api.
 */

const getFormattedBeneficiaryData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;
    if (data.status === 200) {
      if (data.message) {
        const beneficiaryData = decryptPayload(data.message);
        if (beneficiaryData.status === 'success' && beneficiaryData.payload) {
          const { payload } = beneficiaryData;
          if (state && state.beneficiaries) {
            const updatedState = Object.assign({}, state, {
              beneficiaries: payload.slice(),
            });
            return updatedState;
          }
        }
      }
    }
  }
  return state;
};

/**
 * @method userBeneficiaryReducer : Reducer for maintianing user's beneficiaries for account details.
 */
const userBeneficiaryReducer = (state = defaultState, action) => {
  console.log('userBeneficiaryReducer state : ', state);

  switch (action.type) {
    case `${CREATE_BENEFICIARY}${_SUCCESS}`: {
      const formattedData = getFormattedNewBeneficiaryData(state, action);
      console.log('CREATE_BENEFICIARY formattedData : ', formattedData);
      return formattedData;
    }
    case `${BENEFICIARY_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedBeneficiaryData(state, action);
      console.log('BENEFICIARY_DETAIL formattedData : ', formattedData);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userBeneficiaryReducer;
