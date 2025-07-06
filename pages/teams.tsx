import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import TeamCard from '@/components/TeamCard'
import { TeamWithStats } from '@/types'

export default function Teams() {
  const [teams, setTeams] = useState<TeamWithStats[]>([])
  const [filteredTeams, setFilteredTeams] = useState<TeamWithStats[]>([])
  const [selectedConference, setSelectedConference] = useState<string>('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await fetch('/api/teams')
        const data = await response.json()
        
        if (data.success) {
          setTeams(data.data)
          setFilteredTeams(data.data)
        }
      } catch (error) {
        console.error('Error fetching teams:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [])

  useEffect(() => {
    if (selectedConference === 'All') {
      setFilteredTeams(teams)
    } else {
      setFilteredTeams(teams.filter(team => team.conference === selectedConference))
    }
  }, [selectedConference, teams])

  if (loading) {
    return (
      <Layout>
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl text-gray-500">Loading teams...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">NBA Teams</h1>
          <p className="mt-2 text-gray-600">
            View all teams and their current season records
          </p>
        </div>

        {/* Conference Filter */}
        <div className="mb-6">
          <div className="flex space-x-4">
            {['All', 'Eastern', 'Western'].map((conference) => (
              <button
                key={conference}
                onClick={() => setSelectedConference(conference)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  selectedConference === conference
                    ? 'bg-nba-blue text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {conference} {conference !== 'All' ? 'Conference' : 'Teams'}
              </button>
            ))}
          </div>
        </div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No teams found for the selected conference
            </div>
          )}
        </div>

        {/* Conference Summary */}
        {selectedConference !== 'All' && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {selectedConference} Conference Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-nba-blue">{filteredTeams.length}</div>
                <div className="text-sm text-gray-500">Teams</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredTeams.reduce((sum, team) => sum + (team.wins || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Wins</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {filteredTeams.reduce((sum, team) => sum + (team.losses || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Losses</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}