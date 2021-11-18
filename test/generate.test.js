const generator = require('../src/generator');

test('generate', async (done) => {
    const config = {
        name: 'MF API',
        input: {
            json: require('./apiSchema.json'),
        },
        output: {
            dir: './generated/snapshotTest',
        },
        apiUrl: {
            configPath: 'products.vt.baseUrl',
        },
    };

    const specs = require('./apiSchema.json');
    const { controllers, globalTypes } = await generator({ specs, config });
    expect(globalTypes).toMatchSnapshot();
    Object.entries(controllers).forEach(([, { types }]) => {
        expect(types).toMatchSnapshot();
    });
    done();
});
