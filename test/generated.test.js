// @ts-check
import React from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

const {
    getCountry,
    getCountryWithQuery,
    useGetCountry,
    useGetCountryWithQuery,
    useSearchCountries,
    searchCountries,
    putCountry,
    postCountryWithPathParams,
    usePostCountryWithPathParams,
    postCountry,
    usePostCountry,
    usePutCountry,
} = require('./generated/mf-api/country');
const { postFooBar } = require('./generated/mf-api/fooBar');
const { getMe } = require('./generated/mini-api/little');

const apiUrl = 'https://vt.api';
const clientId = 2;

jest.mock('./generated/fetchJson', () => ({
    fetchJson: (req) => req,
}));

const country = { isoCode: '1', name: 'a' };

test('get', async () => {
    queryClient.clear();
    const fetchData = await getCountry({ id: 1, clientId: 2 });

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/${clientId}/countries/1`);
            expect(result.method).toBe(`get`);
            expect(result.queryParams).toStrictEqual({});
        });
        assertHook({
            queryKey: [useGetCountry.queryKey, { id: 1, clientId: 2 }],
            config: { cacheTime: 1000 },
        });
    };
    render(<Providers onResult={onResult} hook={() => useGetCountry({ id: 1, clientId: 2 }, { cacheTime: 1000 })} />);
});

test('get with query', async () => {
    queryClient.clear();
    const fetchData = await getCountryWithQuery({ id: 1 }, { param: 1 });

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/countries/search/1`);
            expect(result.method).toBe(`get`);
            expect(result.queryParams).toStrictEqual({ param: 1 });
            expect(result.body).toStrictEqual({});
        });
        assertHook({
            queryKey: [useGetCountryWithQuery.queryKey, { id: 1 }, { param: 1 }],
            config: { cacheTime: 1000 },
        });
    };
    render(<Providers onResult={onResult} hook={() => useGetCountryWithQuery({ id: 1 }, { param: 1 }, { cacheTime: 1000 })} />);
});

test('put with body', async () => {
    queryClient.clear();
    const fetchData = await putCountry({ id: 1, clientId: 2 }, country);

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/${clientId}/countries/1`);
            expect(result.method).toBe(`put`);
            expect(result.body).toStrictEqual(country);
            expect(result.queryParams).toStrictEqual({});
        });
    };
    render(<Providers onResult={onResult} hook={() => usePutCountry({ id: 1, clientId: 2 }, { onSuccess: onResult })} body={country} />);
});

test('search', async () => {
    queryClient.clear();
    const fetchData = await searchCountries({ id: 1 }, { name: 'Bobo' }, { size: 30 });

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/countries/search/1`);
            expect(result.method).toBe(`post`);
            expect(result.body).toStrictEqual({ name: 'Bobo' });
            expect(result.queryParams).toStrictEqual({ size: 30 });
        });
        assertHook({
            queryKey: [useSearchCountries.queryKey, { id: 1 }, { name: 'Bobo' }, { size: 30 }],
            config: { cacheTime: 1000 },
        });
    };
    render(
        <Providers onResult={onResult} hook={() => useSearchCountries({ id: 1 }, { name: 'Bobo' }, { size: 30 }, { cacheTime: 1000 })} />
    );
});

test('post - create', async () => {
    queryClient.clear();
    const fetchData = await postCountry(country);

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/countries`);
            expect(result.method).toBe(`post`);
            expect(result.body).toStrictEqual(country);
            expect(result.queryParams).toStrictEqual({});
        });
    };
    render(<Providers onResult={onResult} hook={() => usePostCountry({ onSuccess: onResult })} body={country} />);
});

test('post - create with path params', async () => {
    queryClient.clear();
    const fetchData = await postCountryWithPathParams({ someParam: 909, clientId: 2 }, country);

    const onResult = (hookData) => {
        [fetchData, hookData].forEach((result) => {
            expect(result.url).toBe(`${apiUrl}/v1/${clientId}/909/countries`);
            expect(result.method).toBe(`post`);
            expect(result.body).toStrictEqual(country);
            expect(result.queryParams).toStrictEqual({});
        });
    };
    render(
        <Providers
            onResult={onResult}
            hook={() => usePostCountryWithPathParams({ someParam: 909, clientId: 2 }, { onSuccess: onResult })}
            body={country}
        />
    );
});

test('mini api', async () => {
    queryClient.clear();
    const fetchData = await getMe({ clientId: 9 });
    expect(fetchData).toMatchObject({ method: 'get', url: 'http://my-api.com/getMe/9', queryParams: {}, body: {} });
});

test('postFooBar', () => {
    expect(typeof postFooBar).toBe('function');
});

const assertHook = ({ queryKey, config }) => {
    const query = queryClient.getQueryCache().getAll()[0];
    expect(query.queryKey).toEqual(queryKey);
    if (config) {
        expect(query.options).toMatchObject(config);
    }
};

const Providers = (props) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Component {...props} />
        </QueryClientProvider>
    );
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        },
    },
});

const Component = (props) => {
    const result = props.hook();
    const { onResult } = props;

    React.useEffect(() => {
        (async () => {
            if (result.mutate) {
                result.mutate(props.body);
            } else {
                if (result.isLoading) return;
                onResult(result.data);
            }
        })();
    }, [onResult, result, props.body]);

    return null;
};
