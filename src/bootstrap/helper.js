export const helper = {
  prepareObjectToSend: (request_data) => {
    return queryString.stringify(request_data);
  },
  handleError: (error, vm) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      vm.$notify({
        icon: "ti-info",
        title: `Server Error Code : ${error.response.status}`,
        message: `${error.response.data.message}`,
        type: 'danger'
      });
      // console.log(error.response.data, error.response.status, error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      vm.$notify({
        icon: "ti-info",
        title: `${vm.$ml.get('error')}`,
        message: `No Response From Server`,
        type: 'danger'
      });
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      vm.$notify({
        icon: "ti-info",
        title: `${vm.$ml.get('error')}`,
        message: error.message,
        type: 'danger'
      });
      // console.log('Error', error.message);
    }
  }
}
