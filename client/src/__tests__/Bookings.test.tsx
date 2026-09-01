import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Bookings from '../pages/Bookings'
import api from '../api/client'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/client')

const mockedApi = api as unknown as { get: vi.Mock }

test('Bookings shows rows from API', async () => {
  mockedApi.get = vi.fn().mockResolvedValue({ data: [{ id: 'B1', guest: 'Alice', room: '101', status: 'Reserved' }] })
  render(<MemoryRouter><Bookings /></MemoryRouter>)
  await waitFor(() => expect(mockedApi.get).toHaveBeenCalled())
  expect(await screen.findByText('Alice')).toBeInTheDocument()
})
