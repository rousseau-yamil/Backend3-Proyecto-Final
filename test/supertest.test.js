import request from "supertest";
import app from '../src/app.js';
// Deberías importar expect de Chai, pero lo omito aquí para no cambiar tu código base.

describe('API de mascotas', function() {
    let apiRequest;

    beforeEach(() => {
        apiRequest = request(app);
    });

    describe('GET /pets', function() {
        it('debe devolver una lista de mascotas en JSON con status de éxito', function(done) {
            apiRequest
                .get('/api/pets')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    if (res.body.status !== 'success') {
                        return done(new Error('Expected status to be success'));
                    }
                    if (!Array.isArray(res.body.payload)) {
                        return done(new Error('Expected payload to be an array of pets'));
                    }
                    done(); // done() se llama al final del callback
                });
        });

        it('debe devolver 404 si la ruta no existe', function(done) {
            this.timeout(3000)
            apiRequest
                .get('/api/pets/not-found')
                .expect(404)
                // .end(done); // done() se pasa directamente a .end()
                .end(function(err,res){
                    if (err) return done(err);
                    done()
                })
        });
    });

    // describe('POST /pets', function() {
    //     it('debe crear un nuevo pet exitosamente', function(done) {
    //         const newPet = { name: 'Pipo', species: 'Perro', age: 5 };
    //         apiRequest
    //             .post('/api/pets')
    //             .send(newPet)
    //             .expect(201)
    //             .end(done); // done() se pasa directamente a .end()
    //     });
    // });
     describe('POST /pets', function() {
        it('debe crear un nueva mascota correctamente exitosamente', function(done) {
            const mockData = { users: 0, pets: 1 }; 

        apiRequest
            .post('/api/mocks/generateData')
            // Envía el objeto con la estructura correcta
            .send(mockData) 
            // Espera el código de estado 200 OK (o el que corresponda a la respuesta exitosa del servidor)
            .expect(201) 
            .end(done);
        });
    });
    // /api/mocks/generateData
    // console.log("fin de supertest")
});