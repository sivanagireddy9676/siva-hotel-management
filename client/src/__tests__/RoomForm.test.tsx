import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RoomForm from '../components/RoomForm'
import api from '../api/client'

vi.mock('../api/client')
const mockedApi = api as unknown as { post: vi.Mock, put: vi.Mock }

test('creates room on submit', async () => {
  mockedApi.post = vi.fn().mockResolvedValue({ data: { id: 'R1', number: '101' } })
  const onSaved = vi.fn()
  render(<RoomForm open={true} onClose={() => {}} initial={null} onSaved={onSaved} />)
  await userEvent.type(screen.getByLabelText(/Number/i), '101')
  await userEvent.type(screen.getByLabelText(/Type/i), 'Deluxe')
  await userEvent.type(screen.getByLabelText(/Status/i), 'Available')
  await userEvent.type(screen.getByLabelText(/Price/i), '100')
  await userEvent.click(screen.getByText(/Save/i))
  await waitFor(() => expect(mockedApi.post).toHaveBeenCalled())
  expect(onSaved).toHaveBeenCalled()
})
