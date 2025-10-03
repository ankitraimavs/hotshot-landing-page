import Hero from "./components/hero";
import Navbar from "./components/Navbar";
import WaitlistForm from "./components/WaitlistForm";

export default function Home() {
  return (
    <div className="bg-[#F5EEE1] min-h-screen m-0 p-0">
      <Navbar />
     <Hero />
     <WaitlistForm />

    </div>
  );
}
