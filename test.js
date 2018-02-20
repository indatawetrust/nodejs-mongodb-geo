import test from 'ava';
const request = require('supertest');
const app = require('./app')

test('GET /', async t => {

  const res = await request(app)
    .get('/')
    .expect('Content-Type', /json/)

  t.is(res.status, 200)

})

test('/drivers all tests', async t => {

  let res = null

  for (let i=0;i<5;i++) {
    res = await request(app)
      .post('/drivers/driver')
      .send({
        'name': "ahmet",
        'surname': "şimşek",
        'latitude': "41.5",
        'longitude': "28.9"
      })
      .expect('Content-Type', /json/)

    await request(app)
      .get(`/drivers/driver/${res.body.payload._id}`)
      .expect('Content-Type', /json/)

    res = await request(app)
      .put(`/drivers/driver/${res.body.payload._id}`)
      .send({
        'name': "ahmettttt",
        'surname': "şimşekkkkk",
        'latitude': "41.55555",
        'longitude': "28.999999"
      })
      .expect('Content-Type', /json/)

    await request(app)
      .del(`/drivers/driver/${res.body.payload._id}`)
      .expect('Content-Type', /json/)
  }

  for (let i=0;i<5;i++)
    await request(app)
      .post('/drivers/driver')
      .send({
        'name': "ahmet",
        'surname': "şimşek",
        'latitude': "41.5",
        'longitude': "28.9"
      })
      .expect('Content-Type', /json/)

    t.is(res.status, 200)

})

test('POST /ride', async t => {

  const res = await request(app)
    .post('/ride')
    .send({
      latitude: 41.5,
      longitude: 28.9
    })
    .expect('Content-Type', /json/)

  t.deepEqual({
    status: res.status,
    len: res.body.payload.length
  },{
    status: 200,
    len: 3
  })

})
