function getHeaderData() {
  const header = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic QzI0QjY3MzI4RjYyQ0U2OTNDOTk4NURCRUZCRjc4MkFDN0U4RTAyQ0Y0NDBCN0FDOEMxQjA1NTc5NjQ2NEQzODoxNkFBQTQ1MjRFMTAyQURFMEFDMUY4OURCRDlDOEEzMjA4OUI2ODk0MzcwMjhBOUNCMkM1RTgyNUJDQzEzMDFF',
    'x-key': 'xkey',
    'x-access-token': 'xaccesstoken',
  };
  return header;
}

const action = definition => {
  const data = {
    ...definition,
  };
  if (data && data.payload && data.payload.request) {
    let header = {};

    if (
      data.payload.request.headers &&
      data.payload.request.headers.xKey &&
      data.payload.request.headers.xAccessToken
    ) {
      header = {
        'x-key': data.payload.request.headers.xKey,
        'x-access-token': data.payload.request.headers.xAccessToken,
      };
    }
    const basicHeader = getHeaderData(definition);
    const updatedHeader = {
      ...basicHeader,
      ...header,
    };

    data.payload.request.headers = updatedHeader;
  }
  return data;
};

export default action;
