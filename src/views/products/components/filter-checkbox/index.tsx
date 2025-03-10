import { Checkbox, CheckboxProps } from "@/common/components/ui/checkbox";

type FilterCheckboxProps = {
  checkboxProps?: CheckboxProps;
  label: string;
  count: string | number;
};

const FilterCheckbox = ({
  checkboxProps,
  count,
  label,
}: FilterCheckboxProps) => {
  return (
    <label className="group flex cursor-pointer select-none items-center gap-[15px] text-base">
      <Checkbox {...checkboxProps} />
      <span className="font-medium text-app-text duration-200 group-hover:text-app-black">
        {label}
      </span>
      <span className="ml-auto font-semibold text-app-black">{count}</span>
    </label>
  );
};

export default FilterCheckbox;
