import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { ApiResponse, GameWithTeams } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<GameWithTeams[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: []
    })
  }

  try {
    const { limit = '10' } = req.query

    const games = await prisma.game.findMany({
      include: {
        homeTeam: true,
        awayTeam: true
      },
      orderBy: {
        date: 'desc'
      },
      take: parseInt(limit as string)
    })

    res.status(200).json({
      success: true,
      data: games
    })
  } catch (error) {
    console.error('Error fetching games:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch games',
      data: []
    })
  }
}