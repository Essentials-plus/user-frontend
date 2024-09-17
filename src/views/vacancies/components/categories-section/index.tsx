import Link from "next/link";

const CategoriesSection = () => {
  return (
    <section className="my-[101px]">
      <div className="container">
        <div className="max-w-[1010px] mx-auto">
          <p className="text-lg font-semibold">
            Wat leuk dat je interesse hebt om Essentials+ te versterken! Op dit
            moment hebben we 3 openstaande vacatures.
          </p>

          <div className="mt-[45px]">
            <div className="space-y-10">
              <Category
                title="Orderpicker"
                desciption="Team Essentias+ is op zoek naar een orderpicker voor in ons magazijn. Een nette maar fanatieke werker die het lekker vindt de handen uit de mouwen te steken."
                url="orderpicker"
              />
              <Category
                title="Customer Service Specialist"
                desciption="Team Essentials+ is op zoek naar versterking voor onze klantenservice. Een echte aanpakker met liefde voor een fitte leefstijl en iemand die mensen graag helpt met de beste klantenservice."
                url="customer-service-specialist"
              />
              <Category
                title="Marketing specialist"
                desciption="Team Essentials+ is op zoek naar versterking voor onze marketingsteam. Een topper in social media die ons versteld zal staan in zijn of haar creativiteit."
                url="marketing-specialist"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

type CategoryProps = {
  title: string;
  desciption: string;
  url: string;
};

const Category = ({ desciption, title, url }: CategoryProps) => {
  return (
    <div className="space-y-3">
      <h4 className="__h4">{title}</h4>
      <p className="__body_18">{desciption}</p>
      <Link
        href={`/vacancies/${url}`}
        className="h-10 px-10 __c_all text-lg font-bold text-white bg-app-darker-green rounded-md w-fit duration-200 hover:bg-app-dark-green/80"
      >
        {"Bekijk hier de vacature >"}{" "}
      </Link>
    </div>
  );
};
