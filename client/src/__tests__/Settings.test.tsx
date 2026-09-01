import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Settings from '../pages/Settings'
import api from '../api/client'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/client')
const mockedApi = api as unknown as { get: vi.Mock, put: vi.Mock }

test('Settings loads and allows save', async () => {
  mockedApi.get = vi.fn().mockResolvedValue({ data: { hotelName: 'Test Hotel', contactEmail: 'a@b.com' } })
  mockedApi.put = vi.fn().mockResolvedValue({})
  render(<MemoryRouter><Settings /></MemoryRouter>)
  await waitFor(() => expect(mockedApi.get).toHaveBeenCalled())
  expect(await screen.findByDisplayValue('Test Hotel')).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText(/Hotel name/i), { target: { value: 'New Name' } })
  fireEvent.click(screen.getByText(/Save/i))
  await waitFor(() => expect(mockedApi.put).toHaveBeenCalled())
})
