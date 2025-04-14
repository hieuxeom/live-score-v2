import {useNavigate} from "react-router";
import ROUTE_PATH from "../../../configs/routes.config";
import {sliceText} from "../../../utils/slice-text";
import Button from "../../button";
import Typography from "../../typography";
import {useCookies} from "react-cookie";
import {useContext, useEffect} from "react";
import {LanguageContext} from "../../provider/language-provider.tsx";
import useAxios from "../../../hooks/useAxios.ts";
import API_ROUTES from "../../../configs/api-routes.config.ts";
import {IAPIResponse} from "../../../types/general";
import {TNewAccessToken} from "../../../types/auth";

interface HeaderProps {
}

const Header = ({}: HeaderProps) => {
    const navigate = useNavigate();

    const axios = useAxios();

    const {currentLanguage, setCurrentLanguage} = useContext(LanguageContext)

    const [cookies, setCookies] = useCookies(["access_token", "refresh_token", "username", "user_id"]);


    const handleReAuth = () => {
        if (!cookies.access_token && cookies.refresh_token) {
            return axios.get<IAPIResponse<TNewAccessToken>>(API_ROUTES.ACCOUNT.GET_ACCESS_TOKEN)
                .then((response) => response.data)
                .then((response) => {
                    setCookies('access_token', response.results.access_token);
                    setCookies('username', response.results.username);
                    setCookies('user_id', response.results.user_id);
                })
        }
    }

    const handleChangeLanguage = () => {
        if (currentLanguage === "VN") {
            setCurrentLanguage("EN");
        } else {
            setCurrentLanguage("VN");
        }
    }

    useEffect(() => {
        handleReAuth();
    }, []);

    return (
        <nav
            className={
                "absolute top-0 left-0 w-full flex justify-center items-center bg-white rounded-bl-xl rounded-br-xl p-2"
            }
        >
            <div className={"w-full max-w-7xl flex justify-between items-center"}>
                <div
                    className={"h-max"}
                    onClick={() => navigate(ROUTE_PATH.HOME)}
                >
                    <img
                        src="/logo_text_hrz.png"
                        alt=""
                        className={"max-h-8 h-full"}
                    />
                </div>
                <div className={"flex items-center gap-4"}>
                    {cookies.refresh_token ? (
                        <>
                            <Typography type={"small"}>
                                {cookies.username ? sliceText(cookies.username, 8) : "-"}
                            </Typography>
                            <Button
                                color={"danger"}
                                size={"sm"}
                                onClick={() => {
                                    navigate(ROUTE_PATH.AUTH.SIGN_OUT);
                                }}
                            >
                                Đăng xuất
                            </Button>
                        </>
                    ) : (
                        <Button
                            color={"default"}
                            size={"sm"}
                            onClick={() => navigate(ROUTE_PATH.AUTH.SIGN_IN)}
                        >
                            Đăng nhập
                        </Button>
                    )}
                    <Button
                        color={"primary"}
                        variant={"light"}
                        size={"sm"}
                        onClick={handleChangeLanguage}
                    >
                        {currentLanguage === "EN" &&
							<img width="24" height="24" src="https://img.icons8.com/color/96/usa.png" alt="usa"/>}
                        {currentLanguage === "VN" &&
							<img width="24" height="24" src="https://img.icons8.com/color/96/vietnam.png"
								 alt="vietnam"/>}
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
