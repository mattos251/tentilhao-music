import { getAuth, Auth } from "firebase/auth";
import { app } from "@/firebase";

const auth: Auth = getAuth(app);

export default {
  isAuthenticated: false,

  checkAuth() {
    // Lógica para verificar a autenticação
    return auth.currentUser !== null;
  }
};
