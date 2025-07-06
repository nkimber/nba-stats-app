import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import GameCard from '@/components/GameCard'
import { GameWithTeams } from '@/types'

export default function Games() {
  const [games, setGames] = useState<GameWithTeams[]>([])
  const [loading, setLoading] = useState(true)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true)
        const response = await fetch(`/api/games?limit=${limit}`)
        const data = await response.json()
        
        if (data.success) {
          setGames(data.data)
        }
      } catch (error) {
        console.error('Error fetching games:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [limit])

  const loadMoreGames = () => {
    setLimit(prevLimit => prevLimit + 10)
  }

  if (loading && games.length === 0) {
    return (
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-500">Loading games...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Recent Games</h1>
          <p className="mt-2 text-gray-600">
            Latest NBA game results and scores
          </p>
        </div>

        {/* Games Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-blue">{games.length}</div>
            <div className="text-gray-600">Games Loaded</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-red">
              {games.filter(game => game.gameType === 'Regular Season').length}
            </div>
            <div className="text-gray-600">Regular Season</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">
              {games.filter(game => game.gameType === 'Playoffs').length}
            </div>
            <div className="text-gray-600">Playoff Games</div>
          </div>
        </div>

        {/* Games List */}
        <div className="space-y-4">
          {games.length > 0 ? (
            games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No games found
            </div>
          )}
        </div>

        {/* Load More Button */}
        {games.length > 0 && games.length % 10 === 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={loadMoreGames}
              disabled={loading}
              className={`px-6 py-3 rounded-md font-medium transition-colors ${
                loading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-nba-blue text-white hover:bg-blue-700'
              }`}
            >
              {loading ? 'Loading...' : 'Load More Games'}
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}