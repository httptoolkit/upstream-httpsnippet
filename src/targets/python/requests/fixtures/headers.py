import requests

url = "http://mockbin.com/har"

headers = {
    "accept": "application/json",
    "x-foo": "Bar",
    "x-bar": "Foo"
}

response = requests.get(url, headers=headers)

print(response.text)