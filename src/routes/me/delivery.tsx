import { ComingSoon } from "~/components/Coming";
import PrivateLayout from "~/components/layout/Private";
import { MeteTag } from "~/components/meta";

export default function Delivery() {
  return (
    <PrivateLayout>
      <MeteTag name={"delivery"} />
      <ComingSoon />
    </PrivateLayout>
  );
}
