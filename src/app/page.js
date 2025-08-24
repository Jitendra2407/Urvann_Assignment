"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Mail, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Background from "@/components/Background";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [particles, setParticles] = useState([]);
  const [isHome, setIsHome] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // generate particle positions only on client
    const generated = Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${4 + Math.random() * 6}s`,
    }));
    setParticles(generated);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    setIsSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // store token in localStorage
      localStorage.setItem("token", data.token);

      // redirect after success
      router.push("/plants");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <Background />
      <Header isHome={isHome} />
      {/* Feature Section */}
      <main className="relative flex flex-1 items-center justify-center px-6 py-12 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-stretch max-w-5xl w-full">
          {/* Plant Image */}
          <div className="flex justify-center items-center">
            <Image
              src="/plant.png"
              alt="Plant"
              width={420}
              height={420}
              className="rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105 object-contain"
            />
          </div>

          {/* Login Form */}
          <Card className="w-full h-full shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md border border-green-100 transition-all duration-300 hover:shadow-green-200 flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-700 font-semibold">
                Welcome Back
              </CardTitle>
              <p className="text-center text-gray-500 text-sm mt-1">
                Please log in to continue
              </p>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 justify-between">
              <form
                className="flex flex-col h-full justify-between"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-4 flex-1 justify-center">
                  {/* Email Field */}
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                {/*Show error message if login fails */}
                {error && (
                  <p className="text-red-600 text-sm mt-2 text-center">
                    {error}
                  </p>
                )}

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl mt-6 py-2 shadow-lg transition-transform hover:scale-105"
                >
                  {isSubmitting ? "Logging in..." : "Login or Register"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
