import { CodeBuilder } from '../../../helpers/code-builder';
import { getHeader } from '../../../helpers/headers';
import { Client } from '../../targets';

export const restsharp: Client = {
  info: {
    key: 'restsharp',
    title: 'RestSharp',
    link: 'http://restsharp.org/',
    description: 'Simple REST and HTTP API Client for .NET',
  },
  convert: ({ allHeaders, method, fullUrl, headersObj, cookies, postData }) => {
    const { push, join } = new CodeBuilder();
    const isSupportedMethod = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'].includes(
      method.toUpperCase(),
    );

    if (!isSupportedMethod) {
      return 'Method not supported';
    }

    push(`var client = new RestClient("${fullUrl}");`);
    push(`var request = new RestRequest(Method.${method.toUpperCase()});`);

    // Add headers, including the cookies

    Object.keys(headersObj).forEach(key => {
      push(`request.AddHeader("${key}", "${headersObj[key]}");`);
    });

    cookies.forEach(({ name, value }) => {
      push(`request.AddCookie("${name}", "${value}");`);
    });

    if (postData.text) {
      const header = getHeader(allHeaders, 'content-type');
      const text = JSON.stringify(postData.text);
      push(`request.AddParameter("${header}", ${text}, ParameterType.RequestBody);`);
    }

    push('IRestResponse response = client.Execute(request);');
    return join();
  },
};
