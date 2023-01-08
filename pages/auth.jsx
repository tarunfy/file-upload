import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";

const Auth = () => {
  const { googleAuthentication, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-slate-100 min-w-full flex justify-center items-center">
      <button
        onClick={googleAuthentication}
        className="bg-white shadow-md rounded px-4 border py-2"
      >
        Continue with google
      </button>
    </div>
  );
};

export default Auth;
