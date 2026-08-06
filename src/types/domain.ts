export interface User {
  id: string
  name: string
  email: string
  [key: string]: unknown
}

export interface Plan {
  id: string
  name: string
  description?: string
  price: number
  currency?: string
  interval?: string
  [key: string]: unknown
}

export interface Subscription {
  id: string
  planId: string
  status: string
  [key: string]: unknown
}

export interface Payment {
  id: string
  amount: number
  currency?: string
  status: string
  createdAt?: string
  [key: string]: unknown
}

export interface BillingSnapshot {
  user: User
  subscription: Subscription | null
  isActive: boolean
  plans: Plan[]
}
