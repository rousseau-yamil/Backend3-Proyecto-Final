import  request  from "supertest";
import app from "../../app.js";

describe('POST /login', function(){
    it('debe loguearse correctamente y setear una coockie session', function (done) {
        request(app)
        .post('/api/sessions/login')
        .send({email:'testuser@example.com', password:'testpassword'}) //prueba de credenciales
        .expect(200) //espera un 200
        .expect('Content-Type',/json/) //respuesta un json
        .expect('Set-Cookie',/connect.sid/)
        .end(function (err,res){
            if(err) return done(err)
            if(res.body.status!=='success'){
                return done(new Error('Login failed, expected status to be success'))
            }
            done()
        })
    })
})