import Image from "next/image"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function Article() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">Artikel</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="overflow-hidden">
            <div className="relative w-full h-48">
              <Image
                src={`https://picsum.photos/400/300?random=${item}`}
                alt="Dummy Article"
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>Judul Artikel {item}</CardTitle>
              <CardDescription>
                Ringkasan singkat artikel {item}, memberikan gambaran isi yang menarik.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Baca artikel selengkapnya untuk mendapatkan wawasan baru dan menarik.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}