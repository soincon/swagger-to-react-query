module.exports = {
    apis: [
        {
            name: 'My Factory',
            input: {
                url: 'https://emi.soincon.es/snc-mf-api/v3/api-docs',
            },
            output: {
                dir: 'src/generated/mf',
            },
            swaggerUrl: 'https://emi.soincon.es/snc-mf-api/swagger-ui/index.html?configUrl=/snc-mf-api/v3/api-docs/swagger-config#/',
            apiUrlConfigPath: 'mf.api',
        },
        {
            name: 'GMAO',
            input: {
                url: 'https://emi.soincon.es/snc-eg-api-pro/v3/api-docs',
            },
            output: {
                dir: 'src/generated/gmao',
            },
            swaggerUrl: 'https://emi.soincon.es/snc-eg-api-pro/swagger-ui/index.html?configUrl=/snc-eg-api-pro/v3/api-docs/swagger-config#/',
            apiUrlConfigPath: 'gmao.api',
        },
        {
            name: 'VT',
            input: {
                url: 'https://emi.soincon.es/snc-vt-master-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/vt',
            },
            apiUrlConfigPath: 'ORCHESTRATOR.BASE',
        },
        {
            name: 'DP',
            input: {
                url: 'https://emi.soincon.es/snc-dp-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/dp',
            },
            apiUrlConfigPath: 'digitalPeople.api',
        },
        {
            name: 'Security',
            input: {
                url: 'https://emi.soincon.es/snc-security-ws/v2/api-docs',
            },
            output: {
                dir: 'src/generated/security',
            },
            apiUrlConfigPath: 'AUTH.BASE',
        },
        {
            name: 'WMS',
            input: {
                url: 'https://emi.soincon.es/snc-wms-api/v3/api-docs',
            },
            output: {
                dir: 'src/generated/wms',
            },
            apiUrlConfigPath: 'wms.api',
        },
        {
            name: 'Notifications',
            input: {
                url: 'https://emi.soincon.es/snc-notifications-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/notifications',
            },
            apiUrlConfigPath: 'NOTIFICATIONS.BASE',
        },
        {
            name: 'Document Manager',
            input: {
                url: 'https://emi.soincon.es/snc-document-manager-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/docs',
            },
            apiUrlConfigPath: 'DOCUMENT_MANAGER.BASE',
        },
        {
            name: 'BOM',
            input: {
                url: 'https://emi.soincon.es/snc-bom-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/bom',
            },
            apiUrlConfigPath: 'BOM.BASE',
        },
        {
            name: 'Fast Monitoring',
            input: {
                url: 'https://emi.soincon.es/snc-fm-api/v2/api-docs',
            },
            output: {
                dir: 'src/generated/fm',
            },
            apiUrlConfigPath: 'BOM.BASE', // TODO: add FM to external config.json
        },
    ],
};
