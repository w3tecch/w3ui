'use strict';

describe('Service: noty', function () {

  // load the service's module
  beforeEach(module('w3uiFrontendApp'));

  // instantiate service
  var noty;
  beforeEach(inject(function (_noty_) {
    noty = _noty_;
  }));

  it('should do something', function () {
    expect(!!noty).toBe(true);
  });

});
