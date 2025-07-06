import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { ApiResponse, TeamWithStats } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TeamWithStats[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: []
    })
  }

  try {
    // Fetch teams with their games to calculate win/loss records
    const teams = await prisma.team.findMany({
      include: {
        players: true,
        homeGames: true,
        awayGames: true
      },
      orderBy: {
        conference: 'asc'
      }
    })

    // Calculate win/loss records for each team
    const teamsWithStats: TeamWithStats[] = teams.map(team => {
      let wins = 0
      let losses = 0

      // Count home game wins/losses
      team.homeGames.forEach(game => {
        if (game.homeScore > game.awayScore) {
          wins++
        } else {
          losses++
        }
      })

      // Count away game wins/losses
      team.awayGames.forEach(game => {
        if (game.awayScore > game.homeScore) {
          wins++
        } else {
          losses++
        }
      })

      return {
        ...team,
        wins,
        losses
      }
    })

    res.status(200).json({
      success: true,
      data: teamsWithStats
    })
  } catch (error) {
    console.error('Error fetching teams:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch teams',
      data: []
    })
  }
}