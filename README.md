# NBA Stats Web Application

A full-stack NBA statistics tracking application built with Next.js, TypeScript, PostgreSQL, and Docker. This project demonstrates modern web development practices with containerized development and provides a foundation for adding machine learning predictions.

## 🏀 Features

- **Dashboard**: Overview of recent games and top-performing teams
- **Teams**: Browse all NBA teams with win/loss records and conference standings
- **Games**: View recent game results with detailed scores and matchups
- **Players**: Search and filter players by team and position
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL 15 with Prisma ORM
- **Development**: Docker containers with VS Code Dev Containers
- **Styling**: Tailwind CSS with NBA-themed colors

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NBAdemo
```

### 2. Start the Application
```bash
docker-compose up --build
```

This command will:
- Build the Next.js application container using Debian-based Node.js image
- Start the PostgreSQL database container on port 5433 (to avoid conflicts)
- Install all dependencies and generate Prisma client
- Wait for database to be ready
- Push database schema to create tables
- Seed the database with sample NBA data (8 teams, 32 players, 10 games)
- Start the development server

### 3. Verify Everything is Working

**Watch the logs for these success messages:**
- `🏀 Starting NBA database seeding...`
- `✅ Created 8 teams`
- `✅ Created 32 players`
- `✅ Created 10 games`
- `🎉 Database seeding completed successfully!`
- `Ready - started server on 0.0.0.0:3000`

**Test these URLs:**
- **Web Application**: http://localhost:3000 (Should show NBA Dashboard)
- **API Test**: http://localhost:3000/api/teams (Should return JSON with teams)

### 4. Open in VS Code Dev Container (Optional)

1. Open VS Code in the project directory
2. Click the green button in the bottom-left corner ("><")
3. Select "Reopen in Container"
4. VS Code will connect to the running container with all development tools configured

### 5. Access Points

- **Web Application**: http://localhost:3000
- **Database**: localhost:5433 (from host machine)
- **Container Database**: postgres:5432 (from within containers)

## 🔧 Development Commands

Once inside the VS Code dev container, you can use these commands:

```bash
# Start development server (if not already running)
npm run dev

# Database commands
npm run db:push      # Push schema changes to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio (database GUI)
npm run db:generate  # Generate Prisma client

# Build and deployment
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
NBAdemo/
├── components/           # React components
│   ├── Layout.tsx       # Main layout with navigation
│   ├── GameCard.tsx     # Game result display
│   └── TeamCard.tsx     # Team information card
├── pages/               # Next.js pages and API routes
│   ├── api/            # Backend API endpoints
│   │   ├── teams.ts    # Teams API with win/loss calculation
│   │   ├── games.ts    # Games API with team details
│   │   ├── players.ts  # Players API with team filtering
│   │   └── standings.ts # Standings API with conference filtering
│   ├── index.tsx       # Dashboard page
│   ├── teams.tsx       # Teams listing with conference filter
│   ├── games.tsx       # Games listing with load more
│   ├── players.tsx     # Players listing with team/position filters
│   └── _app.tsx        # Next.js app wrapper
├── prisma/             # Database schema and seeds
│   ├── schema.prisma   # Database schema (Teams, Players, Games)
│   └── seed.ts         # Sample NBA data seeding script
├── lib/                # Utility functions
│   └── db.ts          # Prisma database connection
├── types/              # TypeScript type definitions
│   └── index.ts       # Shared types and interfaces
├── styles/             # CSS styles
│   └── globals.css    # Global styles with NBA theme
├── .devcontainer/      # VS Code dev container config
│   └── devcontainer.json
├── .vscode/            # VS Code settings
│   └── settings.json
├── docker-compose.yml  # Container orchestration
├── Dockerfile          # Node.js container definition
└── .env.local         # Environment variables
```

## 🗄 Sample Data Included

The application comes pre-loaded with:

### Teams (8 total)
**Western Conference:**
- Los Angeles Lakers, Golden State Warriors, Phoenix Suns, Denver Nuggets

**Eastern Conference:**
- Boston Celtics, Miami Heat, Milwaukee Bucks, Philadelphia 76ers

### Players (32 total)
Star players including LeBron James, Stephen Curry, Giannis Antetokounmpo, Jayson Tatum, and more (4 players per team)

### Games (10 total)
Recent matchups with realistic scores from the 2023-24 season

## 🔌 API Endpoints

All API endpoints return JSON responses with this structure:
```typescript
{
  success: boolean
  data: T[]
  message?: string
}
```

### Available Endpoints

- `GET /api/teams` - All teams with calculated win/loss records
- `GET /api/games?limit=10` - Recent games with team details (default 10)
- `GET /api/players?teamId=1` - All players with optional team filter
- `GET /api/standings?conference=Eastern` - Team standings with optional conference filter

### Example API Responses

**Teams endpoint** returns teams with calculated statistics:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Los Angeles Lakers",
      "city": "Los Angeles",
      "abbreviation": "LAL",
      "conference": "Western",
      "wins": 2,
      "losses": 1,
      "players": [...],
      "homeGames": [...],
      "awayGames": [...]
    }
  ]
}
```

