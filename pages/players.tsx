import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { PlayerWithTeam, TeamWithStats } from '@/types'

export default function Players() {
  const [players, setPlayers] = useState<PlayerWithTeam[]>([])
  const [teams, setTeams] = useState<TeamWithStats[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<PlayerWithTeam[]>([])
  const [selectedTeam, setSelectedTeam] = useState<string>('All')
  const [selectedPosition, setSelectedPosition] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [playersResponse, teamsResponse] = await Promise.all([
          fetch('/api/players'),
          fetch('/api/teams')
        ])
        
        const playersData = await playersResponse.json()
        const teamsData = await teamsResponse.json()
        
        if (playersData.success) {
          setPlayers(playersData.data)
          setFilteredPlayers(playersData.data)
        }
        
        if (teamsData.success) {
          setTeams(teamsData.data)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = players

    if (selectedTeam !== 'All') {
      filtered = filtered.filter(player => player.team.id === parseInt(selectedTeam))
    }

    if (selectedPosition !== 'All') {
      filtered = filtered.filter(player => player.position === selectedPosition)
    }

    setFilteredPlayers(filtered)
  }, [selectedTeam, selectedPosition, players])

  const positions = ['All', 'PG', 'SG', 'SF', 'PF', 'C']

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-500">Loading players...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">NBA Players</h1>
          <p className="mt-2 text-gray-600">
            Browse all players by team and position
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Team Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Team
            </label>
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="block w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-nba-blue focus:border-nba-blue"
            >
              <option value="All">All Teams</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id.toString()}>
                  {team.city} {team.name}
                </option>
              ))}
            </select>
          </div>

          {/* Position Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Position
            </label>
            <div className="flex space-x-2">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setSelectedPosition(position)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPosition === position
                      ? 'bg-nba-blue text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {position}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Players Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-blue">{filteredPlayers.length}</div>
            <div className="text-gray-600">Players Shown</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-nba-red">{players.length}</div>
            <div className="text-gray-600">Total Players</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-green-600">{teams.length}</div>
            <div className="text-gray-600">Teams</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-3xl font-bold text-purple-600">5</div>
            <div className="text-gray-600">Positions</div>
          </div>
        </div>

        {/* Players Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredPlayers.length > 0 ? (
              filteredPlayers.map((player) => (
                <li key={player.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-nba-blue rounded-full flex items-center justify-center text-white font-bold">
                            {player.jerseyNumber}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-lg font-medium text-gray-900">
                            {player.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {player.position} • #{player.jerseyNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-right mr-4">
                          <div className="text-sm font-medium text-gray-900">
                            {player.team.city} {player.team.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {player.team.conference} Conference
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-nba-red rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {player.team.abbreviation}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <div className="px-4 py-8 text-center text-gray-500">
                  No players found matching your filters
                </div>
              </li>
            )}
          </ul>
        </div>

        {/* Position Summary */}
        {selectedPosition !== 'All' && filteredPlayers.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {selectedPosition} Position Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-nba-blue">{filteredPlayers.length}</div>
                <div className="text-sm text-gray-500">Players</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-nba-red">
                  {new Set(filteredPlayers.map(p => p.team.id)).size}
                </div>
                <div className="text-sm text-gray-500">Teams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.min(...filteredPlayers.map(p => p.jerseyNumber))}
                </div>
                <div className="text-sm text-gray-500">Lowest #</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.max(...filteredPlayers.map(p => p.jerseyNumber))}
                </div>
                <div className="text-sm text-gray-500">Highest #</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}