/**
 * @description
 * HTTP code snippet generator for PHP using curl-ext.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

import { CodeBuilder } from '../../../helpers/code-builder';
import { Client } from '../../targets';

export interface CurlOptions {
  closingTag?: boolean;
  maxRedirects?: number;
  nameErrors?: boolean;
  noTags?: boolean;
  shortTags?: boolean;
  timeout?: number;
}

export const curl: Client<CurlOptions> = {
  info: {
    key: 'curl',
    title: 'cURL',
    link: 'http://php.net/manual/en/book.curl.php',
    description: 'PHP with ext-curl',
  },
  convert: ({ uriObj, postData, fullUrl, method, httpVersion, cookies, headersObj }, options) => {
    const opts = {
      closingTag: false,
      indent: '  ',
      maxRedirects: 10,
      namedErrors: false,
      noTags: false,
      shortTags: false,
      timeout: 30,
      ...options,
    };

    const { push, blank, join } = new CodeBuilder({ indent: opts.indent });

    if (!opts.noTags) {
      push(opts.shortTags ? '<?' : '<?php');
      blank();
    }

    push('$curl = curl_init();');
    blank();

    const curlOptions = [
      {
        escape: true,
        name: 'CURLOPT_PORT',
        value: uriObj.port,
      },
      {
        escape: true,
        name: 'CURLOPT_URL',
        value: fullUrl,
      },
      {
        escape: false,
        name: 'CURLOPT_RETURNTRANSFER',
        value: 'true',
      },
      {
        escape: true,
        name: 'CURLOPT_ENCODING',
        value: '',
      },
      {
        escape: false,
        name: 'CURLOPT_MAXREDIRS',
        value: opts.maxRedirects,
      },
      {
        escape: false,
        name: 'CURLOPT_TIMEOUT',
        value: opts.timeout,
      },
      {
        escape: false,
        name: 'CURLOPT_HTTP_VERSION',
        value: httpVersion === 'HTTP/1.0' ? 'CURL_HTTP_VERSION_1_0' : 'CURL_HTTP_VERSION_1_1',
      },
      {
        escape: true,
        name: 'CURLOPT_CUSTOMREQUEST',
        value: method,
      },
      {
        escape: true,
        name: 'CURLOPT_POSTFIELDS',
        value: postData ? postData.text : undefined,
      },
    ];

    push('curl_setopt_array($curl, [');

    const curlopts = new CodeBuilder({ indent: opts.indent, join: `\n${opts.indent}` });

    curlOptions.forEach(({ value, name, escape }) => {
      if (value !== null && value !== undefined) {
        curlopts.push(`${name} => ${escape ? JSON.stringify(value) : value},`);
      }
    });

    // construct cookies
    const curlCookies = cookies.map(
      cookie => `${encodeURIComponent(cookie.name)}=${encodeURIComponent(cookie.value)}`,
    );
    if (curlCookies.length) {
      curlopts.push(`CURLOPT_COOKIE => "${curlCookies.join('; ')}",`);
    }

    // construct cookies
    const headers = Object.keys(headersObj)
      .sort()
      .map(key => `"${key}: ${headersObj[key]}"`);

    if (headers.length) {
      curlopts.push('CURLOPT_HTTPHEADER => [');
      curlopts.push(headers.join(`,\n${opts.indent}${opts.indent}`), 1);
      curlopts.push('],');
    }

    push(curlopts.join(), 1);
    push(']);');
    blank();
    push('$response = curl_exec($curl);');
    push('$err = curl_error($curl);');
    blank();
    push('curl_close($curl);');
    blank();
    push('if ($err) {');

    if (opts.namedErrors) {
      push('echo array_flip(get_defined_constants(true)["curl"])[$err];', 1);
    } else {
      push('echo "cURL Error #:" . $err;', 1);
    }

    push('} else {');
    push('echo $response;', 1);
    push('}');

    if (!opts.noTags && opts.closingTag) {
      blank();
      push('?>');
    }

    return join();
  },
};
