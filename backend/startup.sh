sleep 5
npx prisma db push --accept-data-loss
npx prisma db seed
npm run start:prod

