import { BMICalculator } from "./bmi-calculator" // Tu mała litera, bo to nazwa PLIKU

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <BMICalculator /> {/* Tu wielka litera, bo to nazwa KOMPONENTU */}
    </main>
  )
}
