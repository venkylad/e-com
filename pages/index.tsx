import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "@/utils/firebase";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResults = await user.getIdTokenResult();
        console.log(user);

        dispatch({
          type: "USER_LOGGED_IN",
          payload: {
            user: user.email,
            token: idTokenResults.token,
          },
        });
      }
    });

    () => unSubscribe();
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
