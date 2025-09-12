import request from "supertest";
import app from '../src/app.js';
import { expect } from 'chai';

describe('API de Users', function () {
    let apiRequest;
    beforeEach(() => {
        apiRequest = request(app);
    });

    //---

    // describe('POST /users', function() {
    //     it('debe crear un nuevo usuario exitosamente', function(done) {
    //         const newUser = { email: 'test@example.com', password: 'pass' };
    //         apiRequest
    //             .post('/api/user')
    //             .send(newUser)
    //             .expect(201)
    //             .end(done); // El done() se pasa directamente a .end()
    //     });
    // });

    //---

    describe('GET /users', function () {
        it('debe traer usuarios exitosamente', function (done) {
            apiRequest
                .get('/api/users')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    expect(res.body.status).to.equal('success');
                    expect(res.body.payload).to.be.an('array');
                    done(); // done() se llama al final del callback
                });
        });

        it('debe devolver 404 si la ruta no existe', function (done) {
            this.timeout(3000)
            apiRequest
                .get('/api/users/not-found')
                .expect(404)
                // .end(done); // done() se pasa directamente a .end()
                .end(function(err, res){
                    if (err) return done(err);
                    done()
                })
        });
    });
    describe('POST /users', function () {
        it('debe crear un nuevo usuario correctamente', function (done) {
            const mockData = { users: 1, pets: 0 };

            apiRequest
                .post('/api/mocks/generateData')
                // Envía el objeto con la estructura correcta
                .send(mockData)
                // Espera el código de estado 200 OK (o el que corresponda a la respuesta exitosa del servidor)
                .expect(201)
                .end(done);
        });
    });
});