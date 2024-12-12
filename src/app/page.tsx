'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Header } from '@/components/header'



interface DataPoint {
  time: string
  number: number
}

export default function Home() {
  const [data, setData] = useState<DataPoint[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const fetchData = async () => {
    const response = await fetch('/api/data')
    const newData = await response.json()
    setData(prevData => [...prevData, newData].slice(-50)) // Keep only the last 50 data points
  }

  const startDataAcquisition = () => {
    if (!isRunning) {
      setIsRunning(true)
      fetchData() // Fetch immediately when starting
      intervalRef.current = setInterval(fetchData, 100) // Fetch every 0.1 seconds
    }
  }

  const stopDataAcquisition = () => {
    if (isRunning && intervalRef.current) {
      clearInterval(intervalRef.current)
      setIsRunning(false)
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-8">
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Real-Time Data Visualization</CardTitle>
            <CardDescription>Displaying current time and random numbers (1-10) in real-time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="time"
                    tickFormatter={(time) => new Date(time).toLocaleTimeString()}
                  />
                  <YAxis domain={[0, 10]} />
                  <Tooltip
                    labelFormatter={(label) => new Date(label).toLocaleString()}
                    formatter={(value) => [value, 'Random Number']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="number"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                    name="Random Number"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={startDataAcquisition}
                disabled={isRunning}
                className="w-40 bg-green-500 hover:bg-green-600 text-white"
              >
                {isRunning ? 'Acquiring...' : 'Start'}
              </Button>
              <Button
                onClick={stopDataAcquisition}
                disabled={!isRunning}
                className="w-40 bg-red-500 hover:bg-red-600 text-white"
              >
                Stop
              </Button>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              {isRunning ? 'Data is being acquired every 0.1 seconds' : 'Press Start to begin data acquisition'}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

