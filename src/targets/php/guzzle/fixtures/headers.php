<?php

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'http://mockbin.com/har', [
  'headers' => [
    'accept' => 'application/json',
    'x-bar' => 'Foo',
    'x-foo' => 'Bar',
  ],
]);

echo $response->getBody();