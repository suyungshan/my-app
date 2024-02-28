import ToGame from "@/components/player/ToGame";
import Introduction from "@/components/player/Introduction";

export default function Directions() {
  return (
    <div className="flex w-full h-full justify-center items-center flex-col">
      <Introduction />
      <ToGame />
    </div>
  );
}
