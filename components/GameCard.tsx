import { GameWithTeams } from '@/types'

interface GameCardProps {
  game: GameWithTeams
}

export default function GameCard({ game }: GameCardProps) {
  const gameDate = new Date(game.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  const winner = game.homeScore > game.awayScore ? game.homeTeam : game.awayTeam
  const isHomeWin = game.homeScore > game.awayScore

  return (
    <div className="game-card">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 mb-2">{gameDate}</div>
        <div className="text-xs text-gray-400">{game.gameType}</div>
      </div>
      
      <div className="flex items-center justify-between">
        {/* Away Team */}
        <div className="flex-1">
          <div className={`flex items-center ${!isHomeWin ? 'font-bold' : ''}`}>
            <div className="w-8 h-8 bg-nba-blue rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
              {game.awayTeam.abbreviation}
            </div>
            <div>
              <div className="font-medium">{game.awayTeam.city}</div>
              <div className="text-sm text-gray-500">{game.awayTeam.name}</div>
            </div>
          </div>
        </div>

        {/* Score */}
        <div className="mx-4 text-center">
          <div className="text-2xl font-bold">
            <span className={!isHomeWin ? 'text-nba-red' : 'text-gray-600'}>
              {game.awayScore}
            </span>
            <span className="text-gray-400 mx-2">-</span>
            <span className={isHomeWin ? 'text-nba-red' : 'text-gray-600'}>
              {game.homeScore}
            </span>
          </div>
          <div className="text-xs text-gray-500">Final</div>
        </div>

        {/* Home Team */}
        <div className="flex-1 text-right">
          <div className={`flex items-center justify-end ${isHomeWin ? 'font-bold' : ''}`}>
            <div>
              <div className="font-medium">{game.homeTeam.city}</div>
              <div className="text-sm text-gray-500">{game.homeTeam.name}</div>
            </div>
            <div className="w-8 h-8 bg-nba-red rounded-full flex items-center justify-center text-white text-xs font-bold ml-3">
              {game.homeTeam.abbreviation}
            </div>
          </div>
        </div>
      </div>

      {/* Winner Indicator */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="text-sm text-gray-600">
          <span className="font-medium">{winner.city} {winner.name}</span> wins
        </div>
      </div>
    </div>
  )
}