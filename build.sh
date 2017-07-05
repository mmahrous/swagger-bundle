!#/bin/bash

#wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
#unzip swagger-editor.zip

git clone https://github.com/swagger-api/swagger-ui.git

npm install

sed '/    url: "http://petstore.swagger.io/v2/swagger.json",/c     url: "http://127.0.0.1/editor/spec",' swagger-ui/dist/index.html