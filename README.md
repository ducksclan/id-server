# ID server

This is server of identification, authentification and authorization of the ducksclan application.

## Getting started

You need to clone source code from github repository and install dependencies
with any package manager.

```bash
$ git clone https://github.com/ducksclan/id-server.git "id-server"
$ cd ".\\id-server"
$ npm install
# or
$ yarn
```

Next you can run application in development mode by `dev` script or run it in
production mode by `build` and `start` scripts.

```bash
$ npm run dev
# or
$ npm run build
$ npm run start
```

You can run this by daemon process manager, for example,
[`pm2` module](https://github.com/Unitech/pm2).

## Routs

- `/token`
  - `/access`
    - `GET /public-key` sends the public key of the access token. The public key
      allows clients to verify the signature of access tokens.
    - `POST /verify` verifies the signature of access token.
  - `/refresh`
    - `GET /active` shows all information about all issued refresh tokens.
      Authorization is required.
      - `POST /remove` removes all refresh tokens from database. Authorization
        is required.
    - `GET /active/:id` shows all information about the specified refresh token.
      Authorization is required.
      - `POST /remove` removes the specified refresh token from database.
        Authorization is required.
    - `POST /` issues a new pair of jwt tokens. Refresh token is required into
      cookies. If the access token has expired, you can use the refresh token to
      get a new pair of jwt tokens.
    - `POST /verify` verifies the signature of refresh token and also verifies
      the refresh token against the database.
- `/account`
  - `GET /` sends information about the current user account. Authorization is
    required.
  - `GET /:id` sends an account information. Authorization is required.
    - `GET /full` sends full account information to other servers. Server token
      is required.
  - `POST /create` creates a user account by the specified email address and
    username, sends a verification code to the email and issues a pair of jwt
    tokens.
    - `POST /code` verifies the email address against the received code from the
      email. Authorization is required.
      - `POST /resend` sends a new verification code. Authorization is required.
  - `POST /login` sends a authentication code to the user's email.
    - `POST /code` verifies that you are the person who owns the email and
      issues a pair of jwt tokens.
  - `POST /logout` remove the issued refresh token from database and cookie
    files.

## Links

- [ducks.clan.app@gmail.com](mailto:ducks.clan.app@gmail.com)
- [github repository](https://github.com/ducksclan/id-server)
- [production server](http://id.ducksclan.ru)
