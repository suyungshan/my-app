import Introduction from "@/components/player/Introduction";
import StartGame from "@/components/dev/StartGame";
// import StartGame from "@/components/dev/Firebase/StartGame";

export default function Directions() {
  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <Introduction />
      <StartGame goTo="/player/game" />
    </div>
  );
}
