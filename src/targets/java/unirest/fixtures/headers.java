HttpResponse<String> response = Unirest.get("http://mockbin.com/har")
  .header("accept", "application/json")
  .header("x-foo", "Bar")
  .header("x-bar", "Foo")
  .asString();