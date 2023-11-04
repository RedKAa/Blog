import { useEffect } from "react";
import { updateMode } from "../../../../../api/User";
import { useDarkModeStore } from "../../../../../store/dark-mode";
import { useUserStore } from "../../../../../store/user";
// import darkModeImg from "../../public/img/dark-mode-img.svg";
// import lightModeImg from "../../public/img/light-mode-img.svg";
import * as S from "./styles";
import { getUserInfo, setUserInfo } from "../../../../../utils/utils";

const CustomizationSetting = () => {
  const mode = useDarkModeStore((state) => state.mode);
  const setMode = useDarkModeStore((state) => state.setMode);
  const authUser = getUserInfo();

  useEffect(() => {
    updateMode(mode).then(() => {
      setUserInfo({ ...authUser, mode });
    });
  }, [mode]);

  useEffect(() => {
    console.log("theme: ", mode);
  }, [mode]);
  return (
    <S.CustomizationSetting>
      <S.Title level={3}>Appearance</S.Title>
      <S.ThemeSelector>
        <S.RadioWrapper onClick={() => setMode("Light")}>
          <S.Radio
            name="config_theme"
            value="light_theme"
            checked={mode === "Light"}
          />
          <div>
            <S.Title level={5} style={{ marginTop: "0px" }}>
              Light Theme
            </S.Title>
            {/* <S.Image
              style={{
                borderRadius: "6px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
              }}
              src={lightModeImg}
              alt=""
              width={"100%"}
            /> */}
          </div>
        </S.RadioWrapper>
        <S.RadioWrapper onClick={() => setMode("Dark")}>
          <S.Radio
            name="config_theme"
            value="dark_theme"
            checked={mode === "Dark"}
          />
          <div>
            <S.Title level={5} style={{ marginTop: "0px" }}>
              Dark Theme
            </S.Title>
            {/* <S.Image
              style={{
                borderRadius: "6px",
                boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
              }}
              src={darkModeImg}
              alt=""
              width={"100%"}
            /> */}
          </div>
        </S.RadioWrapper>
      </S.ThemeSelector>
    </S.CustomizationSetting>
  );
};

export default CustomizationSetting;
