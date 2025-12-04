import { useContext } from "react";
import { AuthContext } from "./AuthContext.js";

function useAuth() {
  return useContext(AuthContext);
}

export { useAuth };
