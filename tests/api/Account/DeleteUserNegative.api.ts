import { test, expect } from '@playwright/test';
import { timeCounter } from '../../../helper/timeCounter';


test("Delete user without UserID un url returns HTML response @negative", async ({request}) => {
    const response = await request.delete('/Account/v1/User');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'];
    expect(contentType).toContain('text/html');
});

test("Delete user without auth header and incorrect UUID @negative", async ({request}) => {
    const response = await request.delete(`/Account/v1/User/1`, {
    headers: {
    //    Authorization : '',
    }
});
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(401);
    expect(body).toEqual({
      "code": "1200",
      "message": "User not authorized!"
    });
});

test("Delete user with empty auth header and incorrect UUID @negative", async ({request}) => {
    const response = await request.delete(`/Account/v1/User/1`, {
    headers: {
        Authorization : '',
    }
});
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(401);
    expect(body).toEqual({
      "code": "1200",
      "message": "User not authorized!"
    });
});

test("Delete user with incorrect auth token and incorrect UUID @negative", async ({request}) => {
    const response = await request.delete(`/Account/v1/User/1`, {
    headers: {
        Authorization : 'Bearer incorrect_token',
    }
});
    const body = await response.json();
    console.log(body);
    expect(response.status()).toBe(200);
    expect(body).toEqual({ code: '1207', message: 'User Id not correct!' });
});



        






