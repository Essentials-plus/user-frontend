import { demoFaqs } from "@/constants/faqs";
import FaqDynamicDivision from "@/views/faq/components/faq-dynamic-division";

const FaqSection = () => {
  return (
    <section className="my-[101px]">
      <div className="container">
        <div className="max-w-[1000px] mx-auto space-y-[100px]">
          <FaqDynamicDivision title="E+ maaltijdplannen" faqs={demoFaqs} />
          <FaqDynamicDivision title="E+ Supplementen" faqs={demoFaqs} />
          <FaqDynamicDivision title="Account" faqs={demoFaqs} />
          <FaqDynamicDivision title="Levering" faqs={demoFaqs} />
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
