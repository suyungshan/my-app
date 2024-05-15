import HomePage from "@/components/player/HomePage";
import NameInput from "@/components/player/NameInput";

export default function Home() {
  return (
    <div className="flex w-full justify-center items-center flex-col text-body text-decoration-white gap-8">
      <main className="select-none">
        <NameInput></NameInput>
      </main>
    </div>
  );
}
