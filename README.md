# About

This application provides the functionality to convert long URLs into short URLs. Users can sign up, login, convert their URLs and view/update their converted URLs. It also shows the total clicks made on the short URLs.

- Tech Stack: ReactJs, Vite, NodeJs, Express, MongoDB

# ENV Sample

- backend/.env

```bash

DB_URI="mongodb://127.0.0.1:27017/url-shortner"
JWT_SECRET="any secret"

```

## Steps to run locally

```bash

git clone https://github.com/ajfuturistics/url-shortner.git

cd url-shortner

cd backend && npm install

npm run dev

cd frontend && npm install

npm run dev

```
