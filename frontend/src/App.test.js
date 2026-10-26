import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { TripPlannerPage } from './App';

jest.mock('axios');
jest.mock('react-router-dom', () => {
  const React = require('react');
  return {
    BrowserRouter: ({ children }) => React.createElement(React.Fragment, null, children),
    Routes: ({ children }) => React.createElement(React.Fragment, null, children),
    Route: () => null,
    Link: ({ to, ...props }) => React.createElement('a', { href: to, ...props }),
    useParams: () => ({}),
    useNavigate: () => () => {},
    useLocation: () => ({ pathname: '/plan' })
  };
});

const destinations = [
  { _id: 'hotel', name: 'GV Hotel Maasin', category: 'Hotel', location: 'Maasin City', budget: 'Low' },
  { _id: 'beach', name: 'Mantahan Beach', category: 'Beach', location: 'Maasin City', budget: 'Low' },
  { _id: 'spot', name: 'Monte Cueva Shrine', category: 'Tourist Spot', location: 'Maasin City', budget: 'Low' },
  { _id: 'food', name: 'Kinamot Sa Abgao', category: 'Restaurant', location: 'Maasin City', budget: 'Medium' }
];

test('chat assistant builds and summarizes a budget itinerary with Google Maps directions', async () => {
  axios.get.mockResolvedValue({ data: destinations });
  render(<TripPlannerPage />);

  fireEvent.change(await screen.findByLabelText(/message the trip assistant/i), {
    target: { value: 'A relaxing beach trip with local food, 1 day for 2 travelers, ₱10,000' }
  });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));

  expect(await screen.findByText('GV Hotel Maasin')).toBeInTheDocument();
  expect(screen.getByText('Mantahan Beach')).toBeInTheDocument();
  expect(screen.getByText('Kinamot Sa Abgao')).toBeInTheDocument();
  expect(screen.getByText('Monte Cueva Shrine')).toBeInTheDocument();
  expect(screen.getByText(/I’ve updated your 1-day plan for 2 travelers, with a budget of ₱10,000/)).toBeInTheDocument();
  await waitFor(() => expect(screen.getByRole('link', { name: /directions to mantahan beach/i })).toHaveAttribute('href', expect.stringContaining('google.com/maps/dir')));
  expect(screen.getByText('₱10,000')).toBeInTheDocument();
});

test('chat follow-ups update trip duration and transport mode', async () => {
  axios.get.mockResolvedValue({ data: destinations });
  render(<TripPlannerPage />);

  const chatInput = await screen.findByLabelText(/message the trip assistant/i);
  fireEvent.change(chatInput, { target: { value: 'Plan a 3 day trip for 2 travelers with ₱12,000' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText(/updated your 3-day plan/)).toBeInTheDocument();
  expect(screen.getByText('3 days · 2 travelers')).toBeInTheDocument();
  expect(screen.getByText('₱12,000')).toBeInTheDocument();

  fireEvent.change(chatInput, { target: { value: 'Make it a car trip' } });
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByText('Car / private ride')).toBeInTheDocument();
  expect(await screen.findAllByText(/updated your 3-day plan/)).toHaveLength(2);
});
