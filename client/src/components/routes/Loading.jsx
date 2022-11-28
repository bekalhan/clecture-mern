import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingGIF from "../../img/loading.gif";
import {Box} from '@mui/material';

export default function Loading({ path = "login" }) {
  // state
  const [count, setCount] = useState(4);
  // hooks
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 &&
      navigate(`/${path}`, {
        state: location.pathname,
      });
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <Box
      sx={{display:"flex",justifyContent: "center",marginTop:"4rem"}}
      style={{ height: "60vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "500px" }} />
    </Box>
  );
}