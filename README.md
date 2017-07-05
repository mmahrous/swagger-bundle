# Swagger Bundle 
This is a bundle for Swagger UI and Swagger Editor embdedd with backend option to allow you smooth editing and viewing expreince. 
## Steps 
1. Clone the repo.
2. Run this commands to get it to run 
```sh
$ npm install
$ sh build.sh
$ npm start
```
Or you can use build docker image and run with docker

Share a local directory to save the yaml file
```sh
$ docker build -t swagger .
$ docker run -it -p 80:8080 -v ~/files:/app/files -d --name swagger swagger
```
#### License
Licensed under MIT

#### Author
The D. GmbH - M. Mahrous

Feel free to contact us [M. Mahrous](mailto:m.mahrous@thed.io) and improve the code.