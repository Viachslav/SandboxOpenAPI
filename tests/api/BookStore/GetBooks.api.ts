import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../../../schemas/books.schema.json';
import { measureTime } from '../../../helper/timeCounter';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('GET /Books list of books returns 200 @positive @smoke', async ({ request }) => {
  const response = await request.get('BookStore/v1/Books');
  expect(response.status()).toBe(200);
  console.log(await response.json());
});

test('GET /Books validate list of books schema @positive @smoke', async ({ request }) => {
  const response = await request.get('/BookStore/v1/Books');
  const contentType = response.headers()['content-type'];
  expect(contentType).toContain('application/json');
  const body = await response.json();
  expect(body).toHaveProperty('books');
  const valid = validate(body);
  if (!valid) {
    console.error(validate.errors);
  }
  expect(valid).toBe(true);
});

test('GET /Books list of books responds under 500ms @positive', async ({ request }) => {
  const { result: response, duration } = await measureTime(() => request.get('/BookStore/v1/Books'));
  expect(response.status()).toBe(200);
  expect(duration).toBeLessThan(500);
});