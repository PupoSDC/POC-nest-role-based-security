import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/institution/1 (GET) (No AUTH) => 401', () => {
    return request(app.getHttpServer())
      .get('/institution/1')
      .expect(401);
  })

  it('/institution/1 (GET) (Worker 1) => 200', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/1')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  })

  it('/institution/2 (GET) (worker 2) => 403', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/1')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(403);
  })

  it('/institution/1/workers (GET) (worker 1) => 403', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/1')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/1/workers')
      .set('Authorization', 'Bearer ' + token)
      .expect(403);
  })

  it('/institution/1/workers (GET) (admin 5) => 200', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/5')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/1/workers')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  })

  it('/institution/1/worker/1 (GET) (admin 5) => 200', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/5')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/1/worker/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  })

  it('/institution/1/worker/4 (GET) (admin 5) => 404', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/5')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/institution/1/worker/4')
      .set('Authorization', 'Bearer ' + token)
      .expect(404);
  })

  it('/worker/1 (GET) (worker 1) => 200', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/1')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/worker/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  })


  it('/worker/1 (GET) (admin 5) => 200', async () => {
    const token = await request(app.getHttpServer())
      .post('/auth/login/5')
      .expect(201)
      .then((res) => res.body.access_token);

    return request(app.getHttpServer())
      .get('/worker/1')
      .set('Authorization', 'Bearer ' + token)
      .expect(200);
  })
});
