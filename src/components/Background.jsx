// "use client";

// import { useEffect, useState } from "react";

// export default function Background() {
//   const [particles, setParticles] = useState([]);

//   useEffect(() => {
//     // Only generate on client
//     const generated = Array.from({ length: 15 }).map(() => ({
//       top: `${Math.random() * 100}%`,
//       left: `${Math.random() * 100}%`,
//       duration: `${4 + Math.random() * 6}s`,
//     }));
//     setParticles(generated);
//   }, []);

//   return (
//     <>
//       {/* Gradient Background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-white animate-gradient" />

//       {/* Floating Blobs */}
//       <div className="absolute w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-slow top-10 left-10" />
//       <div className="absolute w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float top-40 right-10" />

//       {/* Floating Particles */}
//       {particles.length > 0 &&
//         particles.map((p, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse"
//             style={{
//               top: p.top,
//               left: p.left,
//               animationDuration: p.duration,
//             }}
//           />
//         ))}
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";

export default function Background() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${4 + Math.random() * 6}s`,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {" "}
      {/* <- move background behind */}
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-green-50 to-white animate-gradient" />
      {/* Floating Blobs */}
      <div className="absolute w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float-slow top-10 left-10" />
      <div className="absolute w-96 h-96 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float top-40 right-10" />
      {/* Floating Particles */}
      {particles.length > 0 &&
        particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full opacity-50 animate-pulse"
            style={{
              top: p.top,
              left: p.left,
              animationDuration: p.duration,
            }}
          />
        ))}
    </div>
  );
}
