'use strict';

const assert = require('chai').assert;
const Flakeless = require('..');

describe('Flakeless base10 output', function() {
  it('is an object', function() {
    const flakeless = new Flakeless({
      outputType: 'base10'
    });

    assert.equal(typeof flakeless, 'object');
    assert.instanceOf(flakeless, Flakeless);
  });

  it('returns a string', function() {
    const flakeless = new Flakeless({
      outputType: 'base10'
    });

    const id = flakeless.next();

    assert.typeOf(id, 'string');
  });

  it('increases', function() {
    // Define a Flakeless counter that outputs in base10.
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10'
    });

    // Generate a bunch of IDs.
    const ids = [];
    for (let i = 0; i < 1000; ++i) {
      ids.push(parseInt(flakeless.next(), 10));
    }

    // Sort the IDs.  If the output of next is increasing, this should be exact
    //   same as the not-yet-sorted array.
    const sortedIds = ids.sort();
    assert.deepEqual(ids, sortedIds);
  });

  it('is monotonic', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10'
    });

    // Generate a bunch of IDs.
    const ids = [];
    for (let i = 0; i < 1000; ++i) {
      ids.push(parseInt(flakeless.next(), 10));
    }

    // Sort the IDs and remove duplicates.  If the output is monotonic, the
    //   length of the two array should be the same.
    const sortedIds = ids.sort().reduce(function(prev, curr) {
      return (curr === prev[0]) ? prev : [curr].concat(prev);
    }, []);
    assert.lengthOf(sortedIds, 1000);
  });

  it('has an encoded timestamp', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now() - 200,
      outputType: 'base10',
      workerID: 0x3ff
    });

    const id = flakeless.next();
    assert.isAtLeast(id >> 22, 100);
  });

  it('has an encoded worker ID', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 34
    });

    const id = flakeless.next();

    assert.equal((id & 0x3ff000) >> 12, 34);
  });

  it('has a properly sized workerID', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 0xffffffff
    });

    const id = flakeless.next() >> 12;

    assert.equal(id & 0x3ff, 0x3ff);
  });

  it('has an encoded counter', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 0x3ff
    });

    const id = flakeless.next();

    assert.oneOf(id & 0xfff, [0, 1]);
  });

  it('has an encoded timestamp for workerIdNumBits = 16', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now() - 6,
      outputType: 'base10',
      workerID: 0x3ff,
      workerIDNumBits: 16
    });

    const id = flakeless.next();
    assert.isAtLeast(id >> 28, 6);
  });

  it('has an encoded worker ID for workerIdNumBits = 16', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 34,
      workerIDNumBits: 16
    });

    const id = flakeless.next();

    assert.equal((id & 0xffff000) >> 12, 34);
  });

  it('has a properly sized workerID for workerIdNumBits = 16', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 0xffffffff,
      workerIDNumBits: 16
    });

    const id = flakeless.next() >> 12;

    assert.equal(id & 0xffff, 0xffff);
  });

  it('has an encoded counter for workerIdNumBits = 16', function() {
    const flakeless = new Flakeless({
      epochStart: Date.now(),
      outputType: 'base10',
      workerID: 0x3ff,
      workerIDNumBits: 16
    });

    const id = flakeless.next();

    assert.oneOf(id & 0xfff, [0, 1]);
  });
});
