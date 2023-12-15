# python
FROM python:3

WORKDIR /usr/app

COPY requirements.txt /usr/app
COPY package.json /usr/app

RUN pip install --no-cache-dir -r requirements.txt
RUN python pyconfig.py

COPY . .

# node
FROM node:21-alpine3.18

WORKDIR /usr/app

COPY package.json /usr/app

RUN npm install

COPY . .

# running
CMD ["npm", "start"]
