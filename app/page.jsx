import NameInput from "@/components/player/NameInput";
import BgPicture from "@/components/player/BgPicture";

export default function Home() {
  return (
    <div className="flex w-full h-full justify-center items-center flex-col text-body text-decoration-white gap-8">
      <main className="select-none w-full h-full justify-center items-center flex">
        <BgPicture>
          <NameInput></NameInput>
        </BgPicture>
      </main>
    </div>
  );
}
