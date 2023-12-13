import { ComingSoon } from "~/components/Coming";
import PrivateLayout from "~/components/layout/Private";
import { MeteTag } from "~/components/meta";
import { useAuth } from "~/contexts/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <PrivateLayout>
      <MeteTag
        name={`${user().first_name?.toLowerCase()}${user().last_name?.toLowerCase()}`}
      />
      <ComingSoon />
    </PrivateLayout>
  );
}
