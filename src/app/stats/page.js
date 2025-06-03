"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useGameStats } from "@/hooks/use-game-stats";
import { useAuth } from "@/hooks/use-auth";
import { 
  BarChart2, 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Award,
  Crown,
  Shield,
  Eye,
  Swords,
  RefreshCw,
  AlertCircle,
  Calendar,
  Gamepad2
} from "lucide-react";

const roleIcons = {
  raja: Crown,
  mantri: Shield,
  chor: Eye,
  sipahi: Swords,
};

const roleColors = {
  raja: "text-yellow-600 bg-yellow-50 border-yellow-200",
  mantri: "text-blue-600 bg-blue-50 border-blue-200", 
  chor: "text-red-600 bg-red-50 border-red-200",
  sipahi: "text-green-600 bg-green-50 border-green-200",
};

export default function StatsPage() {
  const { user, isAuthenticated } = useAuth();
  const { stats, isLoading, error } = useGameStats();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center py-12">
          <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bangers text-gray-800 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6">
            Please sign in with Google to view your game statistics and progress.
          </p>
          <button 
            onClick={() => window.location.href = "/api/auth/google"}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
            <span className="text-gray-600">Loading statistics...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  const winRate = stats.gamesPlayed > 0 ? (stats.gamesWon / stats.gamesPlayed * 100).toFixed(1) : 0;
  const avgScore = stats.gamesPlayed > 0 ? (stats.totalScore / stats.gamesPlayed).toFixed(1) : 0;
  const playTimeHours = Math.floor(stats.totalPlayTime / 60);
  const playTimeMinutes = stats.totalPlayTime % 60;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bangers text-gray-800 tracking-wide">Statistics</h1>
            <p className="text-gray-600">
              Your RMCS gaming performance and achievements
            </p>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Played</CardTitle>
            <Gamepad2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.gamesPlayed}</div>
            <p className="text-xs text-muted-foreground">
              Total games completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{winRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.gamesWon} wins out of {stats.gamesPlayed} games
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.winStreak}</div>
            <p className="text-xs text-muted-foreground">
              Best: {stats.bestWinStreak} wins
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalScore}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {avgScore} points per game
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Detailed Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-purple-600" />
              <span>Performance Overview</span>
            </CardTitle>
            <CardDescription>
              Your gaming performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Win Rate</span>
                <span>{winRate}%</span>
              </div>
              <Progress value={winRate} className="h-2" />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.gamesWon}</div>
                <div className="text-sm text-gray-500">Wins</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{stats.gamesPlayed - stats.gamesWon}</div>
                <div className="text-sm text-gray-500">Losses</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Total Play Time</span>
                </div>
                <span className="font-medium">
                  {playTimeHours}h {playTimeMinutes}m
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Rooms Created</span>
                </div>
                <span className="font-medium">{stats.roomsCreated}</span>
              </div>

              {stats.lastGamePlayed && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Last Game</span>
                  </div>
                  <span className="font-medium">
                    {new Date(stats.lastGamePlayed).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>Recent Games</span>
            </CardTitle>
            <CardDescription>
              Your last {stats.gameHistory?.length || 0} games
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.gameHistory && stats.gameHistory.length > 0 ? (
              <div className="space-y-3">
                {stats.gameHistory.map((game, index) => {
                  const RoleIcon = roleIcons[game.role] || Gamepad2;
                  const roleColorClass = roleColors[game.role] || "text-gray-600 bg-gray-50 border-gray-200";
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg border ${roleColorClass}`}>
                          <RoleIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-medium capitalize">{game.role}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(game.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={game.result === 'win' ? 'default' : 'secondary'}>
                          {game.result === 'win' ? 'Won' : game.result === 'loss' ? 'Lost' : 'Draw'}
                        </Badge>
                        <div className="text-sm text-gray-500 mt-1">
                          {game.score} pts
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <Gamepad2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Games Yet</h3>
                <p className="text-gray-500">
                  Start playing to see your game history here!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Role Performance */}
      {stats.gameHistory && stats.gameHistory.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Crown className="w-5 h-5 text-purple-600" />
              <span>Role Performance</span>
            </CardTitle>
            <CardDescription>
              How well you perform with each role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['raja', 'mantri', 'chor', 'sipahi'].map((role) => {
                const roleGames = stats.gameHistory.filter(game => game.role === role);
                const roleWins = roleGames.filter(game => game.result === 'win').length;
                const roleWinRate = roleGames.length > 0 ? (roleWins / roleGames.length * 100).toFixed(1) : 0;
                const RoleIcon = roleIcons[role];
                const roleColorClass = roleColors[role];

                return (
                  <div key={role} className={`p-4 border rounded-lg ${roleColorClass}`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RoleIcon className="w-5 h-5" />
                      <span className="font-medium capitalize">{role}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{roleWinRate}%</div>
                    <div className="text-sm opacity-80">
                      {roleWins}/{roleGames.length} wins
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 