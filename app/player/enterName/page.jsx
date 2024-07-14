// import NameInput from "@/components/player/NameInput";
import BgPicture from "@/components/player/BgPicture";
import FireBaseNameInput from "@/components/player/Firebase/FireBaseNameInput";

export default function Home() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <main className="select-none w-full h-full flex justify-center items-center overflow-hidden">
        <BgPicture>
          {/* <NameInput /> */}
          <FireBaseNameInput />
        </BgPicture>
      </main>
    </div>
  );
}
