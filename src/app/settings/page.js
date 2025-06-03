"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { usePreferences } from "@/hooks/use-preferences";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { 
  Settings, 
  Moon, 
  Sun, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Music, 
  Bell, 
  BellOff, 
  Globe, 
  User,
  Image,
  Gamepad2,
  Save,
  RefreshCw,
  AlertCircle
} from "lucide-react";

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth();
  const { preferences, isLoading, updatePreferences, error } = usePreferences();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [tempAvatar, setTempAvatar] = useState("");

  const handlePreferenceChange = async (key, value) => {
    try {
      setIsSaving(true);
      await updatePreferences({ [key]: value });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update preference",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpdate = async () => {
    if (!tempAvatar.trim()) return;
    
    try {
      const response = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ image: tempAvatar }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Avatar updated successfully",
        });
        setTempAvatar("");
      } else {
        throw new Error("Failed to update avatar");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update avatar",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
            <span className="text-gray-600">Loading settings...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bangers text-gray-800 tracking-wide">Settings</h1>
            <p className="text-gray-600">
              Customize your RMCS experience
            </p>
          </div>
        </div>
        
        {!isAuthenticated && (
          <div className="flex items-center space-x-2 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 text-sm">
              You're playing as a guest. Some settings won't be saved after closing the browser.
            </span>
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Monitor className="w-5 h-5 text-purple-600" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>
              Customize the visual appearance of the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) => handlePreferenceChange("theme", value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" />
                      <span>Light</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center space-x-2">
                      <Moon className="w-4 h-4" />
                      <span>Dark</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4" />
                      <span>System</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => handlePreferenceChange("language", value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="hi">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <span>हिंदी (Hindi)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Audio Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-purple-600" />
              <span>Audio</span>
            </CardTitle>
            <CardDescription>
              Control sound effects and music
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sound">Sound Effects</Label>
                <p className="text-sm text-gray-500">
                  Play sounds for game actions
                </p>
              </div>
              <Switch
                id="sound"
                checked={preferences.soundEnabled}
                onCheckedChange={(checked) => handlePreferenceChange("soundEnabled", checked)}
                disabled={isSaving}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="music">Background Music</Label>
                <p className="text-sm text-gray-500">
                  Play ambient music during gameplay
                </p>
              </div>
              <Switch
                id="music"
                checked={preferences.musicEnabled}
                onCheckedChange={(checked) => handlePreferenceChange("musicEnabled", checked)}
                disabled={isSaving}
              />
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings (Authenticated Users Only) */}
        {isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-purple-600" />
                <span>Profile</span>
              </CardTitle>
              <CardDescription>
                Manage your profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white font-bold text-xl">
                      {user?.name?.[0] || "U"}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="avatar">Update Avatar</Label>
                <div className="flex space-x-2">
                  <Input
                    id="avatar"
                    placeholder="Enter image URL"
                    value={tempAvatar}
                    onChange={(e) => setTempAvatar(e.target.value)}
                  />
                  <Button onClick={handleAvatarUpdate} disabled={!tempAvatar.trim()}>
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter a valid image URL to update your avatar
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-purple-600" />
              <span>Notifications</span>
            </CardTitle>
            <CardDescription>
              Control how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Receive notifications for game events
                </p>
              </div>
              <Switch
                id="notifications"
                checked={preferences.notificationsEnabled}
                onCheckedChange={(checked) => handlePreferenceChange("notificationsEnabled", checked)}
                disabled={isSaving}
              />
            </div>
          </CardContent>
        </Card>

        {/* Gameplay Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gamepad2 className="w-5 h-5 text-purple-600" />
              <span>Gameplay</span>
            </CardTitle>
            <CardDescription>
              Customize your gaming experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => handlePreferenceChange("timezone", value)}
                disabled={isSaving}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                  <SelectItem value="Asia/Kolkata">IST (GMT+5:30)</SelectItem>
                  <SelectItem value="America/New_York">EST (GMT-5)</SelectItem>
                  <SelectItem value="America/Los_Angeles">PST (GMT-8)</SelectItem>
                  <SelectItem value="Europe/London">GMT (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Game Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use sound effects to enhance your gaming experience</li>
                <li>• Set the correct timezone for accurate game times</li>
                <li>• Enable notifications to stay updated on game events</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Status */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
          <CardDescription>
            Information about your current session
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant={isAuthenticated ? "default" : "secondary"}>
                {isAuthenticated ? "Authenticated User" : "Guest User"}
              </Badge>
              {!isAuthenticated && (
                <Badge variant="outline">Temporary Session</Badge>
              )}
            </div>
            <div className="text-sm text-gray-500">
              {isAuthenticated ? `Signed in as ${user?.name}` : "Playing as guest"}
            </div>
          </div>
          
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">
                Want to save your progress?
              </h4>
              <p className="text-sm text-purple-800 mb-3">
                Sign in with Google to save your settings, stats, and game progress permanently.
              </p>
              <Button 
                onClick={() => window.location.href = "/api/auth/google"}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Sign in with Google
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 