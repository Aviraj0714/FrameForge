"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Authentication from "./_components/Authentication";
import { useAuthContext } from "./provider";

export default function Home() {
  const user = useAuthContext();

  return (
    <div className="bg-[#0F0F0F] text-white min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 w-full bg-[#121212]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FrameForge Logo" width={40} height={40} />
            <h2 className="font-bold text-lg tracking-wide text-white">FrameForge</h2>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-purple-500 to-blue-600 px-6 py-2 text-lg rounded-lg transition-transform hover:scale-105">
                Get Started →
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-40 pb-20">
        <h1 className="text-5xl font-bold leading-tight opacity-0 animate-fade-in">
          Convert Wireframe to{" "}
          <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-transparent bg-clip-text">
            Code Instantly
          </span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-2xl opacity-0 animate-fade-in delay-200">
          Revolutionize your workflow with AI-powered wireframe-to-code conversion.
        </p>

        <div className="mt-8 opacity-0 animate-fade-in delay-400">
          <Authentication>
            <Button className="px-6 py-3 text-lg bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg shadow-lg transition-transform hover:scale-105">
              Get Started
            </Button>
          </Authentication>
        </div>

        <div className="mt-12 opacity-0 animate-fade-in delay-600">
          <Image
            src="/Wireframetocode.png"
            alt="Wireframe to Code"
            width={900}
            height={500}
            className="rounded-xl shadow-xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-white">Why Choose FrameForge?</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "AI-Powered", desc: "Generate code in seconds.", icon: "⚡" },
            { title: "Customizable", desc: "Modify with ease.", icon: "🎨" },
            { title: "Free to Use", desc: "No hidden charges.", icon: "💰" },
            { title: "24/7 Support", desc: "Get help anytime.", icon: "📞" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-[#1A1A1A] rounded-xl shadow-md text-center hover:shadow-lg transition-transform hover:scale-105"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h3 className="mt-3 text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