## 🎨 Styling and Theming

The application uses Tailwind CSS with custom NBA-themed colors:

```css
nba-blue: #1D428A    /* NBA official blue */
nba-red: #C8102E     /* NBA official red */
nba-silver: #C4CED4  /* NBA official silver */
```

## 🐛 Troubleshooting

### Common Issues and Solutions

**Port 5432 already in use:**
- Fixed by using port 5433 for external access in docker-compose.yml

**Prisma compatibility errors (libssl.so.1.1):**
- Fixed by using Debian-based Node.js image instead of Alpine

**Database tables don't exist:**
- Fixed by automatic schema push and seeding in startup command

**Containers won't start:**
```bash
# Stop all containers and rebuild
docker-compose down
docker-compose up --build
```

**Database connection errors:**
```bash
# Reset database completely
docker-compose down -v  # Removes volumes
docker-compose up --build
```

**Port conflicts:**
```bash
# Check what's using ports
lsof -i :3000  # Web app
lsof -i :5433  # Database
# Change ports in docker-compose.yml if needed
```

**VS Code can't connect to container:**
1. Ensure Docker Desktop is running
2. Restart VS Code
3. Try "Dev Containers: Rebuild Container"

## ✅ Current Status

The application is **fully functional** with:
- ✅ Working Docker containers
- ✅ Database schema created and seeded
- ✅ All API endpoints operational
- ✅ Complete frontend with navigation
- ✅ Responsive design
- ✅ Real NBA sample data
- ✅ VS Code dev container support

## 🚀 Next Steps for Development

### Immediate Enhancements
1. **Expand sample data** - Add all 30 NBA teams and more players
2. **Add player statistics** - Points, rebounds, assists per game
3. **Enhanced game details** - Quarter scores, game highlights
4. **Search functionality** - Search teams and players by name
5. **Data validation** - Input validation for future data entry

### Advanced Features
1. **Data visualization** - Charts showing team performance trends
2. **Real NBA API integration** - Live data from NBA's official API
3. **User authentication** - User accounts and favorite teams
4. **Advanced statistics** - Player efficiency ratings, team analytics
5. **Game predictions** - Basic statistical predictions

### Machine Learning Integration
1. **Win prediction models** - Based on team statistics and matchups
2. **Player performance prediction** - Individual player stat predictions
3. **Season outcome modeling** - Playoff and championship probability
4. **Injury impact analysis** - How player injuries affect team performance
5. **Advanced analytics** - Shot efficiency, defensive ratings

### Technical Improvements
1. **Add testing** - Unit tests and integration tests
2. **Performance optimization** - Database query optimization
3. **Caching** - Redis for API response caching
4. **Error handling** - Better error pages and user feedback
5. **Deployment** - Production deployment setup

## 📊 Learning Objectives Achieved

- ✅ **Full-Stack Development**: Complete frontend and backend in one codebase
- ✅ **Database Design**: Relational data modeling with foreign keys and relationships
- ✅ **API Development**: RESTful endpoints with proper error handling
- ✅ **Container Technology**: Docker development environment setup
- ✅ **Modern JavaScript**: TypeScript, React hooks, async/await patterns
- ✅ **Version Control**: Git-ready project structure
- ✅ **Problem Solving**: Debugging container and compatibility issues

## 🎯 Perfect for Learning

This project provides:
- **Immediate satisfaction** - Working app with real data from day one
- **Scalable foundation** - Easy to add features and complexity
- **Modern practices** - Industry-standard tools and patterns
- **ML preparation** - Data structure ready for machine learning models
- **Portfolio worthy** - Demonstrates full-stack capabilities

---

🏀 **Ready to build the future of NBA analytics!** 🚀