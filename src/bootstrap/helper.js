export const helper = {
  prepareObjectToSend: (request_data) => {
    return queryString.stringify(request_data);
  },
  showMessage: (type,vm) => {
    vm.$notify({
      icon: "ti-info",
      horizontalAlign:'center',
      verticalAlign:'top',
      title: `${type == 'success' ? vm.$ml.get('success') : vm.$ml.get('error')}`,
      message: `${type == 'success' ? vm.$ml.get('success_msg') : vm.$ml.get('error_msg')}`,
      type: type
    });
  },
  validationGroupingData: (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  },
  addErrors: (inputs, errors) => {
    for (let input in inputs) {
      document.getElementById(input + '_error').innerText = ' ';
    }
    for (const [key, value] of Object.entries(errors)) {
      // console.log(key, value)
      document.getElementById(key + '_error').innerText = value[0].msg;
    }
  },
  handleError: (error, vm) => {
    if (error.response) {
      // The request was made and the server responded with a status code

      if (error.response.status == 422) {
        let validations = window.helper.validationGroupingData(error.response.data.data, 'param');
        window.helper.addErrors(vm.prepareValidationInputs(), validations);
        return;
      }

      vm.$notify({
        icon: "ti-info",
        horizontalAlign:'center',
        verticalAlign:'top',
        title: `Server Error Code : ${error.response.status}`,
        message: `${error.response.data.message}`,
        type: 'danger'
      });
      // console.log(error.response.data, error.response.status, error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      vm.$notify({
        icon: "ti-info",
        horizontalAlign:'center',
        verticalAlign:'top',
        title: `${vm.$ml.get('error')}`,
        message: `No Response From Server`,
        type: 'danger'
      });
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      vm.$notify({
        icon: "ti-info",
        horizontalAlign:'center',
        verticalAlign:'top',
        title: `${vm.$ml.get('error')}`,
        message: error.message,
        type: 'danger'
      });
      // console.log('Error', error.message);
    }
  }
}
