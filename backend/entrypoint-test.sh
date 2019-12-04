# Setup

docker run --name database -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -d postgres:12

yarn test:setup

yarn test
