import Image from "next/image";
import { ComponentProps } from "react";

const CheckSqureIcon = (props: ComponentProps<"div">) => (
  <div {...props}>
    <Image
      src={"/imgs/check-squre-icon.png"}
      width={144}
      height={137}
      alt="Check squre icon"
    />
  </div>
);

export default CheckSqureIcon;
