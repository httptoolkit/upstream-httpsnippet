const request = require('request');

const options = {
  method: 'GET',
  url: 'http://mockbin.com/har',
  headers: {accept: 'application/json', 'x-foo': 'Bar', 'x-bar': 'Foo'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});