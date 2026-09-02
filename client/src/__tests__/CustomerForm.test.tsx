import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CustomerForm from '../components/CustomerForm'
import api from '../api/client'

vi.mock('../api/client')
const mockedApi = api as unknown as { post: vi.Mock, put: vi.Mock }

test('creates customer on submit', async () => {
  mockedApi.post = vi.fn().mockResolvedValue({ data: { id: 'C1', name: 'Bob' } })
  const onSaved = vi.fn()
  render(<CustomerForm open={true} onClose={() => {}} initial={null} onSaved={onSaved} />)
  await userEvent.type(screen.getByLabelText(/Name/i), 'Bob')
  await userEvent.type(screen.getByLabelText(/Email/i), 'bob@example.com')
  await userEvent.type(screen.getByLabelText(/Phone/i), '123456')
  await userEvent.click(screen.getByText(/Save/i))
  await waitFor(() => expect(mockedApi.post).toHaveBeenCalled())
  expect(onSaved).toHaveBeenCalled()
})
