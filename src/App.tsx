import { useEffect } from "react";
import { loginService } from "./api/auth/login.service";

function App() {
  useEffect(() => {
    const testLogin = async () => {
      try {
        const res = await loginService({
          username: "admin",
          password: "12qwaszx",
        });

        console.log("LOGIN SUCCESS:", res);
      } catch (err) {
        console.error("LOGIN ERROR:", err);
      }
    };

    testLogin();
  }, []);

  return (
    <>
      <div>Testing Login...</div>
    </>
  );
}

export default App;
