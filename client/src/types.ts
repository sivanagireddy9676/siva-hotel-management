export interface Booking { id: string; guest: string; room: string; status: string }

export interface Room { id: string; number: string; type?: string; status?: string; price?: number }

export interface Customer { id: string; name: string; email?: string; phone?: string }
