export const helper = {
  prepareObjectToSend: (request_data) => {
    return queryString.stringify(request_data);
  }
}
