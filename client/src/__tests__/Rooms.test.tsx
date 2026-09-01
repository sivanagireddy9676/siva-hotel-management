import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Rooms from '../pages/Rooms'
import api from '../api/client'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/client')
const mockedApi = api as unknown as { get: vi.Mock }

test('Rooms shows rooms from API', async () => {
  mockedApi.get = vi.fn().mockResolvedValue({ data: [{ id: 'R1', number: '101', status: 'Available' }] })
  render(<MemoryRouter><Rooms /></MemoryRouter>)
  await waitFor(() => expect(mockedApi.get).toHaveBeenCalled())
  expect(await screen.findByText(/Room 101/)).toBeInTheDocument()
})
