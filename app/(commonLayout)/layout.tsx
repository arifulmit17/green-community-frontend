import { Footer2 } from "@/components/layout/footer2";
import { Navbar1 } from "@/components/layout/navbar1";

export const dynamic = "force-dynamic"

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar1></Navbar1>
      {children}
      <Footer2></Footer2>
    </div>
  );
}