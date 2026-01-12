"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type BMICategory = "underweight" | "normal" | "overweight" | "obese" | null

export function BMICalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [feet, setFeet] = useState("")
  const [inches, setInches] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState<BMICategory>(null)

  const calculateBMI = () => {
    let heightInMeters: number
    let weightInKg: number

    if (unit === "metric") {
      heightInMeters = Number.parseFloat(height) / 100
      weightInKg = Number.parseFloat(weight)
    } else {
      const totalInches = Number.parseFloat(feet) * 12 + Number.parseFloat(inches || "0")
      heightInMeters = totalInches * 0.0254
      weightInKg = Number.parseFloat(weight) * 0.453592
    }

    if (heightInMeters > 0 && weightInKg > 0) {
      const calculatedBMI = weightInKg / (heightInMeters * heightInMeters)
      setBmi(Math.round(calculatedBMI * 10) / 10)
      setCategory(getBMICategory(calculatedBMI))
    }
  }

  const getBMICategory = (bmiValue: number): BMICategory => {
    if (bmiValue < 18.5) return "underweight"
    if (bmiValue < 25) return "normal"
    if (bmiValue < 30) return "overweight"
    return "obese"
  }

  const getCategoryStyles = (cat: BMICategory) => {
    switch (cat) {
      case "underweight":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "normal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "overweight":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "obese":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      default:
        return ""
    }
  }

  const getCategoryLabel = (cat: BMICategory) => {
    switch (cat) {
      case "underweight":
        return "Underweight"
      case "normal":
        return "Normal weight"
      case "overweight":
        return "Overweight"
      case "obese":
        return "Obese"
      default:
        return ""
    }
  }

  const resetForm = () => {
    setHeight("")
    setWeight("")
    setFeet("")
    setInches("")
    setBmi(null)
    setCategory(null)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">BMI Calculator</CardTitle>
        <CardDescription>Calculate your Body Mass Index to check if you're at a healthy weight</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={unit}
          onValueChange={(v) => {
            setUnit(v as "metric" | "imperial")
            resetForm()
          }}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="metric">Metric</TabsTrigger>
            <TabsTrigger value="imperial">Imperial</TabsTrigger>
          </TabsList>

          <TabsContent value="metric" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="height-cm">Height (cm)</Label>
              <Input
                id="height-cm"
                type="number"
                placeholder="170"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-kg">Weight (kg)</Label>
              <Input
                id="weight-kg"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </TabsContent>

          <TabsContent value="imperial" className="space-y-4">
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input type="number" placeholder="5" value={feet} onChange={(e) => setFeet(e.target.value)} />
                  <span className="text-xs text-muted-foreground">feet</span>
                </div>
                <div className="flex-1">
                  <Input type="number" placeholder="10" value={inches} onChange={(e) => setInches(e.target.value)} />
                  <span className="text-xs text-muted-foreground">inches</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight-lbs">Weight (lbs)</Label>
              <Input
                id="weight-lbs"
                type="number"
                placeholder="154"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <Button className="w-full mt-6" onClick={calculateBMI}>
          Calculate BMI
        </Button>

        {bmi !== null && category && (
          <div className="mt-6 p-4 rounded-lg bg-muted text-center">
            <p className="text-sm text-muted-foreground mb-1">Your BMI</p>
            <p className="text-4xl font-bold mb-2">{bmi}</p>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryStyles(category)}`}>
              {getCategoryLabel(category)}
            </span>
          </div>
        )}

        <div className="mt-6 text-xs text-muted-foreground">
          <p className="font-medium mb-1">BMI Categories:</p>
          <ul className="space-y-0.5">
            <li>Underweight: {"<"} 18.5</li>
            <li>Normal: 18.5 – 24.9</li>
            <li>Overweight: 25 – 29.9</li>
            <li>Obese: ≥ 30</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
