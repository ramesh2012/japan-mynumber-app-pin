"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Clipboard } from "lucide-react"
import Image from "next/image"

// Japanese era to Western year conversion data
const eraToWesternYear: Record<string, Record<string, number>> = {
  明治: {
    元年: 1868,
    "2年": 1869,
    "3年": 1870,
    "4年": 1871,
    "5年": 1872,
    "6年": 1873,
    "7年": 1874,
    "8年": 1875,
    "9年": 1876,
    "10年": 1877,
    "11年": 1878,
    "12年": 1879,
    "13年": 1880,
    "14年": 1881,
    "15年": 1882,
    "16年": 1883,
    "17年": 1884,
    "18年": 1885,
    "19年": 1886,
    "20年": 1887,
    "21年": 1888,
    "22年": 1889,
    "23年": 1890,
    "24年": 1891,
    "25年": 1892,
    "26年": 1893,
    "27年": 1894,
    "28年": 1895,
    "29年": 1896,
    "30年": 1897,
    "31年": 1898,
    "32年": 1899,
    "33年": 1900,
    "34年": 1901,
    "35年": 1902,
    "36年": 1903,
    "37年": 1904,
    "38年": 1905,
    "39年": 1906,
    "40年": 1907,
    "41年": 1908,
    "42年": 1909,
    "43年": 1910,
    "44年": 1911,
    "45年": 1912,
  },
  大正: {
    元年: 1912,
    "2年": 1913,
    "3年": 1914,
    "4年": 1915,
    "5年": 1916,
    "6年": 1917,
    "7年": 1918,
    "8年": 1919,
    "9年": 1920,
    "10年": 1921,
    "11年": 1922,
    "12年": 1923,
    "13年": 1924,
    "14年": 1925,
    "15年": 1926,
  },
  昭和: {
    元年: 1926,
    "2年": 1927,
    "3年": 1928,
    "4年": 1929,
    "5年": 1930,
    "6年": 1931,
    "7年": 1932,
    "8年": 1933,
    "9年": 1934,
    "10年": 1935,
    "11年": 1936,
    "12年": 1937,
    "13年": 1938,
    "14年": 1939,
    "15年": 1940,
    "16年": 1941,
    "17年": 1942,
    "18年": 1943,
    "19年": 1944,
    "20年": 1945,
    "21年": 1946,
    "22年": 1947,
    "23年": 1948,
    "24年": 1949,
    "25年": 1950,
    "26年": 1951,
    "27年": 1952,
    "28年": 1953,
    "29年": 1954,
    "30年": 1955,
    "31年": 1956,
    "32年": 1957,
    "33年": 1958,
    "34年": 1959,
    "35年": 1960,
    "36年": 1961,
    "37年": 1962,
    "38年": 1963,
    "39年": 1964,
    "40年": 1965,
    "41年": 1966,
    "42年": 1967,
    "43年": 1968,
    "44年": 1969,
    "45年": 1970,
    "46年": 1971,
    "47年": 1972,
    "48年": 1973,
    "49年": 1974,
    "50年": 1975,
    "51年": 1976,
    "52年": 1977,
    "53年": 1978,
    "54年": 1979,
    "55年": 1980,
    "56年": 1981,
    "57年": 1982,
    "58年": 1983,
    "59年": 1984,
    "60年": 1985,
    "61年": 1986,
    "62年": 1987,
    "63年": 1988,
    "64年": 1989,
  },
  平成: {
    元年: 1989,
    "2年": 1990,
    "3年": 1991,
    "4年": 1992,
    "5年": 1993,
    "6年": 1994,
    "7年": 1995,
    "8年": 1996,
    "9年": 1997,
    "10年": 1998,
    "11年": 1999,
    "12年": 2000,
    "13年": 2001,
    "14年": 2002,
    "15年": 2003,
    "16年": 2004,
    "17年": 2005,
    "18年": 2006,
    "19年": 2007,
    "20年": 2008,
    "21年": 2009,
    "22年": 2010,
    "23年": 2011,
    "24年": 2012,
    "25年": 2013,
    "26年": 2014,
    "27年": 2015,
    "28年": 2016,
    "29年": 2017,
    "30年": 2018,
    "31年": 2019,
  },
  令和: {
    元年: 2019,
    "2年": 2020,
    "3年": 2021,
    "4年": 2022,
    "5年": 2023,
    "6年": 2024,
    "7年": 2025,
    "8年": 2026,
    "9年": 2027,
    "10年": 2028,
  },
}

