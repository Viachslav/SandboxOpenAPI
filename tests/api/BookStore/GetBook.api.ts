import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../../../schemas/bookValidResponse.schema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);
const BOOK_ISBN = '9781449325862';
const INVALID_BOOK_ISBN = '9781449325860';

test('GET /Book with correct ISBN @positive @smoke', async ({ request}) => {
    const response = await request.get(`/BookStore/v1/Book?ISBN=${BOOK_ISBN}`);
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('application/json');
});

test('GET /Book validate schema @positive @smoke', async ({request}) => {
    const response = await request.get('/BookStore/v1/Book?ISBN=9781449325862');
    const body =  await response.json();
    const valid = validate(body);
    expect (valid).toBe(true);
});

test('GET /Book with correct ISBN in URL return html in response @negative', async ({ request}) => {
    const response = await request.get('/BookStore/v1/Book/');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
});

test('GET /Book with incorrect ISBN returns 400 @negative', async ({ request }) => {
  const response = await request.get('/BookStore/v1/Book', {
    params: {
      ISBN: `${INVALID_BOOK_ISBN}`,
    },
  });
  expect(response.status()).toBe(400);
});

test('GET /Book with empty ISBN returns 400 @negative', async ({ request }) => {
  const response = await request.get('/BookStore/v1/Book', {
    params: {
      ISBN: '',
    },
  });
  expect(response.status()).toBe(400);
});

test('GET /Book with incorrect ISBN returns correct body @negative', async ({ request }) => {
  const response = await request.get('/BookStore/v1/Book', {
    params: {
      ISBN: `${INVALID_BOOK_ISBN}`,
    },
  });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toEqual({
      "code": "1205",
      "message": "ISBN supplied is not available in Books Collection!"
    });
});
