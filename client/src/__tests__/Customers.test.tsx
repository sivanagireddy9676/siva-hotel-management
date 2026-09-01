import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Customers from '../pages/Customers'
import api from '../api/client'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../api/client')
const mockedApi = api as unknown as { get: vi.Mock }

test('Customers shows customers from API', async () => {
  mockedApi.get = vi.fn().mockResolvedValue({ data: [{ id: 'C1', name: 'Bob', email: 'bob@example.com' }] })
  render(<MemoryRouter><Customers /></MemoryRouter>)
  await waitFor(() => expect(mockedApi.get).toHaveBeenCalled())
  expect(await screen.findByText('Bob')).toBeInTheDocument()
})
