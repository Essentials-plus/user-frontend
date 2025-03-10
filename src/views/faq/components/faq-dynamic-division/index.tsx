import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";
import Collapsible from "react-collapsible";
import { FaAngleDown } from "react-icons/fa6";

const FaqDynamicDivision = ({
  title,
  faqs,
}: {
  title: string;
  faqs: { title: string; description: ReactNode }[];
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const handleClick = (i: number) => {
    setActiveFaq((prev) => (prev === i ? null : i));
  };
  return (
    <div>
      <h4 className="text-lg font-semibold text-app-darker-green">
        Alles over
      </h4>
      <h2 className="__h2 mt-3">{title}</h2>
      <div className="mt-5">
        <div>
          {faqs.map((data, i) => (
            <CollapsibleColumn
              {...data}
              isOpen={activeFaq === i}
              onClick={() => handleClick(i)}
              key={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqDynamicDivision;

function CollapsibleColumn({
  description,
  title,
  onClick,
  isOpen,
}: {
  title: string;
  description: ReactNode;
  onClick: () => void;
  isOpen: boolean;
}) {
  return (
    <div
      className={cn(
        "border-b border-black/90 duration-300",
        isOpen && "border-black",
      )}
    >
      <div
        onClick={onClick}
        className="flex cursor-pointer items-center justify-between py-5"
      >
        <h3 className="__body_18">{title}</h3>
        <span
          className={cn(
            "text-2xl inline-block duration-200",
            isOpen && "rotate-180",
          )}
        >
          <FaAngleDown />
        </span>
      </div>
      <Collapsible trigger="" open={isOpen} transitionTime={200}>
        {typeof description === "string" ? (
          <p className="__body_16 pb-5">{description}</p>
        ) : (
          <div className="__body_16 pb-5">{description}</div>
        )}
      </Collapsible>
    </div>
  );
}
