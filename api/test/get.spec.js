import chai from 'chai';
import chaiHttp from 'chai-http';
import tasksModel from '../models/task'

chai.use(chaiHttp);

const app = require('../app');
const request = chai.request.agent(app);
const expect = chai.expect;

describe('get', () => {

    context('quando eu tenho tarefas cadastradas', () => {
        before((done) => {
            let tasks = [
                { title: 'Estudar NodejS', owner: 'eu@papito.io', done: false },
                { title: 'Fazer compras', owner: 'eu@papito.io', done: false },
                { title: 'Estudar MongoDB', owner: 'eu@papito.io', done: true }
            ]

            tasksModel.insertMany(tasks);
            done();
        })

        it('deve retornar uma lista', (done) => {
            request
                .get('/task')
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data).to.be.an('array');
                    done();
                })
        })

        it('deve filtrar por palavra chave', (done) => {
            request
                .get('/task')
                .query({ title: 'Estudar' })
                .end((err, res) => {
                    expect(res).to.has.status(200);
                    expect(res.body.data[0].title).to.equal('Estudar NodejS');
                    expect(res.body.data[1].title).to.equal('Estudar MongoDB');
                    done();
                })
        })
    })

    context('quando eu busco por Id', () => {
        it('quando eu busco por id deve retornar uma unica tarefa', (done) => {
            let tasks = [
                { title: 'Ler um livro de JavaScript', owner: 'eu@papito.io', done: false },
            ]

            tasksModel.insertMany(tasks, (err, result) => {
                let id = result[0]._id
                request
                    .get('/task/' + id)
                    .end((err, res) => {
                        expect(res).to.has.status(200);
                        expect(res.body.data.title).to.equal('Ler um livro de JavaScript');
                        done();
                    })

            });

        })

        it('deve retornar 404', (done) => {
            let id = require('mongoose').Types.ObjectId();
            request
                .get('/task/' + id)
                .end((err, res) => {
                    expect(res).to.has.status(404);
                    expect(res.body).to.eql({});
                    done();
                })
        })

    })



})
