'use client';
import Image from "next/image";
import Forest from "./components/Forest";

export default function Home() {
  return (
    <div style={{ height: '100vh' }}>  {/* Full screen container */}
      <Forest />  {/* Render the 3D scene */}
    </div>
  );
}
