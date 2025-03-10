import CheckSqureIcon from "@/common/components/icons/check-squre-icon";
import useMeasure from "react-use-measure";

const FacilitiesSection = () => {
  const [ref, bounds] = useMeasure();

  return (
    <>
      <div className="mx-auto max-w-[calc(1000px+48px)]" ref={ref}></div>
      <section
        className="mb-[98px] mt-[63px]"
        style={{ paddingLeft: bounds.x + 24 - 80 }}
      >
        <div className="rounded-l-[60px] bg-[#F3F3F3] py-20 pl-20">
          <div className="max-w-[calc(1000px+48px)]">
            <div className="flex gap-x-5">
              <div className="w-full">
                <h3 className="text-3xl font-bold">Geen verplichtingen</h3>
                <div className="mt-6 w-full">
                  <div className="w-full rounded-xl bg-white px-7 py-6">
                    <ul className="space-y-5">
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Pauzeer of stop elke moment
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Gezonde recepten en ingredienten
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Ruim gevarieerde keuzes
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-3xl font-bold">Geen verplichtingen</h3>
                <div className="mt-6 w-full">
                  <div className="w-full rounded-xl bg-white px-7 py-6">
                    <ul className="space-y-5">
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Eenvoudig thuisbezorgt{" "}
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Wekelijks zonder omkijken{" "}
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-8" />
                        <p className="text-lg font-bold">
                          Kook digitaal mee met onze koks{" "}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FacilitiesSection;
