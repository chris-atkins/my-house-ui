FROM centos:7

RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum -y install nodejs
RUN npm install -g @angular/cli

COPY ./src ./app/src
COPY package-lock.json ./app/package-lock.json
COPY package.json ./app/package.json
COPY node-app.js ./app/node-app.js
COPY angular.json ./app/angular.json
COPY tsconfig.json ./app/tsconfig.json
COPY tslint.json ./app/tslint.json

WORKDIR "/app"
RUN npm install
RUN ng build --prod
EXPOSE 8000
CMD ["node", "node-app.js"]
