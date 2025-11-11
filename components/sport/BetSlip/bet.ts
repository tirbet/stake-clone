export interface Bet {
  id: string
  event: string
  market: string
  selection: string
  odds: number
  stake: number
  potentialWin: number
}

export interface BetSlipProps {
  className?: string
}

export interface BetCardProps {
  bet: Bet
  onRemove: (id: string) => void
  onStakeChange: (id: string, stake: number) => void
}

export interface QuickStakeProps {
  stakes: number[]
  onStakeSelect: (amount: number) => void
}

export interface EmptyStateProps {
  onAddMockBet: () => void
  bookingCode: string
  onBookingCodeChange: (code: string) => void
  onLoadBookedBet: () => void
}

export interface BetSummaryProps {
  totalStake: number
  totalPotentialWin: number
  betCount: number
  onPlaceBet: () => void
}