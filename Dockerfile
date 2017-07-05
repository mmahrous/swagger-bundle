FROM node:boron-alpine

WORKDIR /app
ADD . .

# Update package manager and install packages
RUN apk update && apk add ca-certificates git wget unzip openssl

# Fetch swagger editor files
# RUN wget https://github.com/swagger-api/swagger-editor/releases/download/v2.10.4/swagger-editor.zip
# RUN unzip swagger-editor.zip

# Fetch swager UI files
# RUN git config http.postBuffer 524288000
RUN git clone https://github.com/swagger-api/swagger-ui.git

# npm 
RUN npm install

# Replace swagger ui API url with the local one 
RUN sed '/    url: "http://petstore.swagger.io/v2/swagger.json",/c     url: "http://127.0.0.1/editor/spec",' swagger-ui/dist/index.html

EXPOSE 8080
CMD ["npm", "start"]