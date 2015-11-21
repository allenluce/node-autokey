function Autokey(key, alphabet) {
  this.key = key;
  this.alphabet = alphabet;
  this.betaalph = [];
  for (var i = 0, ii = alphabet.length; i < ii; ++i) {
    this.betaalph[alphabet[i]] = i;
  }
}

Autokey.prototype.encode = function(raw) {
  var res = "";
  var cipher = this.key.length;
  var cc = cipher;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0) {
        var k = this.key[i].charCodeAt(0) % this.alphabet.length;
        res += this.alphabet[(this.betaalph[raw[i]] + k) % this.alphabet.length];
      } else {
        res += this.alphabet[(this.betaalph[raw[i]] + this.betaalph[res[i - cipher]]) % this.alphabet.length];
      }
    }
  }
  return res;
}

Autokey.prototype.decode = function(raw) {
  var res = "";
  var cipher = this.key.length;
  var cc = cipher;
  for (var i = 0, ii = raw.length; i < ii; ++i) {
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0) {
        var k = this.key[i].charCodeAt(0) % this.alphabet.length;
        res += this.alphabet[(this.betaalph[raw[i]] - k + this.alphabet.length) % this.alphabet.length];
      } else {
        res += this.alphabet[(this.betaalph[raw[i]] - this.betaalph[raw[i - cipher]] + this.alphabet.length) % this.alphabet.length];
      }
    }
  }
  return res;

}

module.exports = Autokey;
