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
    expect(this.cipher.encode("WELLDONEISBETTERTHANWELLSAID")).to.equal("ONDFUCEZWZWCBASPHIQBBZMZNRJR");
  });

  it("decodes properly", function() {
    expect(this.cipher.decode("ONDFUCEZWZWCBASPHIQBBZMZNRJR")).to.equal("WELLDONEISBETTERTHANWELLSAID");
  });
     
  it("is reversible", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" ;
    var cipher = new autokey("somekey here", possible);
    var str = shuffle(possible);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });
  
  it("doesn't touch characters not in the plaintext alphabet", function() {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var cipher = new autokey("some other key her", possible);
    var str = "This is my text!"
    expect(cipher.encode(str)).to.match(/[A-Za-z0-9]{4} [A-Za-z0-9]{2} [A-Za-z0-9]{2} [A-Za-z0-9]{4}\!/);
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });

  it("Works with lots of non-alphabet in it", function() {
    var possible = "abcdefghijklmnopqrstuvwxyz";
    var cipher = new autokey("moy", possible);
    var str = "This has a lot of non-alphabet!"
    expect(cipher.decode(cipher.encode(str))).to.equal(str);
  });

  
});