// Western year to Japanese era mapping
const westernYearToEra: Record<number, { era: string; year: string }> = {}

// Build the reverse mapping
Object.entries(eraToWesternYear).forEach(([era, years]) => {
  Object.entries(years).forEach(([yearStr, westernYear]) => {
    westernYearToEra[westernYear] = { era, year: yearStr }
  })
})

// Generate years for Japanese era
const generateJapaneseYears = (era: string) => {
  if (!era || !eraToWesternYear[era]) return []
  return Object.keys(eraToWesternYear[era])
}

// Generate years for Western calendar
const generateWesternYears = () => {
  const years = []
  for (let i = 1900; i <= 2024; i++) {
    years.push(`${i}年`)
  }
  return years
}

// Generate months
const generateMonths = () => {
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push(`${i}月`)
  }
  return months
}

// Generate days
const generateDays = (year: string, month: string) => {
  if (!year || !month) return []

  let westernYear = 0

  // Extract year number
  if (year.includes("年")) {
    const yearNum = year === "元年" ? 1 : Number.parseInt(year.replace("年", ""))
    westernYear = yearNum
  }

  // Extract month number
  const monthNum = Number.parseInt(month.replace("月", ""))

  // Calculate days in month
  const daysInMonth = new Date(westernYear, monthNum, 0).getDate()

  const days = []
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(`${i}日`)
  }
  return days
}

// Convert Japanese date to 6-digit format
const convertJapaneseDateTo6Digits = (era: string, year: string, month: string, day: string) => {
  if (!era || !year || !month || !day) return ""

  // Handle special case for "元年" (first year)
  let yearDigits = "01"
  if (year !== "元年") {
    const yearNum = Number.parseInt(year.replace("年", ""))
    yearDigits = yearNum.toString().padStart(2, "0")
  }

  const monthNum = Number.parseInt(month.replace("月", ""))
  const dayNum = Number.parseInt(day.replace("日", ""))

  // Format as YYMMDD
  const monthStr = monthNum.toString().padStart(2, "0")
  const dayStr = dayNum.toString().padStart(2, "0")

  return `${yearDigits}${monthStr}${dayStr}`
}

// Convert Western date to 6-digit format
const convertWesternDateTo6Digits = (year: string, month: string, day: string) => {
  if (!year || !month || !day) return ""

  const yearNum = Number.parseInt(year.replace("年", ""))
  const monthNum = Number.parseInt(month.replace("月", ""))
  const dayNum = Number.parseInt(day.replace("日", ""))

  // Format as YYMMDD
  const yearStr = (yearNum % 100).toString().padStart(2, "0")
  const monthStr = monthNum.toString().padStart(2, "0")
  const dayStr = dayNum.toString().padStart(2, "0")

  return `${yearStr}${monthStr}${dayStr}`
}

// Get Japanese era year from Western year
const getJapaneseEraYear = (westernYear: number) => {
  const eraInfo = westernYearToEra[westernYear]
  if (eraInfo) {
    return { era: eraInfo.era, year: eraInfo.year }
  }
  return { era: "", year: "" }
}

// Get Japanese era display for Western year
const getJapaneseEraDisplay = (westernYearStr: string) => {
  const westernYear = Number.parseInt(westernYearStr.replace("年", ""))
  const { era, year } = getJapaneseEraYear(westernYear)
  return era && year ? `${era}${year}` : ""
}

