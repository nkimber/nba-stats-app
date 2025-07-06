import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { ApiResponse, TeamStanding } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<TeamStanding[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: []
    })
  }

  try {
    const { conference } = req.query

    const whereClause = conference ? { conference: conference as string } : {}

    const teams = await prisma.team.findMany({
      where: whereClause,
      include: {
        homeGames: true,
        awayGames: true
      }
    })

    // Calculate standings
    const standings: TeamStanding[] = teams.map(team => {
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

      const totalGames = wins + losses
      const winPercentage = totalGames > 0 ? wins / totalGames : 0

      return {
        team,
        wins,
        losses,
        winPercentage
      }
    }).sort((a, b) => b.winPercentage - a.winPercentage) // Sort by win percentage

    res.status(200).json({
      success: true,
      data: standings
    })
  } catch (error) {
    console.error('Error fetching standings:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch standings',
      data: []
    })
  }
}