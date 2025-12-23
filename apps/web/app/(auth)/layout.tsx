import { Authlayout } from "@/modules/auth/ui/layouts/auth-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authlayout>
      {children}
    </Authlayout>
  );
};
export default Layout;
