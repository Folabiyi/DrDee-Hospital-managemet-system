import { PublicFooter } from "@/components/public-site/footer";
import { PublicHeader } from "@/components/public-site/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  );
}
