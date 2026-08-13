# Campus Event Organizer

Group 3 Members: Jashandeep Sangha, Aaron Sieunarine, Keegan Morris

## Setup

### Database
1. Run local MySQL server
2. Run SQL queries from `SQL/database.sql` and `SQL/Infoinside.sql`

### Environment (.env in express-api folder)
```
JWT_SECRET=my-super-secret-key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=college_events
DB_PORT=3306
```

### Backend
1. `cd express-api`
2. `npm install` (if needed)
3. `npm run dev`
4. Runs on http://localhost:3000

### Frontend
1. Open new terminal
2. `cd client`
3. `npm install` (if needed)
4. `npm run dev`
5. Runs on http://localhost:5173

## API Routes
- `/api/users` - User authentication
- `/api/events` - Events
- `/api/registrations` - Registrations
- `/api/colleges` - Colleges