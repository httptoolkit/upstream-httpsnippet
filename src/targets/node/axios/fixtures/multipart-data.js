const axios = require('axios').default;

const options = {
  method: 'POST',
  url: 'http://mockbin.com/har',
  headers: {'content-type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '-----011000010111000001101001\r\nContent-Disposition: form-data; name="foo"; filename="hello.txt"\r\nContent-Type: text/plain\r\n\r\nHello World\r\n-----011000010111000001101001\r\nContent-Disposition: form-data; name="bar"\r\n\r\nBonjour le monde\r\n-----011000010111000001101001--\r\n'
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });