import { TeamWithStats } from '@/types'

interface TeamCardProps {
  team: TeamWithStats
}

export default function TeamCard({ team }: TeamCardProps) {
  const totalGames = (team.wins || 0) + (team.losses || 0)
  const winPercentage = totalGames > 0 ? ((team.wins || 0) / totalGames * 100).toFixed(1) : '0.0'

  return (
    <div className="team-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-nba-blue rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
            {team.abbreviation}
          </div>
          <div>
            <h3 className="font-bold text-lg">{team.city} {team.name}</h3>
            <p className="text-gray-600">{team.conference} Conference • {team.division}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">{team.wins || 0}</div>
          <div className="text-sm text-gray-500">Wins</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-red-600">{team.losses || 0}</div>
          <div className="text-sm text-gray-500">Losses</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-nba-blue">{winPercentage}%</div>
          <div className="text-sm text-gray-500">Win %</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          {team.players.length} players on roster
        </div>
      </div>
    </div>
  )
}