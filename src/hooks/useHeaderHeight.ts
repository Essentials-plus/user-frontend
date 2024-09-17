import { atom, useAtom } from "jotai";

const headerHeightAtom = atom(88);
const useHeaderHeight = () => {
  const [headerHeight, setHeaderHeight] = useAtom(headerHeightAtom);

  return { headerHeight, setHeaderHeight };
};

export default useHeaderHeight;
