!#/bin/bash

# Fetch swagger editor files
wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
unzip swagger-editor.zip

# Fetch swager UI files
git clone https://github.com/swagger-api/swagger-ui.git

# npm
npm install

# Replace swagger ui API url with the local one
sed -i "s%http://petstore.swagger.io/v2/swagger.json%/editor/spec%g" "swagger-ui/dist/index.html"

echo "Done building happy documenting :D"