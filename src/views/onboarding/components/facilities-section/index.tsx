import CheckSqureIcon from "@/common/components/icons/check-squre-icon";
import useMeasure from "react-use-measure";

const FacilitiesSection = () => {
  const [ref, bounds] = useMeasure();

  return (
    <>
      <div className="mx-auto max-w-[calc(1000px+48px)]" ref={ref}></div>
      <section
        className="my-10 max-lg:!px-5 lg:mb-[98px] lg:mt-[63px]"
        style={{ paddingLeft: bounds.x + 24 - 80 }}
      >
        <div className="bg-[#F3F3F3] max-lg:rounded-xl max-lg:p-6 lg:rounded-l-[60px] lg:py-20 lg:pl-20">
          <div className="max-w-[calc(1000px+48px)]">
            <div className="flex gap-x-5 gap-y-6 max-lg:flex-col">
              <div className="w-full">
                <h3 className="text-xl font-bold lg:text-3xl">
                  Geen verplichtingen
                </h3>
                <div className="mt-3 w-full lg:mt-6">
                  <div className="w-full rounded-xl bg-white p-4 lg:px-7 lg:py-6">
                    <ul className="space-y-3 lg:space-y-5">
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
                          Pauzeer of stop elke moment
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
                          Gezonde recepten en ingredienten
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
                          Ruim gevarieerde keuzes
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-xl font-bold lg:text-3xl">
                  Geen verplichtingen
                </h3>
                <div className="mt-3 w-full lg:mt-6">
                  <div className="w-full rounded-xl bg-white p-4 lg:px-7 lg:py-6">
                    <ul className="space-y-3 lg:space-y-5">
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
                          Eenvoudig thuisbezorgt{" "}
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
                          Wekelijks zonder omkijken{" "}
                        </p>
                      </li>
                      <li className="flex items-center gap-x-4">
                        <CheckSqureIcon className="w-5 lg:w-8" />
                        <p className="text-base font-bold max-lg:font-semibold lg:text-lg">
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
