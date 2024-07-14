import IntroductionPublic from "@/components/dev/IntroductionPublic";
import StartGame from "@/components/dev/StartGame";
// import StartGame from "@/components/dev/Firebase/StartGame";

export default function Intro() {
  return (
    <div className="flex flex-col w-full h-full mt-12 justify-center items-center gap-5">
      <IntroductionPublic />
      <StartGame goTo="/dev/rank" />
    </div>
  );
}
