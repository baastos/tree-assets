import { TreeDisplay } from "@/components/TreeDisplay";
import { Header } from "@/components/Header";
import { TreeFilters } from "@/components/TreeFilters";
import { TreeAsset } from "@/components/TreeAsset";

export default function Home() {
  return (
    <div>
      <Header />
      <main
        style={{
          backgroundColor: "var(--white)",
          margin: "8px",
          height: "calc(100vh - 74px)",
          padding: "8px",
        }}
      >
        <TreeFilters />
        <div
          id="tree-sections"
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <TreeAsset />
          <TreeDisplay />
        </div>
      </main>
    </div>
  );
}
