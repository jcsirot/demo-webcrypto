WebCryptoAPI sample demo
========================

This example provides a simple AES encrypt/decrypt application and PBKDF#2

Start the demo
--------------

Run the command `maven clean package exec:java` and open your browser on http://localhost:8080/

Prerequisites
-------------

- Java 8
- Firefox 36 or later (The PBKDF#2 algorithm used for the generation of the key is not supported on Chrome 41 and
previous versions)