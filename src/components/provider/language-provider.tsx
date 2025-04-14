import {createContext, useEffect, useState} from "react";

type TLanguage = "VN" | "EN";

interface ILanguageContext {
    currentLanguage: TLanguage;
    setCurrentLanguage: React.Dispatch<React.SetStateAction<TLanguage>>;
}

export const LanguageContext = createContext<ILanguageContext>({
    currentLanguage: "VN",
    setCurrentLanguage: () => {
    },
})

const LanguageProvider = ({children}: { children: React.ReactNode }) => {

    const [currentLanguage, setCurrentLanguage] = useState<TLanguage>(localStorage.getItem("currentLanguage") as TLanguage);

    useEffect(() => {
        if (!localStorage.getItem("currentLanguage")) {
            localStorage.setItem("currentLanguage", "VN");
            setCurrentLanguage("VN");
        }
    }, [])

    useEffect(() => {
        console.log(currentLanguage);
        localStorage.setItem("currentLanguage", currentLanguage);
    }, [currentLanguage]);

    return (
        <LanguageContext.Provider value={{
            currentLanguage,
            setCurrentLanguage
        }
        }>
            {children}
        </LanguageContext.Provider>
    );
};

export default LanguageProvider;