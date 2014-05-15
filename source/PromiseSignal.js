(function () {
  "use strict";

  Class('signals.PromiseSignal', { Extends: signals.Signal,

    _originalDispatchMethod: null,

    /**
     *
     * @class signals.PromiseSignal
     *
     * @classdesc
     * PromiseSignal extends the Signal class to return a new promise
     * for every dispatch call. The promise *fulfill* and *reject* methods
     * are given to all signal listeners so that any listener can fulfill
     * or reject the promise.
     *
     * This is pretty awesome for decoupled systems that talk via signals
     * and commands. With the promises there is now an informal approach
     * for a command to give an answer about the result of the operation.
     *
     * The code that dispatches the signal (and possibly triggers some
     * other action somewhere in the system) often wants to know if the
     * triggered operation was successful or not.
     *
     * @initialize
     * The PromiseSignal constructor does not take any parameters.
     *
     * @example
     * <caption>
     *   <h4>Creating and Using a PromiseSignal</h4>
     *   This example shows how to setup a PromiseSignal
     *   that has one listener which fulfills the promise
     *   immediately. The fulfillment listener is invoked
     *   because it was registered as first argument to the
     *   dispatch(…).then() method of the promise.
     * </caption>
     *
     * var promiseSignal = new signals.PromiseSignal(),
     *     fulfillData = {},
     *     dispatchData = {};
     *
     * function signalListener(data, promise) {
     *
     *    expect.equal(data, dispatchData, 'Expected to receive dispatched data')
     *
     *    // here the listener fulfills the promise!
     *    promise.fulfill(fulfillData);
     * }
     *
     * // when the listener fulfills the promise this function is called
     * function promiseFulfilledListener(data) {
     *    expect.equal(data, fulfillData, 'Expected fulfill data');
     * }
     *
     * promiseSignal.add(signalListener);
     * promiseSignal.dispatch(dispatchData).then(promiseFulfilledListener);
     *
     * @memberof! <global>
     */

    Constructor: function() {

      // let super class construct this signal
      signals.Signal.apply(this, arguments);

      // save reference to original dispatch of signals.Signal
      this._originalDispatchMethod = this.dispatch;

      // replace the original dispatch method by our wrapper
      this.dispatch = this.Class.prototype.dispatch;
    },

    /**
     * Dispatches the signal like the base class but returns
     * a new promise object and provides all listeners with
     * the promise *fulfill* and *reject* functions.
     *
     * @param {*} any data that should be dispatched to the listeners
     *
     * @returns {Promise} A Promise A/+ instance
     *
     * @memberof signals.PromiseSignal#
     */

    dispatch: function() {

      var argumentsArray = Array.prototype.slice.call(arguments),
          This = this;

      return new Promise(function(fulfill, reject) {

        if(This.getNumListeners() == 0) {
          fulfill();
        }
        else {

          argumentsArray.push({
            fulfill: fulfill,
            reject: reject
          });

          // call the original dispatch method with the promise
          This._originalDispatchMethod.apply(This, argumentsArray);
        }

      });

    }

  });

}());
