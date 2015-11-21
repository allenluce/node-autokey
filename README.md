# Autokey

A Javascript implementation of the [Autokey cipher](https://en.wikipedia.org/wiki/Autokey_cipher).

This is similar to and based on the stream cipher implementation at
[https://github.com/hex7c0/autokey](https://github.com/hex7c0/autokey)
but restricts the input and output alphabets to a given set.  This
makes it handy for producing human-readable textual output.

## How it works

To install:

    npm install node-autokey

Usage example:

```javascript
var Autokey = require('node-autokey');
var assert = require('assert')

var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

var akey = new Autokey("My Key Is This@)(#*$", alphabet);

var input = "Something very important!";
var ciphertext = akey.encode(input);
console.log(ciphertext);
var recoveredtext = akey.decode(ciphertext);
assert.equal(recoveredtext, input);
```
