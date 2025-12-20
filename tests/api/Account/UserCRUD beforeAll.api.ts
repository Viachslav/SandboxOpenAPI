import { test, expect } from '@playwright/test';
import { passwordRandom, usernameRandom } from '../../../helper/randomizers';
import { measureTime } from '../../../helper/timeCounter';

test.describe.serial('Account setup', () => {
  let userId: string;
  let token: string;

  const credentials = {
    userName: usernameRandom(8),
    password: passwordRandom(8),
  };
  console.log('Credentials for tests:', credentials);

  test.beforeAll(async ({ request }) => {
    await test.step('Create user', async () => {
    const response = await request.post(
      '/Account/v1/User',
      { data: credentials }
    );
      const body = await response.json();
      console.log(body);
      expect(response.status()).toBe(201);
      userId = body.userID;
  });

  await test.step('Generate token', async () => {
    const response = await request.post(
      '/Account/v1/GenerateToken',
      { data: credentials }
    );
      const body = await response.json();
      console.log(body);
      expect(response.status()).toBe(200);
      token = body.token;
      });
  });

  test('Get user by id @positive', async ({ request }) => {
    const { result: response, duration } = await measureTime(() => request.get(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ));
      const body = await response.json();
      console.log(body);
      expect(response.status()).toBe(200);
      expect(body.userId).toBe(userId);
      expect(body.username).toBe(credentials.userName);
      expect(duration).toBeLessThan(1500);
  });
  
  test('Delete user @positive', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.delete(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ));
      const text = await response.text();
      expect(text).toBe('');
      expect(response.status()).toBe(204);
      expect(duration).toBeLessThan(1500);
  });

    test('Get non-existing user by id @negative', async ({ request }) => {
    const response = await request.get(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      const body = await response.json();
      console.log(body);
      expect(response.status()).toBe(401);
      expect(body).toEqual({"code": "1207", "message": "User not found!"});
  });

    test('Delete non-existing user @negative', async ({request}) => {
    const response = await request.delete(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      const body = await response.json();
      expect(body).toEqual({"code": "1207", "message": "User Id not correct!"});
      expect(response.status()).toBe(200);
  });
});
