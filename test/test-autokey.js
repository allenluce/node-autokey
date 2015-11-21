var expect = require('chai').expect;
var autokey = require('../autokey');

var shuffle = function(str) {
  return str.split('').sort(function(){return 0.5-Math.random()}).join('');
};

describe("Autokey", function() {
  before(function() {
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var key = "SODFBOIBOEIBOISBDOBLBUVLIUBIEBEHFWF";
    this.cipher = new autokey(key, alphabet);
  });

  it("encodes properly", function() {
    expect(this.cipher.encode("WELLDONEISBETTERTHANWELLSAID")).to.equal("BFBDRPISJJWSUOJFJIOLKLTJNHWY");
  });

  it("decodes properly", function() {
    expect(this.cipher.decode("BFBDRPISJJWSUOJFJIOLKLTJNHWY")).to.equal("WELLDONEISBETTERTHANWELLSAID");
  });
     
  it("is reversible", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" ;
    var cipher = new autokey("somekey here", possible);
    var str = shuffle(possible);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
  it.only("doesn't touch characters not in the plaintext alphabet", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var cipher = new autokey("some other key her", possible);
    var str = "This is my text!"
    expect(cipher.encode(str)).to.match(/[A-Za-z0-9]{4} [A-Za-z0-9]{2} [A-Za-z0-9]{2} [A-Za-z0-9]{4}\!/);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
});

