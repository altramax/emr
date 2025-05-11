"use client";
import { useUserStore } from "@/src/store/userStore";
import Button from "@/src/components/atoms/button/button";
import { signOutAction } from "@/src/app/actions/actions";


export default function DashboardTemplate() {
  const user = useUserStore((state) => state.user);
  // const clearUser = useUserStore((state) => state.clearUser);

  const logout = async () => {
    await signOutAction();

  };

  return (
    <div>
      <Button value="Signout" onClick={logout} />
      This is {user?.role} dashboard{" "}
    </div>
  );
}
