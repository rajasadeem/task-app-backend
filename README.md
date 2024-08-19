# Task App Backend

# Steps to Run

- Set up environment variables

> create a .env file in the root directory of your project and configure it according to the .env.sample file provided.

- Install dependencies

```
pnpm install
```

- Run migrations

```
pnpm migrate:up
```

- Run server

1. for prod

```
pnpm build
```

```
pnpm start
```

2. for dev

```
pnpm dev
```
