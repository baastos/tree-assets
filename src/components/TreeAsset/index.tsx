import { InputSearch } from "../InputSearch";
import { Tree } from "../Tree";

export function TreeAsset() {
  return (
    <section
      id="tree-asset-section"
      style={{
        width: "50%",
        border: "1px solid var(--disabled)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InputSearch />
      <Tree />
    </section>
  );
}
