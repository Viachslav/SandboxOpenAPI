import { test, expect } from '@playwright/test';

test('POST /User Create user via API', async ({ request }) => {
  const response = await request.post(
    '/Account/v1/User',
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        userName: 'testUser12345',
        password: 'Test@12345',
      },
    }
  );

  console.log(await response.json());
  expect(response.status()).toBe(201);
  // Тело ответа
  const body = await response.json();

  expect(body).toHaveProperty('userID');
  expect(body).toHaveProperty('username', 'testUser12345');
});