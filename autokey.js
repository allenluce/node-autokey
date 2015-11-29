function Autokey(key, alphabet) {
  this.key = [];
  for (var i = 0, ii = key.length; i < ii; ++i)
    this.key[i] = key[i].charCodeAt(0);
  this.betaalph = [];
  for (var i = 0, ii = alphabet.length; i < ii; ++i) 
    this.betaalph[alphabet[i]] = i;
  this.alphabet = alphabet;
  this.keylen = key.length;
  this.alphalen = alphabet.length;
}

Autokey.prototype.encode = function(raw) {
  var res = "";
  var cc = this.keylen;
  var last = [];
  var k;
  for (var i = 0, ii = raw.length; i < ii; ++i)
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0)
        k = this.key[cc]
      else
        k = this.betaalph[last.shift()]

      var c = this.alphabet[(this.betaalph[raw[i]] + k) % this.alphalen];
      res += c;
      last.push(c);
    }
  return res;
}

Autokey.prototype.decode = function(raw) {
  var res = "";
  var cc = this.keylen;
  var last = [];
  var k;
  for (var i = 0, ii = raw.length; i < ii; ++i)
    if (this.betaalph[raw[i]] == undefined)
      res += raw[i]
    else {
      if (cc-- > 0)
        k = this.key[cc] % this.alphalen
      else
        k = this.betaalph[last.shift()]
      res += this.alphabet[(this.betaalph[raw[i]] - k + this.alphalen) % this.alphalen];
      last.push(raw[i]);
    }
  return res;
}

module.exports = Autokey;
