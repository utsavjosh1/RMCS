"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X } from "lucide-react"

const gameTypes = ["Raja Mantri Chor Sipahi"] // Initialize with default game type

export function GamesFilter({ onFilterChange, includePrivacyFilter = false }) {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [gameType, setGameType] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    applyFilters(e.target.value, status, gameType)
  }

  const handleStatusChange = (value) => {
    setStatus(value)
    applyFilters(search, value, gameType)
  }

  const handleGameTypeChange = (value) => {
    setGameType(value)
    applyFilters(search, status, value)
  }

  const handlePrivacyChange = (value) => {
    onFilterChange((prev) => ({
      ...prev,
      isPrivate: value,
    }))
  }

  const applyFilters = (search, status, gameType) => {
    onFilterChange({
      search,
      status,
      gameType,
    })
  }

  const resetFilters = () => {
    setSearch("")
    setStatus("all")
    setGameType("all")
    applyFilters("", "all", "all")
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            placeholder="Search rooms..."
            value={search}
            onChange={handleSearchChange}
            className="pl-10 h-11 rounded-xl border-2 border-violet-200 focus-visible:ring-purple-500"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-11 rounded-xl border-2 border-violet-200 font-medium"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>

          {(search || status !== "all" || gameType !== "all") && (
            <Button variant="ghost" className="h-11 rounded-xl text-gray-600 font-medium" onClick={resetFilters}>
              <X size={18} className="mr-2" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-violet-50 rounded-xl border-2 border-violet-200 animate-in slide-in-from-top-2 duration-200">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Game Status</label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-10 rounded-lg border-2 border-violet-200">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="waiting">Waiting for Players</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="finished">Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {includePrivacyFilter && (
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Room Type</label>
              <Select onValueChange={handlePrivacyChange} defaultValue="all">
                <SelectTrigger className="h-10 rounded-lg border-2 border-violet-200">
                  <SelectValue placeholder="Filter by room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rooms</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

