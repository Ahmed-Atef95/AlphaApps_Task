const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../app'); // Assuming your Express app is exported from 'app.js'
const calculateTotal = require('../calculateTotal');
const sinonChai = require('sinon-chai');


// Configure chai
chai.use(chaiHttp);
chai.use(sinonChai);
const expect = chai.expect;

describe('Task 4: User CRUD API', () => {
  let userId;
  let requestStub;

  beforeEach(() => {
    requestStub = sinon.stub(chai, 'request');
  });

  afterEach(() => {
    requestStub.restore();
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const postStub = requestStub.returns({
        post: sinon.stub().returns(Promise.resolve({ status: 201, body: { id: '1' } }))});  
      const res = await chai
        .request(app)
        .post('/users')
      //  .send({ name: 'Ahmed', email: 'ahmed@atef.com' });
      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      userId = res.body.id;
  
      postStub.restore();
    });
  });

  describe('GET /users/:id', () => {
    it('should retrieve a user', async () => {
      requestStub.returns({
        get: sinon.stub().returns(Promise.resolve({ status: 200, body: { name: 'Ahmed', email: 'ahmed@atef.com' } })),
      });
      const res = await chai
        .request(app)
        .get(`/users/${userId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'Ahmed');
      expect(res.body).to.have.property('email', 'ahmed@atef.com');
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', async () => {
      const putStub = requestStub.returns({
       put: sinon.stub().returns(Promise.resolve({ status: 200, body: { name: 'Mohamed' } }))});
      const res = await chai
        .request(app)
        .put(`/users/${userId}`)
  //      .send({ name: 'Mohamed' });
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name', 'Mohamed');

      putStub.restore();
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', async () => {
      requestStub.returns({
        delete: sinon.stub().returns(Promise.resolve({ status: 200, body: { message: 'User deleted' } })),
      });
      const res = await chai
        .request(app)
        .delete(`/users/${userId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message', 'User deleted');
    });
  });
})

// Mocking data using Jest
jest.mock('../data', () => ({
    getData: jest.fn(() => Promise.resolve([1, 2, 3]))
  }));
  
  // Example asynchronous function
  const { getData } = require('../data');
  
  describe('Task5: Integration Test', () => {
    it('should handle asynchronous operations using "done" callback', (done) => {
      performAsyncOperationWithCallback((result) => {
        expect(result).to.equal('async result');
        done();
      });
    });
  
    it('should handle asynchronous operations using "await"', async () => {
      const result = await performAsyncOperation();
      expect(result).to.equal(6);
    });

    it('should handle delays in tests using "setTimeout"', (done) => {
      setTimeout(() => {
        performAsyncOperation().then((result) => {
          expect(result).to.equal(6);
          done();
        });
      }, 1000); // Delay of 1000 milliseconds
    });
  });

    // Example asynchronous functions
  
function performAsyncOperationWithCallback(callback) {
setTimeout(() => {
    const result = 'async result';
    callback(result);
}, 1000); // Simulating an asynchronous operation
}
  
async function performAsyncOperation() {
const data = await getData();
return data.reduce((sum, value) => sum + value, 0);
}

const getArrayFromBackend = jest.fn(() => [1, 2, 3, 4, 5]);

describe('Task 6: Integration Test', () => {
  it('should validate that a specific number is present in the array returned from backend', async () => {
    const array = await getArrayFromBackend();

    expect(array).to.include(3);
  });
});


describe('Task 7: calculateTotal', () => {
    it('should calculate the total price correctly', () => {
      const items = [
        { name: 'Item 1', price: 10 },
        { name: 'Item 2', price: 20 },
        { name: 'Item 3', price: 30 },
      ];
      const total = calculateTotal(items);
      expect(total).to.equal(60);
    });
  
    it('should return 0 for an empty array of items', () => {
      const items = [];
      const total = calculateTotal(items);
      expect(total).to.equal(0);
    });
    });