# @snc/api-generator

Based on https://github.com/elsangedy/swagger-to-react-query

## How to

Install the tool

```sh
yarn add @snc/api-generator -D
```

Create a config file e.g. `generator.config.js`

The configuration options are:

```json
{
    "dir": "(string, required) - Directory where all the APIs will be generated. It has to exist.",
    "apis": [
        {
            "name": "(string, required) - Name of the API. The name is not visible anywhere in the app, only in console during generation.",
            "input": {
                "url": "(string, required) - URL of the API schema"
            },
            "output": {
                "url": "(string, required) - Directory of the current API"
            },
            "swaggerUrl": "(string, required) - URL of Swagger documentation",
            "apiUrl": {
                // Specifies the url to make the requests
                // Only one of these two is required
                "configPath": "(string, optional) - Path (in lodash.get meaning) in config.json to get the url of the API.",
                "eval": "(string, optional) - A piece of code which will be evaluated to get the url of the API."
            },
            "skipAuth": "(boolean, optional) - If true the token will not be appended to the request and a missing token won't throw an exception."
        }
    ]
}
```

Example:

```js
module.exports = {
    dir: './generated',
    apis: [
        {
            name: 'My Factory',
            input: {
                url: 'https://emi.soincon.es/snc-mf-api/v3/api-docs',
            },
            output: {
                dir: 'mf',
            },
            swaggerUrl: 'https://emi.soincon.es/snc-mf-api/swagger-ui/index.html?configUrl=/snc-mf-api/v3/api-docs/swagger-config#/',
            apiUrl: {
                // Only one these two is required
                configPath: 'mf.api',
                eval: 'process.env.REACT_APP_MF_API_URL',
            },
        },
    ],
};
```

Run the generator with config specified

```sh
yarn generateApi generator.config.js
```
