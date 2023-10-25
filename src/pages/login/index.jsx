import { useState } from "react";
import { login, loginfirebase } from "../../api/Auth";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Space,
  Spin,
  Typography,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import Container from "../../components/utils/Container";
import { useUserStore } from "../../store/user";
import "./login.css";
import { useDarkModeStore } from "../../store/dark-mode";
import { loginGoogle } from '../../utils/authFirebase';
import { setAppToken, setUserInfo } from '../../utils/utils';
import { getCurrentUser } from "../../api/User";
const { Title, Paragraph } = Typography;
// import { history } from 'umi';


function Login() {
  const setUser = useUserStore((state) => state.setUser);
  const authUser = useUserStore((state) => state.user);
  const setMode = useDarkModeStore((state) => state.setMode);

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [errorLoginFirebase, setErrorLoginFirebase] = useState({});
  const navigate = useNavigate();


  // const onFinish = (values) => {
  //   setStatus("pending");
  //   login(values)
  //     .then((res) => {
  //       // 201 : created
  //       if (res.status === 201) {
  //         localStorage.setItem("current_user", JSON.stringify(res.data));
  //         setUser(res.data);
  //         setMode(res.data.mode);
  //         navigate("/" + res.data.username);
  //       }

  //       throw new Error("password and email incorrect");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //       setError(e);
  //       setStatus("rejected");
  //     });
  // };

  const handleLoginGoogle = async () => {
    try {
      const accessToken = await loginGoogle();
      if (accessToken) {
        const res = await loginfirebase({token: accessToken});
        if (res) {
          setAppToken(res.data);
          const user = await getCurrentUser();
          if(user) {
            setUserInfo(user);
            navigate("/"+user.userName);
            // if (!history) return;
            // const { query } = history.location;
            // const { redirect } = query;
            // history.push(redirect || '/');
          }
          return;
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login">
      <Container>
        <Row justify="center">
          <Col md={14}>
            {/* {status === "pending" && (
              <Space
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Spin />
              </Space>
            )} */}

            {/* {status === "rejected" && (
              <Alert message={error.toString()} type="error" showIcon />
            )} */}
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
