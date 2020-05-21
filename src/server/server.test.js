import "regenerator-runtime/runtime";
import app from './index';
import supertest from 'supertest';
const request = supertest(app)


test('Async test', async (done) => {
    const response = await request.get('/test');

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('pass!')
    done()
  })

  describe("Testing server side", () => {
    test('Post test', async (done) => {
    const response = await request.post('/tripp/add', {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            city: 'Zagreb',
            lat: 45.8311018805949,
            lng: 15.980320336341858,
            start: '2020-05-20',
            end: '2020-05-20'
          })
      });
    expect(response.statusCode).toEqual(200)
    expect(response.body.message).toEqual("OK")
    done()
    })
})
