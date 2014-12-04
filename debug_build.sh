emcc file.c -o file.raw.js --pre-js js/pre.js
cat js/header.js file.raw.js js/footer.js > file.js
