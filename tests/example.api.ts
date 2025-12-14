import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from '../schemas/books.schema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test('validate books schema', async ({ request }) => {
  const response = await request.get('/BookStore/v1/Books');
  const body = await response.json();
  const valid = validate(body);
  if (!valid) {
    console.error(validate.errors);
  }
  expect(valid).toBe(true);
});

test('GET books returns 200', async ({ request }) => {
  const response = await request.get('BookStore/v1/Books');
  expect(response.status()).toBe(200);
  console.log(await response.json());
});

