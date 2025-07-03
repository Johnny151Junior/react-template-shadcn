import { Button } from "@/components/ui/button";
import { getMe } from "@/services/auth/auth-service";
import { useEffect } from "react";

function DashboardPage() {
  const firstTime = async () => {
    await Promise.all([getMe(), getMe()]);
  };
  return (
    <>
      Dashbaord<Button onClick={firstTime}></Button>
    </>
  );
}

export default DashboardPage;
