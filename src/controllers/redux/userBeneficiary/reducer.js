import { CREATE_BENEFICIARY, BENEFICIARY_DETAIL, _SUCCESS } from '../base/constants';

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
      if (data.result) {
        const newBeneficaryData = data.result;
        if (newBeneficaryData) {
          if (state && state.beneficiaries) {
            const oldBeneficiaries = state.beneficiaries.slice();
            oldBeneficiaries.push(newBeneficaryData);
            const updatedState = Object.assign({}, state, {
              beneficiaries: oldBeneficiaries,
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
      if (data.result) {
        const beneficiaryData = data.result;
        if (beneficiaryData) {
          if (state && state.beneficiaries) {
            const updatedState = Object.assign({}, state, {
              beneficiaries: beneficiaryData.slice(),
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
  // eslint-disable-next-line no-console
  console.log('userBeneficiaryReducer action : ', action);
  switch (action.type) {
    case `${CREATE_BENEFICIARY}${_SUCCESS}`: {
      const formattedData = getFormattedNewBeneficiaryData(state, action);
      // eslint-disable-next-line no-console
      console.log('CREATE_BENEFICIARY formattedData : ', formattedData);

      return formattedData;
    }
    case `${BENEFICIARY_DETAIL}${_SUCCESS}`: {
      const formattedData = getFormattedBeneficiaryData(state, action);
      return formattedData;
    }
    default:
      return state;
  }
};

export default userBeneficiaryReducer;
