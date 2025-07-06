import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/db'
import { ApiResponse, PlayerWithTeam } from '@/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<PlayerWithTeam[]>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
      data: []
    })
  }

  try {
    const { teamId } = req.query

    const whereClause = teamId ? { teamId: parseInt(teamId as string) } : {}

    const players = await prisma.player.findMany({
      where: whereClause,
      include: {
        team: true
      },
      orderBy: [
        { team: { name: 'asc' } },
        { name: 'asc' }
      ]
    })

    res.status(200).json({
      success: true,
      data: players
    })
  } catch (error) {
    console.error('Error fetching players:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch players',
      data: []
    })
  }
}