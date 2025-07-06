import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import GameCard from '@/components/GameCard'
import TeamCard from '@/components/TeamCard'
import { GameWithTeams, TeamWithStats } from '@/types'

export default function Dashboard() {
  const [recentGames, setRecentGames] = useState<GameWithTeams[]>([])
  const [topTeams, setTopTeams] = useState<TeamWithStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch recent games
        const gamesResponse = await fetch('/api/games?limit=5')
        const gamesData = await gamesResponse.json()
        
        // Fetch teams
        const teamsResponse = await fetch('/api/teams')
        const teamsData = await teamsResponse.json()
        
        if (gamesData.success) {
          setRecentGames(gamesData.data)
        }
        
        if (teamsData.success) {
          // Sort teams by win percentage and take top 4
          const sortedTeams = teamsData.data.sort((a: TeamWithStats, b: TeamWithStats) => {
            const aWinPct = (a.wins || 0) / ((a.wins || 0) + (a.losses || 0))
            const bWinPct = (b.wins || 0) / ((b.wins || 0) + (b.losses || 0))
            return bWinPct - aWinPct
          })
          setTopTeams(sortedTeams.slice(0, 4))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-500">Loading NBA Stats...</div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="px-4 py-6 sm:px-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">NBA Stats Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Track your favorite teams and stay updated with the latest games
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-blue">{topTeams.length}</div>
            <div className="text-gray-600">Teams Tracked</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-red">{recentGames.length}</div>
            <div className="text-gray-600">Recent Games</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">2023-24</div>
            <div className="text-gray-600">Current Season</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Games */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Games</h2>
            <div className="space-y-4">
              {recentGames.length > 0 ? (
                recentGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No recent games found
                </div>
              )}
            </div>
          </div>

          {/* Top Teams */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Teams</h2>
            <div className="space-y-4">
              {topTeams.length > 0 ? (
                topTeams.map((team) => (
                  <TeamCard key={team.id} team={team} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No teams found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}