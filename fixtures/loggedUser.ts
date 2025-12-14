import { test as base, expect, APIRequestContext } from '@playwright/test';

type AuthFixture = {
  userId: string;
  token: string;
  credentials: {
    userName: string;
    password: string;
  };
};

export const test = base.extend<AuthFixture>({
  credentials: async ({}, use) => {
    await use({
      userName: `user_${Date.now()}`,
      password: 'Qwerty11!',
    });
  },

  userId: async ({ request, credentials }, use) => {
    const response = await request.post('/Account/v1/User', {
      data: credentials,
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    await use(body.userID);
  },

  token: async ({ request, credentials }, use) => {
    const response = await request.post('/Account/v1/GenerateToken', {
      data: credentials,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    await use(body.token);
  },
});

export { expect };
