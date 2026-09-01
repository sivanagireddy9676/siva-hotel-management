import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingForm from '../components/BookingForm'
import api from '../api/client'

vi.mock('../api/client')
const mockedApi = api as unknown as { post: vi.Mock, put: vi.Mock }

test('creates booking on submit', async () => {
  mockedApi.post = vi.fn().mockResolvedValue({ data: { id: 'B1', guest: 'A', room: '101', status: 'Reserved' } })
  const onSaved = vi.fn()
  render(<BookingForm open={true} onClose={() => {}} initial={null} onSaved={onSaved} />)
  await userEvent.type(screen.getByLabelText(/Guest/i), 'A')
  await userEvent.type(screen.getByLabelText(/Room/i), '101')
  await userEvent.type(screen.getByLabelText(/Status/i), 'Reserved')
  await userEvent.click(screen.getByText(/Save/i))
  await waitFor(() => expect(mockedApi.post).toHaveBeenCalled())
  expect(onSaved).toHaveBeenCalled()
})
