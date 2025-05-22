'use client';
import Button from '@/src/components/atoms/button/button';
import { signOutAction } from '@/src/app/actions/actions';
import { useRoleHook } from '@/src/hooks/role-hook';

export default function DashboardTemplate() {
  const logout = async () => {
    await signOutAction();
  };

  const { role, getRole } = useRoleHook();

  return (
    <div>
      <Button value="Signout" onClick={logout} />
      <Button value="getRole" onClick={getRole} />
      This is {role} dashboard
    </div>
  );
}
