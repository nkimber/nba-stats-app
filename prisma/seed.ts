import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🏀 Starting NBA database seeding...')

  // Clear existing data
  await prisma.game.deleteMany()
  await prisma.player.deleteMany()
  await prisma.team.deleteMany()

  // Create Teams
  console.log('📋 Creating teams...')
  const teams = await Promise.all([
    // Western Conference
    prisma.team.create({
      data: {
        name: 'Los Angeles Lakers',
        city: 'Los Angeles',
        abbreviation: 'LAL',
        conference: 'Western',
        division: 'Pacific'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Golden State Warriors',
        city: 'San Francisco',
        abbreviation: 'GSW',
        conference: 'Western',
        division: 'Pacific'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Phoenix Suns',
        city: 'Phoenix',
        abbreviation: 'PHX',
        conference: 'Western',
        division: 'Pacific'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Denver Nuggets',
        city: 'Denver',
        abbreviation: 'DEN',
        conference: 'Western',
        division: 'Northwest'
      }
    }),
    // Eastern Conference
    prisma.team.create({
      data: {
        name: 'Boston Celtics',
        city: 'Boston',
        abbreviation: 'BOS',
        conference: 'Eastern',
        division: 'Atlantic'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Miami Heat',
        city: 'Miami',
        abbreviation: 'MIA',
        conference: 'Eastern',
        division: 'Southeast'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Milwaukee Bucks',
        city: 'Milwaukee',
        abbreviation: 'MIL',
        conference: 'Eastern',
        division: 'Central'
      }
    }),
    prisma.team.create({
      data: {
        name: 'Philadelphia 76ers',
        city: 'Philadelphia',
        abbreviation: 'PHI',
        conference: 'Eastern',
        division: 'Atlantic'
      }
    })
  ])

  console.log(`✅ Created ${teams.length} teams`)

  // Create Players
  console.log('👥 Creating players...')
  const players = [
    // Lakers
    { name: 'LeBron James', position: 'SF', jerseyNumber: 6, teamId: teams[0].id },
    { name: 'Anthony Davis', position: 'PF', jerseyNumber: 3, teamId: teams[0].id },
    { name: 'Austin Reaves', position: 'SG', jerseyNumber: 15, teamId: teams[0].id },
    { name: "D'Angelo Russell", position: 'PG', jerseyNumber: 1, teamId: teams[0].id },

    // Warriors
    { name: 'Stephen Curry', position: 'PG', jerseyNumber: 30, teamId: teams[1].id },
    { name: 'Klay Thompson', position: 'SG', jerseyNumber: 11, teamId: teams[1].id },
    { name: 'Draymond Green', position: 'PF', jerseyNumber: 23, teamId: teams[1].id },
    { name: 'Andrew Wiggins', position: 'SF', jerseyNumber: 22, teamId: teams[1].id },

    // Suns
    { name: 'Devin Booker', position: 'SG', jerseyNumber: 1, teamId: teams[2].id },
    { name: 'Kevin Durant', position: 'SF', jerseyNumber: 35, teamId: teams[2].id },
    { name: 'Bradley Beal', position: 'SG', jerseyNumber: 3, teamId: teams[2].id },
    { name: 'Jusuf Nurkic', position: 'C', jerseyNumber: 20, teamId: teams[2].id },

    // Nuggets
    { name: 'Nikola Jokic', position: 'C', jerseyNumber: 15, teamId: teams[3].id },
    { name: 'Jamal Murray', position: 'PG', jerseyNumber: 27, teamId: teams[3].id },
    { name: 'Michael Porter Jr.', position: 'SF', jerseyNumber: 1, teamId: teams[3].id },
    { name: 'Aaron Gordon', position: 'PF', jerseyNumber: 50, teamId: teams[3].id },

    // Celtics
    { name: 'Jayson Tatum', position: 'SF', jerseyNumber: 0, teamId: teams[4].id },
    { name: 'Jaylen Brown', position: 'SG', jerseyNumber: 7, teamId: teams[4].id },
    { name: 'Marcus Smart', position: 'PG', jerseyNumber: 36, teamId: teams[4].id },
    { name: 'Al Horford', position: 'C', jerseyNumber: 42, teamId: teams[4].id },

    // Heat
    { name: 'Jimmy Butler', position: 'SF', jerseyNumber: 22, teamId: teams[5].id },
    { name: 'Bam Adebayo', position: 'C', jerseyNumber: 13, teamId: teams[5].id },
    { name: 'Tyler Herro', position: 'SG', jerseyNumber: 14, teamId: teams[5].id },
    { name: 'Kyle Lowry', position: 'PG', jerseyNumber: 7, teamId: teams[5].id },

    // Bucks
    { name: 'Giannis Antetokounmpo', position: 'PF', jerseyNumber: 34, teamId: teams[6].id },
    { name: 'Damian Lillard', position: 'PG', jerseyNumber: 0, teamId: teams[6].id },
    { name: 'Khris Middleton', position: 'SF', jerseyNumber: 22, teamId: teams[6].id },
    { name: 'Brook Lopez', position: 'C', jerseyNumber: 11, teamId: teams[6].id },

    // 76ers
    { name: 'Joel Embiid', position: 'C', jerseyNumber: 21, teamId: teams[7].id },
    { name: 'James Harden', position: 'PG', jerseyNumber: 1, teamId: teams[7].id },
    { name: 'Tyrese Maxey', position: 'SG', jerseyNumber: 0, teamId: teams[7].id },
    { name: 'Tobias Harris', position: 'SF', jerseyNumber: 12, teamId: teams[7].id }
  ]

  await prisma.player.createMany({
    data: players
  })

  console.log(`✅ Created ${players.length} players`)

  // Create Games
  console.log('🏀 Creating games...')
  const games = [
    // Recent games with realistic scores
    {
      date: new Date('2024-01-15'),
      homeTeamId: teams[0].id, // Lakers
      awayTeamId: teams[1].id, // Warriors
      homeScore: 112,
      awayScore: 108,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-18'),
      homeTeamId: teams[4].id, // Celtics
      awayTeamId: teams[5].id, // Heat
      homeScore: 120,
      awayScore: 113,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-20'),
      homeTeamId: teams[2].id, // Suns
      awayTeamId: teams[3].id, // Nuggets
      homeScore: 95,
      awayScore: 118,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-22'),
      homeTeamId: teams[6].id, // Bucks
      awayTeamId: teams[7].id, // 76ers
      homeScore: 135,
      awayScore: 124,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-25'),
      homeTeamId: teams[1].id, // Warriors
      awayTeamId: teams[4].id, // Celtics
      homeScore: 123,
      awayScore: 107,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-28'),
      homeTeamId: teams[5].id, // Heat
      awayTeamId: teams[0].id, // Lakers
      homeScore: 110,
      awayScore: 96,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-01-30'),
      homeTeamId: teams[3].id, // Nuggets
      awayTeamId: teams[6].id, // Bucks
      homeScore: 129,
      awayScore: 106,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-02-02'),
      homeTeamId: teams[7].id, // 76ers
      awayTeamId: teams[2].id, // Suns
      homeScore: 114,
      awayScore: 109,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    // Add some more recent games
    {
      date: new Date('2024-02-05'),
      homeTeamId: teams[0].id, // Lakers
      awayTeamId: teams[3].id, // Nuggets
      homeScore: 105,
      awayScore: 114,
      season: '2023-24',
      gameType: 'Regular Season'
    },
    {
      date: new Date('2024-02-08'),
      homeTeamId: teams[4].id, // Celtics
      awayTeamId: teams[6].id, // Bucks
      homeScore: 119,
      awayScore: 116,
      season: '2023-24',
      gameType: 'Regular Season'
    }
  ]

  await prisma.game.createMany({
    data: games
  })

  console.log(`✅ Created ${games.length} games`)
  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })