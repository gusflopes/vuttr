# entrypoint.sh
# Production Environment

npx sequelize db:migrate
npm run build
npm run start
