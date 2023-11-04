import {
  Button,
  Card,
  Col,
  Row,
  Typography
} from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginfirebase } from "../../api/Auth";
import { getCurrentUser } from "../../api/User";
import Container from "../../components/utils/Container";
import { useDarkModeStore } from "../../store/dark-mode";
import { useUserStore } from "../../store/user";
import { loginGoogle } from '../../utils/authFirebase';
import { getUserInfo, setAppToken, setUserInfo } from '../../utils/utils';
import "./login.css";
const { Title, Paragraph } = Typography;


function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const authUser = useUserStore((state) => state.user);
  const setMode = useDarkModeStore((state) => state.setMode);
  const [emailError, setEmailErr] = useState(false);

  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const handleLoginGoogle = async () => {
    try {
      setEmailErr(false);
      const accessToken = await loginGoogle();
      if (accessToken && accessToken != 'email_not_acceptable') {
        const res = await loginfirebase({token: accessToken});
        if (res) {
          setAppToken(res.data);
          const user = await getCurrentUser();
          if(user) {
            setUserInfo(user);
            setMode(user.mode);
            let loguser = getUserInfo();
            console.log('get user',loguser);
            if (locationState) {
              const { redirectTo } = locationState;
              navigate(`${redirectTo.pathname}${redirectTo.search}`);
            } else {
              navigate("/");
            }
          }
          return;
        }
      }
      else if (accessToken == 'email_not_acceptable'){
        setEmailErr(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <Container>
        {emailError && <Row justify="center">
          <Col md={14}>
            <Paragraph
                  style={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "red",
                  }}
                >
                  Please use FPTU account to login!
              </Paragraph>
          </Col>
        </Row>}
        <Row justify="center">
          <Col md={14}>
            <Card className="login__card">
              <Title className="login__title">
                Welcome to FPTBlog Community
              </Title>
              <Paragraph
                style={{
                  textAlign: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "rgb(113,113,113)",
                }}
              >
                Login
              </Paragraph>
              <Button block type="primary" onClick={handleLoginGoogle}>
                Login by FPTU google account
              </Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
