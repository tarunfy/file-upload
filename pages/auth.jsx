import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const auth = () => {
  const { googleAuthentication, user } = useContext(AuthContext);
  console.log(user);
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

export default auth;
