import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GameRoomsClient } from '../src/components/game-rooms-client';

// Mock the socket hook
vi.mock('../src/hooks/use-socket', () => ({
  useSocket: () => ({
    isConnected: true,
    onGameStateUpdate: vi.fn(),
    onPlayerJoined: vi.fn(),
    onPlayerLeft: vi.fn(),
  }),
}));

// Mock the toast hook
vi.mock('../src/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}));

// Mock the session manager hook
vi.mock('../src/hooks/use-session-manager', () => ({
  useSessionManager: () => ({
    user: null,
    isAuthenticated: false,
    checkSession: vi.fn(),
  }),
}));

describe('GameRoomsClient', () => {
  const mockInitialRooms = [
    {
      id: '1',
      roomCode: 'ABC123',
      title: 'Test Room',
      status: 'waiting',
      players: { current: 2, max: 4 },
      isPrivate: false,
    },
  ];

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('renders the component with initial rooms', () => {
    render(<GameRoomsClient initialRooms={mockInitialRooms} initialSession={null} />);
    
    // Check if the room is rendered
    expect(screen.getByText('Test Room')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('shows create and join room buttons', () => {
    render(<GameRoomsClient initialRooms={mockInitialRooms} initialSession={null} />);
    
    expect(screen.getByText('Create Room')).toBeInTheDocument();
    expect(screen.getByText('Join Room')).toBeInTheDocument();
  });

  it('shows authentication prompt for unauthenticated users', () => {
    render(<GameRoomsClient initialRooms={mockInitialRooms} initialSession={null} />);
    
    expect(screen.getByText(/Sign in to track your game stats/)).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('handles room filtering', async () => {
    render(<GameRoomsClient initialRooms={mockInitialRooms} initialSession={null} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    
    await waitFor(() => {
      expect(screen.getByText('Test Room')).toBeInTheDocument();
    });
  });

  it('shows empty state when no rooms match filters', async () => {
    render(<GameRoomsClient initialRooms={mockInitialRooms} initialSession={null} />);
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'NonExistentRoom' } });
    
    await waitFor(() => {
      expect(screen.getByText('No rooms found')).toBeInTheDocument();
    });
  });
}); 