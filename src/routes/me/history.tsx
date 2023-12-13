import { ComingSoon } from "~/components/Coming";
import PrivateLayout from "~/components/layout/Private";
import { MeteTag } from "~/components/meta";

export default function History() {
  return (
    <PrivateLayout>
       <MeteTag name={"history"} />
      <ComingSoon />
    </PrivateLayout>
  );
}
