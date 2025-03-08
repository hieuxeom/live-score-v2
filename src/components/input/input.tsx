import React, {ChangeEvent, useState} from "react";

import clsx from "clsx";
import Typography from "../typography";
import Button from "../button";
import ICON_CONFIG from "../../configs/icon.config";

interface InputProps {
    type?: "text" | "number" | "email" | "password";
    id?: string;
    name: string;
    label?: string;
    labelPlacement?: "top" | "left";
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    value: string;
    errorMessage?: string;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isDisabled?: boolean;
    isError?: boolean;
    isRequired?: boolean;
    classNames?: {
        wrapper?: string;
        label?: string;
        input?: string;
    };
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = ({
                   type = "text",
                   id,
                   name,
                   label,
                   labelPlacement = "top",
                   placeholder,
                   onChange,
                   onFocus,
                   onBlur,
                   value,
                   errorMessage,
                   startContent,
                   endContent,
                   isDisabled = false,
                   isError = false,
                   isRequired = false,
                   classNames,
                   onKeyDown,
               }: InputProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);
    const [isTouched, setIsTouched] = useState(false);
    const MapWrapperClasses: Record<NonNullable<InputProps["labelPlacement"]>, string> = {
        top: "flex flex-col justify-center gap-0.5",
        left: "flex items-center gap-2",
    };

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

    return (
        <div className={clsx("w-full", classNames?.wrapper, MapWrapperClasses[labelPlacement])}>
            {label && (
                <label
                    htmlFor={id}
                    className={clsx("min-w-max text-secondary", classNames?.label, {
                        "!text-danger": isTouched && isError && value.length > 0,
                    })}
                >
                    <Typography type={"p"}>
                        {label} {isRequired && <span className="text-danger">*</span>}
                    </Typography>
                </label>
            )}
            <div className={"w-full h-full flex items-center group relative"}>
                {startContent && (
                    <div
                        className={clsx(
                            "min-w-max h-full px-4 py-2 border transition-all duration-300",
                            "rounded-s-xl border-b-4 border-r-0 group-hover:border-secondary",
                            {
                                "!border-danger !text-danger": isError && value.length > 0,
                                "border-secondary text-secondary": isFocus || (!isError && value.length > 0),
                                "bg-secondary-400 text-light": isDisabled,
                                "border-secondary/50 text-secondary/50": !isFocus && value.length === 0,
                            }
                        )}
                    >
                        {startContent}
                    </div>
                )}
                <input
                    id={id}
                    name={name}
                    value={value}
                    type={type === "password" && isShowPassword ? "text" : type}
                    onChange={(e) => onChange && onChange(e)}
                    onFocus={() => {
                        setIsFocus(true);
                        onFocus && onFocus();
                    }}
                    onBlur={() => {
                        setIsFocus(false);
                        onBlur && onBlur();
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    disabled={isDisabled}
                    className={clsx(
                        "w-full px-4 py-2 border rounded-xl border-b-4 outline-none transition-all duration-300",
                        "focus:border-secondary group-hover:border-secondary",
                        classNames?.input,
                        {
                            "!border-danger !text-danger": isTouched && isError && value.length > 0,
                            "border-secondary": isFocus || (!isError && value.length > 0),
                            "!rounded-s-none !border-l-0 pl-0": startContent,
                            "!rounded-e-none !border-r-0": endContent,
                            "bg-secondary-400 text-light": isDisabled,
                            "border-secondary/50": !isFocus && value.length === 0,
                        },
                        type === "number" &&
                        "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    )}
                    onClick={() => setIsTouched(true)}
                />
                {endContent && (
                    <div
                        className={clsx(
                            "min-w-max h-full px-4 py-2 border transition-all duration-300",
                            "rounded-e-xl border-b-4 border-l-0 group-hover:border-secondary",
                            {
                                "!border-danger !text-danger": isError && value.length > 0,
                                "border-secondary text-secondary": isFocus || (!isError && value.length > 0),
                                "bg-secondary-400 text-light": isDisabled,
                                "border-secondary/50 text-secondary/50": !isFocus && value.length === 0,
                            }
                        )}
                    >
                        {endContent}
                    </div>
                )}
                {type === "password" && (
                    <Button
                        isIconOnly
                        size={"md"}
                        variant={"light"}
                        color={"secondary"}
                        showBackground={false}
                        startIcon={isShowPassword ? ICON_CONFIG.HIDE_EYE : ICON_CONFIG.VIEW}
                        className={"absolute right-2 top-1/2 -translate-y-1/2"}
                        onMouseDown={() => setIsShowPassword(true)}
                        onMouseUp={() => setIsShowPassword(false)}
                    ></Button>
                )}
            </div>

            {isTouched && isError && value.length > 0 && (
                <Typography
                    type={"tiny"}
                    className={clsx("text-danger italic mt-2")}
                >
                    {errorMessage}
                </Typography>
            )}
        </div>
    );
};

export default Input;
