# entrypoint.sh

# Sequelize Migration
npx sequelize db:migrate

# Start server
if [ "$NODE_ENV" = "development" ]; \
	then npm run dev;  \
	else npm run build && npm run start; \
	fi
