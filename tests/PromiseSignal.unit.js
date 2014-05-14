
Tinytest.add('PromiseSignal - Extends signals.Signal', function(expect) {

  var promiseSignal = new signals.PromiseSignal();

  expect.instanceOf(promiseSignal, signals.Signal);

});


Tinytest.add('PromiseSignal - Returns promise when dispatched', function(expect) {

  // SETUP
  var promiseSignal = new signals.PromiseSignal();

  // EXECUTE
  var returnValue = promiseSignal.dispatch();

  // VERIFY
  expect.instanceOf(returnValue, Promise);

});


Tinytest.add('PromiseSignal - Provides Promise callbacks to listeners', function(expect) {

  // SETUP
  var promiseSignal = new signals.PromiseSignal(),
      dispatchedData = {},
      listenerHasBeenCalled = false;

  function listener(data, promise) {

    listenerHasBeenCalled = true;

    // VERIFY
    expect.equal(data, dispatchedData, 'Expected to receive the data provided on dispatch.');
    expect.equal(typeof promise.fulfill, 'function', 'Expected promise.fulfill to be a function');
    expect.equal(typeof promise.reject, 'function', 'Expected promise.reject to be a function');
  }

  promiseSignal.add(listener);

  // EXECUTE
  promiseSignal.dispatch(dispatchedData);

  // VERIFY
  expect.isTrue(listenerHasBeenCalled);
});


Tinytest.addAsync('PromiseSignal - Listeners can fulfill promises', function(expect, done) {

  var promiseSignal = new signals.PromiseSignal(),
      fulfillData = {},
      dispatchData = {};

  function signalListener(data, promise) {
    expect.equal(data, dispatchData, 'Expected to signal listener to receive dispatched data')
    promise.fulfill(fulfillData);
  }

  function promiseFulfilledListener(data) {
    expect.equal(data, fulfillData, 'Expected fulfill data in promise fulfill listener');
    done();
  }

  promiseSignal.add(signalListener);
  promiseSignal.dispatch(dispatchData).then(promiseFulfilledListener);

});


Tinytest.addAsync('PromiseSignal - Listeners can reject promises', function(expect, done) {

  var promiseSignal = new signals.PromiseSignal(),
      rejectData = {},
      dispatchData = {};

  function signalListener(data, promise) {
    expect.equal(data, dispatchData, 'Expected to signal listener to receive dispatched data')
    promise.reject(rejectData);
  }

  function promiseRejectedListener(data) {
    expect.equal(data, rejectData, 'Expected fulfill data in promise fulfill listener');
    done();
  }

  promiseSignal.add(signalListener);
  promiseSignal.dispatch(dispatchData).then(null, promiseRejectedListener);

});

Tinytest.addAsync('PromiseSignal - Promises are immediately fulfilled if there are no signal listeners', function(expect, done) {

  var promiseSignal = new signals.PromiseSignal();

  function promiseFulfilledListener(data) {
    expect.isUndefined(data, 'Expected no fullfill data if no listener there');
    done();
  }

  promiseSignal.dispatch().then(promiseFulfilledListener);

});