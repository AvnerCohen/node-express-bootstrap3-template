var assert = require("assert");

describe('String', function(){
  describe('toUpperCase', function(){
    it('should upperCase a string', function(){
      assert.equal("someshit".toUpperCase(), "SOMESHIT");
    });
  });
});

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    });
  });
});