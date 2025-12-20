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
  const invalidToken = `eyJ1c2VyTmFtZSI6IjEiLCJwYXNzd29yZCI6IlF3ZXJ0eTExISIsImlhdCI6MTc2NjIzMz`
  const invalidUserId = `b6103a74-1c3f-48e8-883d-85ccf9f32336`;
  console.log('Random set of credentials for tests:', credentials);

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

  test('GET user by id @positive', async ({ request }) => {
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

    test('GET user with incorrect token @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.get(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${invalidToken}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1200", "message": "User not authorized!"});
      expect(response.status()).toBe(401);
      expect(duration).toBeLessThan(1500);
  });

    test('GET user without token @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.get(
      `/Account/v1/User/${userId}`,
      {
        headers: {
         // Authorization: `Bearer ${token}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1200", "message": "User not authorized!"});
      expect(response.status()).toBe(401);
      expect(duration).toBeLessThan(1500);
  });

    test('GET user with incorrect only UUID @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.get(
      `/Account/v1/User/${invalidUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1207", "message": "User not found!"});
      expect(response.status()).toBe(401);
      expect(duration).toBeLessThan(1500);
  });

    test('DELETE user without token @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.delete(
      `/Account/v1/User/${userId}`,
      {
        headers: {
         // Authorization: `Bearer ${token}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1200", "message": "User not authorized!"});
      expect(response.status()).toBe(401);
      expect(duration).toBeLessThan(1500);
  });

    test('DELETE user with only incorrect token @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.delete(
      `/Account/v1/User/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${invalidToken}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1200", "message": "User not authorized!"});
      expect(response.status()).toBe(401);
      expect(duration).toBeLessThan(1500);
  });

    test('DELETE user with incorrect only UUID @negative', async ({request}) => {
    const { result: response, duration } = await measureTime(() => request.delete(
      `/Account/v1/User/${invalidUserId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ));
      const body = await response.json();
      expect(body).toEqual({"code": "1207", "message": "User Id not correct!"});
      expect(response.status()).toBe(200);
      expect(duration).toBeLessThan(1500);
  });
  
  test('DELETE user @positive', async ({request}) => {
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

    test('GET non-existing user by id @negative', async ({ request }) => {
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

    test('DELETE non-existing user @negative', async ({request}) => {
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
