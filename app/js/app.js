$(function() {

    $("#encrypt").click(function(e) {
        var message = $("#messageArea").val();
        var password = $("#password").val();
        var salt = window.crypto.getRandomValues(new Uint8Array(16));
        generateKey(password, salt)
            .then(function(key) {
                return encrypt(key, str2bin(message));
            })
            .then(function(obj) {
                var encryptedMessage = {
                    salt: b64encode(salt),
                    iv: b64encode(obj.iv),
                    encrypted: b64encode(obj.encrypted)
                };
                $("#messageArea").val(JSON.stringify(encryptedMessage));
            })
            .catch(function(e) {
                $("#messageArea").val("ERROR: " + e);
                console.error(e);
            });
    });

    $("#decrypt").click(function(e) {
        var json = JSON.parse($("#messageArea").val());
        var password = $("#password").val();
        var salt = b64decode(json.salt);
        var iv = b64decode(json.iv);
        var encrypted = b64decode(json.encrypted);
        generateKey(password, salt)
            .then(function(key) {
                return decrypt(key, iv, encrypted);
            })
            .then(function(plain) {
                $("#messageArea").val(bin2str(plain));
            })
            .catch(function(e) {
                $("#messageArea").val("ERROR: " + e);
                console.error(e);
            });
    });

});
