import ChevronDown from "@/common/components/icons/chevron-down";
import { ProductType } from "@/types/api-responses/product-attribute";
import * as Accordion from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from "next/link";
import useMeasure from "react-use-measure";

type Props = {
  data: ProductType;
};

const AccordionSection = ({ data }: Props) => {
  const [ref, bounds] = useMeasure();

  if (!data.linkedProduct) return;

  const specs = data.linkedProduct.specs || [];
  return (
    <section className="mt-20 mb-[100px]">
      <div ref={ref} className="container"></div>
      <div
        style={{
          background:
            "linear-gradient(90deg, #F5F5F5 31.26%, rgba(245, 245, 245, 0.00) 41.32%)",
          width: bounds.width + bounds.left,
        }}
        className="ml-auto rounded-l-[80px] grid grid-cols-[45%,auto] gap-16"
      >
        <div className="flex items-center">
          <div className="p-5">
            <Image
              src={data.linkedProduct?.images[0]}
              alt={data.linkedProduct.name}
              width={522}
              height={522}
              className="max-w-[300px] rounded-[60px]"
            />
          </div>
          <div className="flex items-center flex-col gap-8">
            <h2 className="text-3xl font-bold">{data.linkedProduct.name}</h2>
            <Link
              href={`/products/${data.linkedProduct.slug}`}
              className="bg-app-yellow rounded-full flex items-center justify-center border-2 border-app-black h-11 font-bold px-12 hover:bg-app-black hover:text-app-yellow duration-200"
            >
              Voeg toe
            </Link>
          </div>
        </div>

        <div className="-mt-8">
          {specs.length > 0 && (
            <div
              style={{ paddingRight: bounds.left + 24 }}
              className="bg-app-darker-green rounded-l-[20px] font-bold font-oswald uppercase text-center py-3.5 flex px-7 gap-6 justify-between"
            >
              {specs.map((spec) => (
                <div key={spec.id} className="text-white">
                  <h3 className="text-3xl">{spec.label}</h3>
                  <p className="text-lg font-bold mt-2">{spec.value}</p>
                </div>
              ))}
            </div>
          )}

          <Accordion.Root type="single" className="mt-2" collapsible>
            {data.linkedProduct.faqs?.map((faq) => (
              <Accordion.Item
                key={faq.id}
                value={faq.id}
                className="border-b-[3px] border-app-darker-green"
              >
                <Accordion.Header>
                  <Accordion.Trigger
                    className="__h3 flex items-center justify-between w-full py-7 group"
                    style={{
                      paddingRight: bounds.left + 24,
                    }}
                  >
                    {faq.title}
                    <ChevronDown className="w-5 text-app-darker-green group-data-[state=open]:rotate-180 duration-300" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  style={{
                    paddingRight: bounds.left + 24,
                  }}
                  className="__body_16 text-app-text data-[state=open]:animate-accordion-slideDown data-[state=closed]:animate-accordion-slideUp overflow-hidden"
                >
                  <div className="pb-7">{faq.content}</div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
