import  request  from "supertest";
import app from "../../app.js";
import path from "path"
describe('POST /upload', function(){
    it('debe hacer un upload de un archivo correctamente', function (done) {
        request(app)
        .post('/api/pets/withimage')
        .attach('image',path.resolve(__dirname,'../../public/img/1671549990926-coderDog.jpg'))
        //.send({email:'testuser@example.com', password:'testpassword'}) //prueba de credenciales
        .expect(200) //espera un 200
        //.expect('Content-Type',/json/) //respuesta un json
        //.expect('Set-Cookie',/connect.sid/)
        .end(function (err,res){
            if(err) return done(err)
                //aca realizar validaciones
            if(res.body.status!=='success'){
                return done(new Error('File upload failed'))
            }
            done()
        })
    })
})