export default function VerificationNumberForm() {
  const [step, setStep] = useState(1)
  const [calendarType, setCalendarType] = useState<"和暦" | "西暦">("和暦")

  // Japanese calendar state
  const [japaneseEra, setJapaneseEra] = useState<string>("昭和")
  const [japaneseYear, setJapaneseYear] = useState<string>("31年")
  const [japaneseMonth, setJapaneseMonth] = useState<string>("10月")
  const [japaneseDay, setJapaneseDay] = useState<string>("5日")

  // Western calendar state
  const [westernYear, setWesternYear] = useState<string>("1998年")
  const [westernMonth, setWesternMonth] = useState<string>("9月")
  const [westernDay, setWesternDay] = useState<string>("12日")

  // Expiration year and security code
  const [expiryYear, setExpiryYear] = useState<string>("2025")
  const [securityCode, setSecurityCode] = useState<string>("")

  // Show/hide password fields
  const [showExpiryYear, setShowExpiryYear] = useState(false)
  const [showSecurityCode, setShowSecurityCode] = useState(false)

  // Generated verification number
  const [verificationNumber, setVerificationNumber] = useState<string>("")
  const [selectedDateDisplay, setSelectedDateDisplay] = useState<string>("")
  const [birthdateDigits, setBirthdateDigits] = useState<string>("")

  // Handle calendar type change
  const handleCalendarTypeChange = (value: "和暦" | "西暦") => {
    setCalendarType(value)

    // If switching to Japanese calendar, convert the current Western date
    if (value === "和暦" && westernYear) {
      const westernYearNum = Number.parseInt(westernYear.replace("年", ""))
      const { era, year } = getJapaneseEraYear(westernYearNum)
      if (era && year) {
        setJapaneseEra(era)
        setJapaneseYear(year)
        setJapaneseMonth(westernMonth)
        setJapaneseDay(westernDay)
      }
    }
    // If switching to Western calendar, convert the current Japanese date
    else if (value === "西暦" && japaneseEra && japaneseYear) {
      const westernYearNum = eraToWesternYear[japaneseEra]?.[japaneseYear] || 0
      if (westernYearNum) {
        setWesternYear(`${westernYearNum}年`)
        setWesternMonth(japaneseMonth)
        setWesternDay(japaneseDay)
      }
    }
  }

  // Handle next button click
  const handleNext = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      // Generate verification number
      let birthdate = ""
      let dateDisplay = ""

      if (calendarType === "和暦") {
        birthdate = convertJapaneseDateTo6Digits(japaneseEra, japaneseYear, japaneseMonth, japaneseDay)
        dateDisplay = `${japaneseEra}${japaneseYear}${japaneseMonth}${japaneseDay}`
      } else {
        birthdate = convertWesternDateTo6Digits(westernYear, westernMonth, westernDay)
        dateDisplay = `${westernYear}${westernMonth}${westernDay}`
      }

      setSelectedDateDisplay(dateDisplay)
      setBirthdateDigits(birthdate)
      const verificationNum = `${birthdate}${expiryYear}${securityCode}`
      setVerificationNumber(verificationNum)
      setStep(4)
    }
  }

  // Handle back button click
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Copy verification number to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(verificationNumber)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Step 1: Date of Birth Selection (Japanese or Western) */}
      {step === 1 && (
        <Card className="p-8 shadow-lg min-h-[650px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">生年月日の選択</h2>

          <div className="mb-4">
            <p className="text-gray-600 mb-2">暦（書類に記載の暦に合わせて選択）</p>
            <Select value={calendarType} onValueChange={(value) => handleCalendarTypeChange(value as "和暦" | "西暦")}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="暦を選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="和暦">和暦</SelectItem>
                <SelectItem value="西暦">西暦</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="text-gray-600 mb-2">生年月日をカードに合わせて選択してください</p>

          {calendarType === "和暦" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 mb-1">暦</p>
                  <Select value={japaneseEra} onValueChange={setJapaneseEra}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="暦を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(eraToWesternYear).map((era) => (
                        <SelectItem key={era} value={era}>
                          {era}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col">
                  <p className="text-sm text-gray-600 mb-1">年（{japaneseEra}）</p>
                  <Select value={japaneseYear} onValueChange={setJapaneseYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="生年月日を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateJapaneseYears(japaneseEra).map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select value={japaneseMonth} onValueChange={setJapaneseMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="月を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMonths().map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={japaneseDay} onValueChange={setJapaneseDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="日を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDays(japaneseYear, japaneseMonth).map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative h-[300px] mt-4">
                <Image
                  src="https://wardbhqluwfjwswhqnhb.supabase.co/storage/v1/object/public/photo//birthdate.png"
                  alt="ID Card with birthdate"
                  fill
                  className="object-contain rounded border border-gray-300"
                />
                <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">
                  {`${japaneseEra}${japaneseYear}${japaneseMonth}${japaneseDay}生`}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-1">年（西暦）</p>
                <Select value={westernYear} onValueChange={setWesternYear}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="生年月日を選択">{westernYear}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {generateWesternYears().map((year) => {
                      return (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select value={westernMonth} onValueChange={setWesternMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="月を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMonths().map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={westernDay} onValueChange={setWesternDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="日を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDays(westernYear, westernMonth).map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative h-[300px] mt-4">
                <Image
                  src="https://wardbhqluwfjwswhqnhb.supabase.co/storage/v1/object/public/photo//birthdate.png"
                  alt="ID Card with birthdate"
                  fill
                  className="object-contain rounded border border-gray-300"
                />
                <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">
                  {`${westernYear}${westernMonth}${westernDay}生`}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-auto" style="margin-top: 23px;">
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              戻る
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNext}>
              次へ
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Expiration Year */}
      {step === 2 && (
        <Card className="p-8 shadow-lg min-h-[650px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">有効期限の年を入力</h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">有効期限の年（4桁の数字）</p>
            <div className="relative">
              <Input
                type={showExpiryYear ? "text" : "password"}
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                className="pr-10"
                maxLength={4}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowExpiryYear(!showExpiryYear)}
              >
                {showExpiryYear ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="relative h-[300px] mb-6">
            <Image
              src="https://wardbhqluwfjwswhqnhb.supabase.co/storage/v1/object/public/photo//expirydate.png"
              alt="ID Card with expiry date"
              fill
              className="object-contain rounded border border-gray-300"
            />
            <div className="absolute top-8 right-8 text-xs bg-white/80 px-1 rounded">
              {`${expiryYear}年01月01日まで`}
            </div>
          </div>

          <p className="text-gray-600 mb-6">例 有効期限の年: {expiryYear}</p>

          <div className="flex gap-4 mt-auto">
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              戻る
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleNext}
              disabled={expiryYear.length !== 4 || !/^\d{4}$/.test(expiryYear)}
            >
              次へ
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Security Code */}
      {step === 3 && (
        <Card className="p-8 shadow-lg min-h-[650px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">セキュリティコードを入力</h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">セキュリティコード（4桁の数字）</p>
            <div className="relative">
              <Input
                type={showSecurityCode ? "text" : "password"}
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="例: 1234"
                className="pr-10"
                maxLength={4}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowSecurityCode(!showSecurityCode)}
              >
                {showSecurityCode ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="relative h-[300px] mb-4">
            <Image
              src="https://wardbhqluwfjwswhqnhb.supabase.co/storage/v1/object/public/photo//securitycode.png"
              alt="ID Card with security code"
              fill
              className="object-contain rounded border border-gray-300"
            />
            <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">{securityCode || "1234"}</div>
          </div>

          <div className="text-gray-600 mb-6">
            <p>例 セキュリティコード: 1234</p>
            <p>写真の下に記載されている4桁の数字です</p>
          </div>

          <div className="flex gap-4 mt-auto">
            <Button variant="outline" className="flex-1" onClick={handleBack}>
              戻る
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleNext}
              disabled={securityCode.length !== 4 || !/^\d{4}$/.test(securityCode)}
            >
              次へ
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Generated Verification Number */}
      {step === 4 && (
        <Card className="p-8 shadow-lg min-h-[650px] flex flex-col">
          <h2 className="text-xl font-bold mb-4">Generated Verification Number B</h2>

          <div className="bg-gray-100 p-4 rounded-md mb-6 flex items-center justify-between">
            <p className="text-lg font-mono">{verificationNumber}</p>
            <button
              onClick={copyToClipboard}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-gray-200"
              title="Copy to clipboard"
            >
              <Clipboard className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Verification Number B Structure: Selected Data</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Date of Birth (6 digits): {birthdateDigits}
                <div className="text-sm text-gray-600 ml-2">Selected date: {selectedDateDisplay}</div>
              </li>
              <li>
                Expiration Year (4 digits): {expiryYear}
                <div className="text-sm text-gray-600 ml-2">Selected expiration: Year {expiryYear}</div>
              </li>
              <li>
                Security Code (4 digits): {securityCode}
                <div className="text-sm text-gray-600 ml-2">Entered code: {securityCode}</div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-md mb-6">
            <p className="text-sm">
              This Verification Number B is the PIN used to read the surface information of your My Number Card. Input
              attempts are limited to 10 times.
            </p>
          </div>

          <div className="flex gap-4 mt-auto">
            <Button variant="outline" className="w-full" onClick={handleBack}>
              戻る
            </Button>
          </div>
        </Card>
      )}
    </div>
  )
}
