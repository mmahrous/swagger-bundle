FROM node:boron-alpine

MAINTAINER M.Mahrous <m.mahrous@thed.io>

WORKDIR /app
ADD . .

# Update package manager and install packages
RUN apk update && apk add ca-certificates git wget unzip openssl

# Fetch swagger editor files
RUN wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
RUN unzip swagger-editor.zip
# Allow backend backup 
RUN sed -i 's%"useBackendForStorage": false%"useBackendForStorage"\: true%g' "swagger-editor/config/defaults.json"
RUN sed -i 's%"useYamlBackend": false%"useYamlBackend": true%g' "swagger-editor/config/defaults.json"
RUN sed -i 's%"disableNewUserIntro": false%"disableNewUserIntro": true%g' "swagger-editor/config/defaults.json"

# Fetch swager UI files
# RUN git config http.postBuffer 524288000
RUN git clone https://github.com/swagger-api/swagger-ui.git

# npm
RUN npm install

# Replace swagger ui API url with the local one
RUN sed -i "s%http://petstore.swagger.io/v2/swagger.json%/editor/spec%g" "swagger-ui/dist/index.html"

EXPOSE 8080
CMD ["npm", "start"]