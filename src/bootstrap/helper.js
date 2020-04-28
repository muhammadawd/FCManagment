export const helper = {
  prepareObjectToSend: (request_data) => {
    // return JSON.stringify(request_data).replace(/\\n/g, "\\n")
    //   .replace(/\\'/g, "\\'")
    //   .replace(/\\"/g, '\\"')
    //   .replace(/\\&/g, "\\&")
    //   .replace(/\\r/g, "\\r")
    //   .replace(/\\t/g, "\\t")
    //   .replace(/\\b/g, "\\b")
    //   .replace(/\\f/g, "\\f");
    // return this.JSON_to_URLEncoded(request_data)
    return request_data;
    return queryString.stringify(request_data);
  },
  JSON_to_URLEncoded(element, key, list) {
    var list = list || [];
    if (typeof (element) == 'object') {
      for (var idx in element)
        JSON_to_URLEncoded(element[idx], key ? key + '[' + idx + ']' : idx, list);
    } else {
      list.push(key + '=' + encodeURIComponent(element));
    }
    return list.join('&');
  },
  showMessage: (type, vm) => {
    vm.$notify({
      icon: "ti-info",
      horizontalAlign: 'center',
      verticalAlign: 'top',
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
      try {
        document.getElementById(input + '_error').innerText = ' ';
      } catch (e) {
        console.log(input)
      }
    }
    for (const [key, value] of Object.entries(errors)) {
      // console.log(key, value)
      try {
        document.getElementById(key + '_error').innerText = value[0].msg;
      } catch (e) {
      }
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

      if (error.response.status == 403) {
        vm.$router.push({name: 'PermissionDeniedPage'});
        return;
      }

      if (error.response.status == 401) {
        vm.$router.push({name: 'login'});
        return;
      }

      vm.$notify({
        icon: "ti-info",
        horizontalAlign: 'center',
        verticalAlign: 'top',
        title: `Server Error Code : ${error.response.status}`,
        message: `${error.response.data.message}`,
        type: 'danger'
      });
      // console.log(error.response.data, error.response.status, error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      vm.$notify({
        icon: "ti-info",
        horizontalAlign: 'center',
        verticalAlign: 'top',
        title: `${vm.$ml.get('error')}`,
        message: `No Response From Server`,
        type: 'danger'
      });
      // console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      vm.$notify({
        icon: "ti-info",
        horizontalAlign: 'center',
        verticalAlign: 'top',
        title: `${vm.$ml.get('error')}`,
        message: error.message,
        type: 'danger'
      });
      // console.log('Error', error.message);
    }
  },
  getCurrentProgramId() {
    let current_program_id = window.ls.getFromStorage('current_program_id');
    current_program_id = JSON.parse(current_program_id);
    return current_program_id ? current_program_id : 1;
  },
  hasAccessPermission: (permission) => {
    let user = JSON.parse(localStorage.getItem('auth_data'));
    // console.log(user.userInfo.myPermessions)
    if (permission === 'ALLOW_ALL') {
      return true
    } else if (user.userInfo.myPermessions.includes(permission)) {
      return true;
    } else {
      return false;
    }
  },
};
