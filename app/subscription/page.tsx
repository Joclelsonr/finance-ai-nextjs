import { auth } from "@clerk/nextjs/server";
import Navbar from "../components/navbar";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default SubscriptionPage;
