import Image from "next/image";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Image
        src="/background_image.jpg"
        alt="PleasureX background"
        fill
        className="object-cover -z-10"
        quality={80}
        priority
      />
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40 -z-10" />
      
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center text-white p-4">
        <div 
          className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 ease-out"
        >
          <h1 className="font-headline text-5xl font-bold tracking-tight drop-shadow-lg sm:text-7xl md:text-8xl">
            PleasureX
          </h1>
          <p className="max-w-2xl font-body text-lg text-white/90 drop-shadow-md md:text-xl">
            Experience elegance and luxury like never before.
          </p>
        </div>
      </main>
    </div>
  );
}
