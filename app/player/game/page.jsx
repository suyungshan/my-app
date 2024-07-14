// import GameSet from "@/components/player/GameSet";
import GameSet from "@/components/player/Firebase/GameSet";

export default function GamePage() {
  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <GameSet />
    </div>
  );
}
