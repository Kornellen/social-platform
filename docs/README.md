# Installation

## 1. Clone Repository from GitHub using the following command

```bash
git clone "https://github.com/Kornellen/social-platform.git"
```

## 2. Install the required packages

You can install them using npm or yarn. All of them are in `client/` and `server/api` folders

### using npm

```bash
npm install
```

### using yarn

```bash
yarn install
```

## 3. Create Prisma Migration

```bash
npx  prisma migrate dev
```

## Running the Application

### using npm

In folders `server/api` and `client/` run the following commands:

```bash
npm run dev
```

### using yarn

In folders `server/api` and `client/` run the following commands:

```bash
yarn run dev
```

# Generate Secret Key

## Generate a secret key using command below in your terminal

```bash

# Generate  secret key and log  it in console

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

# .env File Structure

In folder `server/api` create a .env file with the following structure:

```env
DATABASE_URL="mysql://USER:@SERVER:MYSQLPORT/social_platform"
APP_PORT=PORT
SECRET_KEY=SECRET_KEY_GENERATED_BEFORE
```

Replace `USER`, `SERVER`, `MYSQLPORT`, `PORT` and `SECRET_KEY_GENERATED_BEFORE` with your actual database credentials and secret key.
