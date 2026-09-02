import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login'
import api from '../api/client'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/client')
const mockedApi = api as unknown as { post: vi.Mock }

test('login posts credentials and stores token', async () => {
  mockedApi.post = vi.fn().mockResolvedValue({ data: { token: 'fake.jwt.token' } })
  render(<MemoryRouter><Login /></MemoryRouter>)
  await userEvent.type(screen.getByLabelText(/Email/i), 'a@b.com')
  await userEvent.type(screen.getByLabelText(/Password/i), 'pass')
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
  await waitFor(() => expect(mockedApi.post).toHaveBeenCalled())
  // token stored in localStorage — vitest jsdom supports it
  expect(localStorage.getItem('token')).toBe('fake.jwt.token')
})
