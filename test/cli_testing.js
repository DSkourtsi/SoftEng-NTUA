const axios = require('axios');
const { exec } = require('child_process');
const { expect } = require('chai');
const fs = require('fs');
const FormData = require('form-data');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Set NODE_TLS_REJECT_UNAUTHORIZED to 0


describe('CLI commands', function() {

  beforeEach(function(done) {
    setTimeout(function() {
      done();
    }, 1000);
  });

  it('healthcheck request sent to the API', function(done)  {
    exec('se2299 healthcheck', (error, stdout, stderr) => {
      axios.get('https://localhost:9103/intelliq_api/admin/healthcheck')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('resetall request sent to the API', function(done) {
    exec('se2299 resetall', (error, stdout, stderr) => {
      axios.post('https://localhost:9103/intelliq_api/admin/resetall')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('questionnaire_upd request sent to the API', function(done) {
    exec('se2299 questionnaire_upd --source dummy.json', { cwd: path.join(path.resolve('.'), '..', 'cli') }, (error, stdout, stderr) => {
        const filePath = './data/dummy.json';
        const fileStream = fs.createReadStream(filePath);
        const formData = new FormData();
        formData.append('file', fileStream, { filename: 'file.txt' });

      axios.post('https://localhost:9103/intelliq_api/admin/questionnaire_upd', formData, {
        headers: formData.getHeaders(),
        })
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('resetq request sent to the API', function(done) {
    exec('se2299 resetq --questionnaire_id 1111', (error, stdout, stderr) => {
      axios.post('https://localhost:9103/intelliq_api/admin/resetq/1111')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('questionnaire request sent to the API', function(done) {
    exec('se2299 questionnaire --questionnaire_id 1111', (error, stdout, stderr) => {
      axios.get('https://localhost:9103/intelliq_api/questionnaire/1111')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('question request sent to the API', function(done) {
    exec('se2299 resetq --questionnaire_id 1111 --question Q02', (error, stdout, stderr) => {
      axios.get('https://localhost:9103/intelliq_api/question/1111/Q02')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('doanswer request sent to the API', function(done) {
    exec('se2299 doanswer --questionnaire_id 1111 --question_id Q03 --session_id aaaa --option_id Q03A1', (error, stdout, stderr) => {
      axios.post('https://localhost:9103/intelliq_api/doanswer/1111/Q03/aaaa/Q03A1')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('getsessionanswers request sent to the API', function(done) {
    exec('se2299 doanswer --questionnaire_id 1111 --session_id aaaa', (error, stdout, stderr) => {
      axios.get('https://localhost:9103/intelliq_api/getsessionanswers/1111/aaaa')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
  it('getquestionanswers request sent to the API', function(done) {
    exec('se2299 doanswer --questionnaire_id 1111 --question_id Q03', (error, stdout, stderr) => {
      axios.get('https://localhost:9103/intelliq_api/getquestionanswers/1111/Q03')
        .then((response) => {
          expect(response.status).to.equal(200);
          done();
        })
        .catch((error) => done(error));
    });
  });
});
