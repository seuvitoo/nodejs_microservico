import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('post', () => {
    context('quando eu cadastro uma tarefa', () => {
        let task = { title: 'Estudar Mongoose', owner: 'victor@io.com', done: false }

        it('então deve retornar 200', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data.title).to.be.an('string');
                    expect(res.body.data.owner).to.be.an('string');
                    expect(res.body.data.done).to.be.an('boolean');
                    done();
                })
        });
    })

    context('quando não informo o titulo', () => {
        let task = { title: '', owner: 'victor@io.com', done: false }

        it('então deve retornar 400', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400);

                    expect(res.body.errors.title.message).to.eql('Oops!Você está tentando cadastrar uma tarefa sem titulo')
                    done();
                })
        });
    })

    context('quando não informo o owner', () => {
        let task = { title: 'Nova Tarefa', owner: '', done: false }

        it('então deve retornar 400', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(400);
                    expect(res.body.errors.owner.message).to.eql('Oops!Todas as tarefas precisam de um dono')
                    done();
                })
        });
    })

    context('quando a tarefa já existe', () => {
        let task = { title: 'Planeja viagem pra china', owner: 'victor@io.com', done: false }

        before((done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(200)
                    done()
                })


        })

        it('então deve retornar 409', (done) => {
            request
                .post('/task')
                .send(task)
                .end((err, res) => {
                    expect(res).to.has.status(409)
                    expect(res.body.errmsg).to.include('duplicate key')
                    done();
                })
        });
    })





})