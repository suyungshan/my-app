import NameInput from "@/components/player/NameInput";
import BgPicture from "@/components/player/BgPicture";

export default function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <main className="select-none w-full h-full flex justify-center items-center overflow-hidden">
        <BgPicture>
          <NameInput />
        </BgPicture>
      </main>
    </div>
  );
}
