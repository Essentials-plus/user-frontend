import { ReactNode } from "react";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/common/components/ui/accordion";

type FilterAccordionProps = {
  value: string;
  trigger: string;
  children: ReactNode;
};

const FilterAccordion = ({
  children,
  trigger,
  value,
}: FilterAccordionProps) => {
  return (
    <AccordionItem value={value}>
      <AccordionTrigger className="border-t border-app-black py-3.5">
        {trigger}
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2.5 pb-6">{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterAccordion;
