/**
 * @param {fetchJsonProps} props
 */
export const fetchJson = async ({ url, method, body = {}, queryParams = {}, options = {}, props = {} }) => {
  let token;
  // if (props.skipAuth !== true) {
  //     token = getToken();
  // }
  const urlWithQuery = new URL(url);
  Object.entries(queryParams).forEach(([key, value]) => urlWithQuery.searchParams.append(key, value));

  method = method || options.method || 'get';
  const { headers = {}, ...optionsRest } = options;
  const bodyEnabled = method.toLowerCase() !== 'get';
  const contentType = method.toLowerCase() === 'patch' ? 'application/json-patch+json' : 'application/json';

  const result = await fetch(urlWithQuery, {
      method,
      ...(bodyEnabled && { body: JSON.stringify(body) }),
      headers: {
          'Content-Type': contentType,
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers,
      },
      ...optionsRest,
  });
  if (result.status >= 400) {
      if (result.status === 404) {
          throw new Error();
      }
      throw new Error();
  }
  try {
      if (result.headers.get('Content-Type').startsWith('image/')) {
          const blob = await result.blob();
          return URL.createObjectURL(blob);
      }
      const values = await result.json();
      return values;
  } catch (e) {
      return {};
  }
};

/**
* @typedef {Object} fetchJsonProps
* @prop {string} url
* @prop {string} [method]
* @prop {Object|Array} [body]
* @prop {Object} [queryParams]
* @prop {Object} [options] Options for fetch
* @prop {Object} [props] Additional internal options
* }
*/
