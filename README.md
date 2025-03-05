<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript for Boxfull test.

## Installation

```bash
$ yarn install
```

## Running the app

Before running the app you must have:
- An instance of [PostgreSQL](https://www.postgresql.org) database 
- An instance of [MongoDB](https://www.mongodb.com) database

For this you can use [Docker containers](https://www.docker.com) to have both instances running.

In the root project add a .env with the following params:
```bash
POSTGRES_DATABASE_URL=<your_postgres_database_url>

MONGO_DATABASE_URL=<your_mongodb_database_url>

JWT_SECRET=<your_jwt_secret>
```

next 

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Prisma commands
```bash
# Start a new migration
prisma migrate dev --name <migration_name>

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
## Documentation
If you want to check about endpoints, the project has a built-in swagger documentation route, you can access using the route

```hash
/docs
```
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Hector Matus](https://github.com/hmmatus)

## License

Nest is [MIT licensed](LICENSE).
