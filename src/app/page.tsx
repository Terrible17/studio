import { Header } from "@/components/header";

export default function Home() {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/background_image.jpg')" }}
    >
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Wrap content in a relative container to ensure it appears above the overlay */}
      <div className="relative z-10 flex flex-1 flex-col">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center text-center text-white p-4">
          <div className="space-y-4 animate-in fade-in-0 slide-in-from-bottom-8 duration-1000 ease-out">
            
          </div>
        </main>
      </div>
    </div>
  );
}
