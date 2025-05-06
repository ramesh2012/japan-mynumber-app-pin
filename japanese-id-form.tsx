"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Eye } from "lucide-react"
import Image from "next/image"

export default function IDVerificationForm() {
  const [showExpYear, setShowExpYear] = useState(false)
  const [showSecurityCode, setShowSecurityCode] = useState(false)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Japanese Calendar Panel */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-medium">生年月日の選択</h2>

          <div className="text-sm text-gray-600">暦（書類に記載の暦に合わせて選択）</div>

          <Select defaultValue="和暦">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="和暦" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="和暦">和暦</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-600">生年月日をカードに合わせて選択してください</div>

          <Select defaultValue="昭和31年">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="昭和31年" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="昭和31年">昭和31年</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Select defaultValue="10月">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="10月" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10月">10月</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="5日">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="5日" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5日">5日</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-2 relative">
            <Image
              src="/japanese-identification-card.png"
              width={240}
              height={150}
              alt="ID Card Preview"
              className="w-full rounded border border-gray-300"
            />
            <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">昭和31年10月5日生</div>
          </div>

          <div className="mt-auto flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              戻る
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">次へ</Button>
          </div>
        </Card>

        {/* Western Calendar Panel */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-medium">生年月日の選択</h2>

          <div className="text-sm text-gray-600">暦（書類に記載の暦に合わせて選択）</div>

          <Select defaultValue="西暦">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="西暦" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="西暦">西暦</SelectItem>
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-600">生年月日をカードに合わせて選択してください</div>

          <Select defaultValue="1998年">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="1998年" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1998年">1998年</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Select defaultValue="9月">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="9月" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="9月">9月</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="12日">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="12日" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12日">12日</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-2 relative">
            <Image
              src="/japanese-identification-card.png"
              width={240}
              height={150}
              alt="ID Card Preview"
              className="w-full rounded border border-gray-300"
            />
            <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">1998年9月12日生</div>
          </div>

          <div className="mt-auto flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              戻る
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">次へ</Button>
          </div>
        </Card>

        {/* Expiration Year Panel */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-medium">有効期限の年を入力</h2>

          <div className="text-sm text-gray-600">有効期限の年（4桁の数字）</div>

          <div className="relative">
            <Input type={showExpYear ? "text" : "password"} defaultValue="2025" className="pr-10" />
            <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowExpYear(!showExpYear)}>
              <Eye className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mt-4 relative">
            <Image
              src="/japanese-identification-card.png"
              width={240}
              height={150}
              alt="ID Card Preview"
              className="w-full rounded border border-gray-300"
            />
            <div className="absolute top-8 right-8 text-xs bg-white/80 px-1 rounded">2025年01月01日まで</div>
          </div>

          <div className="text-sm text-gray-600 mt-2">例 有効期限の年: 2025</div>

          <div className="mt-auto flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              戻る
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">次へ</Button>
          </div>
        </Card>

        {/* Security Code Panel */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="text-lg font-medium">セキュリティコードを入力</h2>

          <div className="text-sm text-gray-600">セキュリティコード（4桁の数字）</div>

          <div className="relative">
            <Input type={showSecurityCode ? "text" : "password"} placeholder="例: 1234" className="pr-10" />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2"
              onClick={() => setShowSecurityCode(!showSecurityCode)}
            >
              <Eye className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mt-4 relative">
            <Image
              src="/japanese-identification-card.png"
              width={240}
              height={150}
              alt="ID Card Preview"
              className="w-full rounded border border-gray-300"
            />
            <div className="absolute bottom-4 right-12 text-xs bg-white/80 px-1 rounded">1234</div>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            例 セキュリティコード: 1234
            <br />
            写真の下に記載されている4桁の数字です
          </div>

          <div className="mt-auto flex gap-2 pt-4">
            <Button variant="outline" className="flex-1">
              戻る
            </Button>
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">次へ</Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
