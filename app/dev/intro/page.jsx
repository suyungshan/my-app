import IntroductionPublic from "@/components/dev/IntroductionPublic";
import StartGame from "@/components/dev/StartGame";

export default function Intro() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-8">
      <IntroductionPublic />
      <StartGame />
    </div>
  );
}
