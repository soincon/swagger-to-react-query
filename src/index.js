#!/usr/bin/env node
const { join } = require('path');
const { writeFileSync, mkdirSync, existsSync, copyFileSync } = require('fs');
const meow = require('meow');
const chalk = require('chalk');
const fetch = require('node-fetch');

const generator = require('./generator');

const log = console.log;

const cli = meow(
    `
  Usage
    $ swagger-to-react-query <configFile>

  Options
    --hooks, -hk  Include hooks

  Examples
    $ swagger-to-react-query config.js --hooks
`,
    {
        flags: {
            hooks: {
                type: 'boolean',
                alias: 'hk',
            },
        },
    }
);

const [configFile] = cli.input;

if (!configFile) {
    throw new Error('Config file is required');
}

const configMain = require(join(process.cwd(), configFile));

if (!configMain.dir) throw new Error(`"dir" is required`);

const currentDir = process.cwd();
const generatedPath = join(currentDir, configMain.dir);
if (!existsSync(generatedPath)) {
    mkdirSync(generatedPath);
}

async function importSpecs({ url, headers = {}, json }) {
    if (url) {
        log(chalk.green(`Start import specs from "${url}"`));

        try {
            const req = await fetch(url, { headers });
            const data = await req.json();

            return data;
        } catch (err) {
            throw new Error(`Fail to import specs from "${url}"`);
        }
    }

    if (json) {
        return json;
    }

    throw new Error(`Fail to import specs from "${url || json}"`);
}

Promise.all(
    configMain.apis.map(async (config) => {
        log(chalk.green(`Start ${config.name}`));

        if (!config.input || (!config.input.url && !config.input.json)) {
            throw new Error(`"input.url" or "input.json" is required`);
        }

        if (!config.output.dir) throw new Error(`"output.dir" is required`);
        if (!config.apiUrl) throw new Error(`"apiUrl" is required`);

        const specs = await importSpecs(config.input);
        const jsPath = join(generatedPath, config.output.dir);
        if (!existsSync(jsPath)) {
            mkdirSync(jsPath);
        }

        const { controllers, globalTypes } = await generator({ specs, config });
        Object.entries(controllers).forEach(([controller, { code, types }]) => {
            writeFileSync(join(jsPath, `${controller}.js`), code);
            writeFileSync(join(jsPath, `${controller}.d.ts`), types);
        });
        writeFileSync(join(jsPath, `index.d.ts`), globalTypes);
    })
)
    .then(() => {
        copyFileSync(join(__dirname, 'generatorHelpers.js'), join(generatedPath, 'generatorHelpers.js'));
    })
    .then(() => {
        log(chalk.green('Finish!'));
    })
    .catch((err) => {
        log(chalk.red(err.message));
        process.exit(1);
    });
