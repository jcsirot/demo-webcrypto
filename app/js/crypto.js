/**
 * Encrypt the message with the given key
 * @param {CryptoKey} key - the key
 * @param {Uint8Array} message - the message to encrypt
 *
 * @returns {Promise<Object>} a promise of {encrypted: ..., iv:...}
 */
function encrypt(key, message) {
    //alert("encrypt not yet implemented");
    //throw "encrypt not yet implemented";

    // Promise<any> encrypt(AlgorithmIdentifier algorithm,
    //                      CryptoKey key, BufferSource data);

    var iv = window.crypto.getRandomValues(new Uint8Array(16));
    var algo = {
        name: "AES-GCM",
        iv: iv
    };
    return window.crypto.subtle.encrypt(algo, key, message)
        .then(function(encrypted) {
            return {
                encrypted: encrypted,
                iv: iv
            };
        });
}

/**
 * Decrypt the encrypted message with the key and IV
 * @param {CryptoKey} key - the key
 * @param {Uint8Array} iv - the algorithm Initialization Vector
 * @param {Uint8Array} encrypted - the encrypted message
 *
 * @returns {Promise<Uint8Array>} a promise of decrypted message
 */
function decrypt(key, iv, encrypted) {

    // Promise<any> decrypt(AlgorithmIdentifier algorithm,
    //                      CryptoKey key, BufferSource data);
    var algo = {
        name: "AES-GCM",
        iv: iv
    };
    return window.crypto.subtle.decrypt(algo, key, encrypted);

}

/**
 * Generate an AES symmetric key from a password with PBKDF#2
 * @param {String} password - the password
 * @param {Uint8Array} salt - a random salt value
 *
 * @returns {Promise<CryptoKey>} a promise of key
 */
function generateKey(password, salt) {
    var pbkdfAlgo = {
        name: "PBKDF2",
        hash: "SHA-1",
        salt: salt,
        iterations: 2000
    };
    var keyGenAlgo = {
        name: "AES-GCM",
        length: 128
    }
    return window.crypto.subtle.importKey("raw", new str2bin(password), {name:"PBKDF2"}, false, ["deriveKey"])
        .then(function(password) {
            return window.crypto.subtle.deriveKey(pbkdfAlgo, password, keyGenAlgo, false, ["encrypt", "decrypt"]);
        });
}










