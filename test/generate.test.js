const generator = require('../src/generator');

test('generate', async () => {
    const config = {
        name: 'My API',
        input: {
            json: require('./apiSchema.json'),
        },
        output: {
            dir: './generated/snapshotTest',
        },
        apiUrl: {
            value: "'http://my-api.com'",
        },
    };

    const specs = require('./apiSchema.json');
    const { controllers, globalTypes } = await generator({ specs, config });
    expect(globalTypes).toMatchSnapshot();
    Object.entries(controllers).forEach(([, { types }]) => {
        expect(types).toMatchSnapshot();
    });
});
