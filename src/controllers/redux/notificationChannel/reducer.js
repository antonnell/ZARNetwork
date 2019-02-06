import { NOTIFICATION_CHANNEL, NOTIFICATION_CHANNEL_BY_ID, _SUCCESS } from '../base/constants';

const defaultState = {
  notificationChannelList: [],
  notificationChannel: {},
};

/**
 * @method getFormattedListData : To format result of notification channel api for all channels.
 */
const getFormattedListData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.result) {
        const resultData = data.result;
        if (resultData) {
          let channelList;
          if (resultData.length) {
            channelList = resultData.slice();
          } else {
            channelList = resultData;
          }
          return Object.assign({}, state, {
            notificationChannelList: channelList,
          });
        }
      }
    }
  }
  return state;
};
/**
 * @method getFormattedData : To format result of notification channel api for particuler channel.
 */
const getFormattedData = (state, action) => {
  if (action && action.payload && action.payload.data) {
    const { data } = action.payload;

    if (data.status === 200) {
      if (data.result) {
        const resultData = data.result;
        if (resultData) {
          let channelList;
          if (resultData.length) {
            channelList = resultData.slice();
          } else {
            channelList = resultData;
          }
          return Object.assign({}, state, {
            notificationChannel: channelList,
          });
        }
      }
    }
  }
  return state;
};

/**
 * @method notificationChannelReducer : Reducer for notification channels details.
 *  */
const notificationChannelReducer = (state = defaultState, action) => {
  switch (action.type) {
    case `${NOTIFICATION_CHANNEL}${_SUCCESS}`: {
      const formattedData = getFormattedListData(state, action);
      return formattedData;
    }
    case `${NOTIFICATION_CHANNEL_BY_ID}${_SUCCESS}`: {
      const formattedData = getFormattedData(state, action);

      return formattedData;
    }
    default:
      return state;
  }
};

export default notificationChannelReducer;
