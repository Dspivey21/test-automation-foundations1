const chai = require('chai');
const sinon = require('sinon');
const errorHandler = require('../../middleware/errorHandler');
const { expect } = chai;

describe('Middleware: errorHandler', () => {
  it('should return 500 status with error message', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    errorHandler(err, req, res, next);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWith({ error: 'Something went wrong!' })).to.be.true;
  });

  it('should not call next', () => {
    const err = new Error('Test error');
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    errorHandler(err, req, res, next);

    expect(next.notCalled).to.be.true;
  });
});
