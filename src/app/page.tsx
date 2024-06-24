import { MainContainer } from "@/components/container/main";
import { Me } from "@/components/me";

export default function Home() {
  return (
    <main className="w-full bg-slate-50">
      <MainContainer>
        <Me />
      </MainContainer>
    </main>
  );
}
