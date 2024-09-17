import Button from "@/common/components/ui/button";
import Image from "next/image";

const ViewHereSection = () => {
  return (
    <section className="mt-20 mb-[107px]">
      <div className="container">
        <div className="grid grid-cols-[500px,auto] gap-x-10 items-center">
          <div>
            <h2 className="uppercase __h2 font-oswald font-normal">
              Bekijk hier hoe wij de maaltijden klaarmaken
            </h2>
            <p className="my-5 __body_16">
              In onze keuken werken hooggekwalificeerde koks. Wij houden ons aan
              alle sanitaire normen, en dit zijn niet alleen maar woorden, want
              dit kun je zelf gemakkelijk zien
            </p>
            <Button className="rounded-full">Play video</Button>
          </div>
          <Image
            src={"/imgs/placeholders/video-placeholder.jpg"}
            alt="video-placeholder"
            width={1666}
            height={916}
            className="rounded-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ViewHereSection;
