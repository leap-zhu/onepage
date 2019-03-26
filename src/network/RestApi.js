const baseUrl = 'https://firestore.googleapis.com/v1beta1/projects/rn-test-dfd3f/databases/(default)/documents/';
const greatingMessageUrl = 'users';
const serviceInformationUrl = 'services';

export default RestApi =
{
  getGreatingMessage: function (callback) {
    fetch(baseUrl + greatingMessageUrl)
    .then((response) => response.json())
    .then((responseJson) => {      
      callback(responseJson.documents[0].fields, null);
    })
    .catch((error) => {
      callback(null, error);
    });
  },  
  getServiceInformations: function (callback) {
    fetch(baseUrl + serviceInformationUrl)
    .then((response) => response.json())
    .then((responseJson) => {
      var services = [];
      responseJson.documents.forEach(element => {
        services.push(element.fields);
      });
      callback(services, null);
    })
    .catch((error) => {
      callback(null, error);
    });
  }
}