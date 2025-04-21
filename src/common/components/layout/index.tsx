import Footer from "@/common/components/footer";
import Header from "@/common/components/header";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <main className="max-lg:pb-12">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
