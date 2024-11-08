import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "./components/navbar";

const Home = async () => {
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

export default Home;
