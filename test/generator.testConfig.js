module.exports = {
    dir: './test/generated',
    apis: [
        {
            name: 'MF API',
            input: {
                json: require('./apiSchema.json'),
            },
            output: {
                dir: 'mf-api',
            },
            swaggerUrl: 'https://swaggerDoc.com/',
            apiUrl: {
                configPath: 'products.vt.baseUrl',
            },
        },
        {
            name: 'Mini API',
            input: {
                json: require('./apiSchemaMini.json'),
            },
            output: {
                dir: 'mini-api',
            },
            swaggerUrl: 'https://swaggerDoc.com',
            skipAuth: true,
            apiUrl: {
                eval: "'http://my-api.com'",
            },
        },
    ],
};
