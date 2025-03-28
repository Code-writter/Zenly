"use client"

import React from "react"
import { TrendingUp } from "lucide-react"
import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import moment from "moment"
import { Doc } from "../../../convex/_generated/dataModel"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const todoChartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(217 91% 60%)", // Bright blue
  },
  incomplete: {
    label: "Incomplete",
    color: "hsl(217 91% 60% / 0.5)", // Same blue but transparent
  },
} satisfies ChartConfig

export function TodoChart() {
  const todos = useQuery(api.todo.get)
  
  const chartData = React.useMemo(() => {
    if (!todos) return []
    
    // Get todos for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = moment().subtract(i, 'days')
      return {
        day: date.format('dddd'),
        total: 0,
        completed: 0,
        incomplete: 0
      }
    }).reverse()

    // Get today's date at start of day
    const today = moment().startOf('day')

    todos.forEach((todo: Doc<"todos">) => {
      const todoDate = moment(todo.dueDate)
      
      // Only count todos that are due within the last 7 days
      if (todoDate.isSameOrBefore(today) && todoDate.isAfter(today.clone().subtract(7, 'days'))) {
        const dayIndex = last7Days.findIndex(day => 
          moment(day.day, 'dddd').isSame(todoDate, 'day')
        )
        
        if (dayIndex !== -1) {
          last7Days[dayIndex].total++
          if (todo.isCompleted) {
            last7Days[dayIndex].completed++
          } else {
            last7Days[dayIndex].incomplete++
          }
        }
      }
    })

    return last7Days
  }, [todos])

  if (!todos) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Todo Statistics</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart data...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate trend percentage
  const trend = React.useMemo(() => {
    if (chartData.length < 2) return 0
    const lastDay = chartData[chartData.length - 1].completed
    const previousDay = chartData[chartData.length - 2].completed
    if (previousDay === 0) return 100
    return ((lastDay - previousDay) / previousDay) * 100
  }, [chartData])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Todo Statistics</CardTitle>
        <CardDescription>{moment().subtract(6, 'days').format('MMMM')} - {moment().format('MMMM YYYY')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={todoChartConfig}>
          <div className="h-[300px] w-full">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="day" 
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                tickLine={false}
                axisLine={false}
                tickCount={5}
                tickFormatter={(value) => value.toString()}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar 
                dataKey="completed" 
                name="completed"
                fill="var(--color-completed)"
                radius={4}
              />
              <Bar 
                dataKey="incomplete" 
                name="incomplete"
                fill="var(--color-incomplete)"
                radius={4}
              />
            </BarChart>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trend > 0 ? 'Trending up' : 'Trending down'} by {Math.abs(trend).toFixed(1)}% this week <TrendingUp className="h-4 w-4 ml-1" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing todo statistics for the last 7 days
        </div>
      </CardFooter>
    </Card>
  )
}
