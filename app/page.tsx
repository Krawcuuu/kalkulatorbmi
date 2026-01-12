"use client"

import React, { useState } from "react"
import { Calculator, Scale, Info } from "lucide-react"

// --- KOMPONENT KALKULATORA ---
function BMICalculator() {
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [bmi, setBmi] = useState<number | null>(null)
  const [category, setCategory] = useState("")

  const calculateBMI = () => {
    const h = parseFloat(height) / 100
    const w = parseFloat(weight)
    if (h > 0 && w > 0) {
      const result = w / (h * h)
      const roundedBmi = Math.round(result * 10) / 10
      setBmi(roundedBmi)
      
      if (roundedBmi < 18.5) setCategory("Niedowaga")
      else if (roundedBmi < 25) setCategory("Waga prawidłowa")
      else if (roundedBmi < 30) setCategory("Nadwaga")
      else setCategory("Otyłość")
    }
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
      <div className="flex items-center gap-2 mb-6 text-blue-600">
        <Calculator size={28} />
        <h1 className="text-2xl font-bold text-gray-800">Kalkulator BMI</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Wzrost (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="np. 180"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Waga (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="np. 75"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
          />
        </div>

        <button
          onClick={calculateBMI}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          Oblicz BMI
        </button>

        {bmi && (
          <div className="mt-6 p-4 bg-blue-50 rounded-xl text-center animate-in fade-in zoom-in duration-300">
            <p className="text-gray-600 text-sm uppercase tracking-wider font-semibold">Twoje BMI wynosi</p>
            <p className="text-4xl font-black text-blue-700 my-1">{bmi}</p>
            <p className="text-lg font-medium text-blue-900">{category}</p>
          </div>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <Info size={16} className="shrink-0 mt-0.5" />
          <p>
            BMI (Body Mass Index) to orientacyjny wskaźnik masy ciała. Nie uwzględnia on składu ciała (mięśni vs tłuszczu).
          </p>
        </div>
      </div>
    </div>
  )
}

// --- GŁÓWNA STRONA ---
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <BMICalculator />
    </div>
  )
}
