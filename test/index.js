import sinon from 'sinon';
import uuid from 'uuid';
import PropTypes from 'prop-types';
import hashmapProptype from '../src';

describe('hashmap prop type', () => {
  let consoleErrorStub;

  beforeEach(() => {
    consoleErrorStub = sinon.stub(console, 'error');
  });

  afterEach(() => {
    consoleErrorStub.restore();
  });

  it('should be a function', () => {
    expect(hashmapProptype).to.be.a('function');
  });

  it('should should be instanciated with 2 validators', () => {
    expect(() => hashmapProptype()).to.throw();
    expect(() => hashmapProptype(PropTypes.shape)).to.be.a('function');
  });

  it('should be chainable with isRequired', () => {
    expect(hashmapProptype(PropTypes.string, PropTypes.shape({
      test: PropTypes.string,
    })).isRequired).to.be.a('function');
  });

  it('should return null when the prop is not defined', () => {
    const props = {};
    const propName = 'myProp';
    const keyValidator = PropTypes.string;
    const shapeValidator = PropTypes.shape({
      text: PropTypes.string,
    });
    expect(hashmapProptype(keyValidator, shapeValidator)(props, propName)).to.equal(null);
  });

  it('should return error when prop is not an object', () => {
    const props = {
      myProp: 'test',
    };
    const propName = 'myProp';
    const keyValidator = PropTypes.string;
    const shapeValidator = PropTypes.shape({
      text: PropTypes.string,
    });
    const error = hashmapProptype(keyValidator, shapeValidator)(props, propName);
    expect(error).to.be.an.instanceOf(Error);
    expect(error.message).to.equal('myProp hashmap should be an object in ANONYMOUS');
  });

  it('should warn when the validation is not passed', () => {
    // PropTypes keeps a track of every error logged to not reprint them several times
    // so here is a little cache buster to be able to run the same test several times
    const key1 = `text${uuid.v4()}`;

    const props = {
      myProp: {
        abc: {
          test: 'meuh',
          [key1]: 'test',
        },
        12: {
          test: 'meuh',
          [key1]: null,
        },
      },
    };
    const propName = 'myProp';
    const shapeValidator = PropTypes.shape({
      [key1]: PropTypes.string.isRequired,
    });

    hashmapProptype(shapeValidator)(props, propName);

    expect(consoleErrorStub.called).to.be.true;
    expect(consoleErrorStub.args[0][0]).to.equal(
      `Warning: Failed myProp type: The myProp \`hashmapValues[0].${key1}\` is marked as required in \`ANONYMOUS\`, but its value is \`null\`.`);
  });

  it('should warn when the validation is not passed', () => {
    // PropTypes keeps a track of every error logged to not reprint them several times
    // so here is a little cache buster to be able to run the same test several times
    const key1 = `text-${uuid.v4()}`;
    const key2 = `symbol-${uuid.v4()}`;

    const props = {
      myProp: {
        abc: {
          test: 'meuh',
          [key1]: 'test',
          [key2]: Symbol('first'),
        },
        12: {
          test: 'meuh',
          [key1]: 12,
          [key2]: Symbol('second'),
        },
      },
    };
    const propName = 'myProp';

    const shapeValidator = PropTypes.shape({
      [key1]: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      [key2]: PropTypes.symbol,
    });

    hashmapProptype(shapeValidator)(props, propName);

    expect(consoleErrorStub.called).to.be.false;
  });
});
