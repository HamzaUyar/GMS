# filepath: /home/yusufz/Documents/GMS/entrypoint.sh
#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Variables for DB connection (adjust if your wait script needs them)
# These might not be needed if wait-for-it uses the full host:port
# DB_HOST=$(echo $DATABASE_URL | awk -F[@:] '{print $4}')
# DB_PORT=$(echo $DATABASE_URL | awk -F[@:] '{print $5}' | cut -d'/' -f1)

# Wait for the database service to be ready
# Replace './wait-for-it.sh db:5432' with your actual wait script command
# Example using a common script: https://github.com/vishnubob/wait-for-it
# You'll need to add wait-for-it.sh to your project and COPY it in the Dockerfile
# Assuming DATABASE_URL is like postgresql://user:pass@host:port/db
DB_HOST_PORT=$(echo $DATABASE_URL | awk -F@ '{print $2}' | awk -F/ '{print $1}')
echo "Waiting for database at $DB_HOST_PORT..."
./wait-for-it.sh db:5432 --timeout=60 --strict -- echo "Database is up"

# Apply migrations
echo "Applying database migrations..."
npx prisma migrate deploy

# Run seeding
echo "Running database seeding..."
npx prisma db seed

# Execute the main container command (passed as arguments)
echo "Starting application..."
exec "$@"