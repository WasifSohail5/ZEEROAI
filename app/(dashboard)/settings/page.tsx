"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { User, Bell, Shield, Palette, Globe, Loader2 } from "lucide-react"

const tabs = [
  { id: "account", label: "Account", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language & Region", icon: Globe },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: true,
    marketingEmails: false,
    // Privacy
    profileVisibility: "public",
    showActivity: true,
    allowDataCollection: true,
    // Appearance
    theme: "dark",
    reducedMotion: false,
    // Language
    language: "en",
    timezone: "UTC",
  })

  const supabase = createClient()

  async function handleSave() {
    setIsLoading(true)
    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Settings saved successfully")
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Settings</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <nav className="w-full shrink-0 lg:w-64">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Account Settings */}
          {activeTab === "account" && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-foreground">Account Information</CardTitle>
                <CardDescription>Update your account details and personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" className="bg-input" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="bg-input" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" className="bg-input" />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" className="bg-input" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" className="bg-input" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input id="confirmPassword" type="password" className="bg-input" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, pushNotifications: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Weekly Digest</p>
                    <p className="text-sm text-muted-foreground">Get a weekly summary of your learning progress</p>
                  </div>
                  <Switch
                    checked={settings.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, weeklyDigest: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive news and promotional content</p>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, marketingEmails: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Settings */}
          {activeTab === "privacy" && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-foreground">Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy settings and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.profileVisibility}
                    onValueChange={(value) =>
                      setSettings({ ...settings, profileVisibility: value })
                    }
                  >
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Show Activity Status</p>
                    <p className="text-sm text-muted-foreground">Let others see when you are online</p>
                  </div>
                  <Switch
                    checked={settings.showActivity}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, showActivity: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Allow Data Collection</p>
                    <p className="text-sm text-muted-foreground">Help improve ZEERO AI by sharing usage data</p>
                  </div>
                  <Switch
                    checked={settings.allowDataCollection}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, allowDataCollection: checked })
                    }
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Danger Zone</h3>
                  <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium text-foreground">Delete Account</p>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete your account and all data
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-foreground">Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select
                    value={settings.theme}
                    onValueChange={(value) => setSettings({ ...settings, theme: value })}
                  >
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Reduced Motion</p>
                    <p className="text-sm text-muted-foreground">Reduce animations and transitions</p>
                  </div>
                  <Switch
                    checked={settings.reducedMotion}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, reducedMotion: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Language Settings */}
          {activeTab === "language" && (
            <Card className="border-border/50 bg-card/50">
              <CardHeader>
                <CardTitle className="text-foreground">Language & Region</CardTitle>
                <CardDescription>Set your preferred language and timezone</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.language}
                    onValueChange={(value) => setSettings({ ...settings, language: value })}
                  >
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select
                    value={settings.timezone}
                    onValueChange={(value) => setSettings({ ...settings, timezone: value })}
                  >
                    <SelectTrigger className="bg-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
