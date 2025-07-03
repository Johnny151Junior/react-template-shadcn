import { Button } from "@/components/ui/button";
import { getMe } from "@/services/auth/auth-service";
import { Link } from "react-router";

function DashboardPage() {
  const firstTime = async () => {
    await Promise.all([getMe(), getMe()]);
  };
  return (
    <>
      Dashbaord<Button onClick={firstTime}></Button>
      <Link to="/page-2">goooo</Link>
    </>
  );
}

export default DashboardPage;
