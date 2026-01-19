import React, { useEffect } from "react";
import OtpInput from "react-otp-input";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { useNavigate } from "react-router-dom";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import useStyles from "@/styles/style";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Forget_Otp } from "./ForgetApi";
import axios from "axios";
const Forgotopt = ({ Otppopup, Setotppopup, Email, setLoading, reset }) => {
  const classes = useStyles();
  const [OTP, Setotp] = React.useState();
  const [invalide, Setinvalid] = React.useState(false);
  const router = useRouter();
  const [time, setTime] = React.useState(300);
  const [loading, Setloading] = React.useState(false);
  const Forget_Otp = (Otp, Email) => {
    let data = axios.post(
      `https://api.cannabaze.com/UserPanel/ValidateOTPForgetPassword/`,
      {
        otp: Otp,
        email: Email,
      }
    );
    return data;
  };
  const onSubmit = (data) => {
    const Otp = OTP;
    Setloading(true);
    Forget_Otp(Otp, Email)
      .then((res) => {
        Setloading(false);
        if (res.status === 202) {
          router.push({
            pathname: "/createpassword",
            query: { Email },
          });
        }
      })
      .catch((error) => {
        Setloading(false);
        console.error(error);
      });
  };
  useEffect(() => {
    let timer = setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          clearInterval(timer);
          return 0;
        } else return time - 1;
      });
    }, 1000);
  }, []);

  return (
    <Dialog
      open={true}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "380px",
          padding: "20px",
        },
      }}
    >
      <div className="d-flex justify-content-center align-item-center">
        <RiVerifiedBadgeFill size={48} color={"#31B655"} />
      </div>
      <Box className={classes.emailVer_title}>
        <DialogTitle>{`Verification`}</DialogTitle>
      </Box>
      <React.Fragment>
        <Box className={classes.muiDialogContent}>
          <DialogContent>
            <DialogContentText>
              <div className=" mb-2">
                <p className=" login_otp_heads">
                  {`please check your email  we've sent a code to`}{" "}
                  <span className="login_otp_email">{Email}</span>
                </p>
              </div>
            </DialogContentText>
            <div className="gap display">
              <div className="col-12 center  ">
                <div className="otp_input">
                  {invalide && (
                    <span style={{ color: "red" }}>{`InValide Otp`}</span>
                  )}
                  <OtpInput
                    value={OTP}
                    onChange={(otp) => Setotp(Otp)}
                    numInputs={4}
                    renderSeparator={<span>-</span>}
                    shouldAutoFocus
                    isInputNum={true}
                    hasErrored={true}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
              </div>
              <div className="col-12 my-2 center ">
                <span>
                  {`Didn't get  a code?`}
                  <span> {`resend`}</span>
                </span>
                {/* {time === 0 &&  <span className="login_otp_heads">Didn't get  a code?  <span className="login_otp_email text-success" onClick={Resend}> resend</span> </span>}
                            {time !== 0 && <p className="login_otp_email"> Didn't get  a code? resend after  {`${Math.floor(time / 60)}`.padStart(2, 0)}: {`${time % 60}`.padStart(2, 0)}</p>}
                      */}
              </div>
            </div>
          </DialogContent>
        </Box>
        <DialogActions>
          <Box className={classes.muiNormalBtn}>
            <Button onClick={() => Setotppopup(false)}>{`Cancel`}</Button>
          </Box>
          <Box className={`${classes.emailVerLoadingBtn}`}>
            <LoadingButton type="submit" loading={loading} onClick={onSubmit}>
              {`Verify`}
            </LoadingButton>
          </Box>
        </DialogActions>
      </React.Fragment>
    </Dialog>
  );
};

export default Forgotopt;
