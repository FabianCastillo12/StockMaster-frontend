"use client";
import { useEffect } from "react";
import { BounceLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function createPost() {
  const {data:sesión}=useSession()
  const route=useRouter()
  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };
  const direcion = () => {
   route.push("/dashboard/home");
  };
  useEffect(() => {
    setTimeout(() => {
      direcion();
    }, 1000);
    
  }, []);
  return (
    <>
      <div className=" justify-center flex items-center flex-1 h-[600px]">
        <BounceLoader
          color={"orange"}
          loading={true}
          cssOverride={override}
          size={80}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </>
  );
}
