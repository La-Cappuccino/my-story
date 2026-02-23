"use client";
import dynamic from "next/dynamic";

const UniverseScene = dynamic(
  () => import("@/components/canvas/UniverseScene"),
  { ssr: false, loading: () => <div className="h-screen w-full bg-[#050510]" /> }
);

export default function UniverseClient() {
  return <UniverseScene />;
}
