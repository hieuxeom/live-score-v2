import clsx from "clsx";
import {ChangeEvent, useEffect, useState} from "react";

interface FileInputProps {
    title?: string;
    value?: FileList | null;
    name: string;
    helperText?: string;
    isMultiple?: boolean;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput = ({title = "", value = null, name, helperText, isMultiple = false, onChange}: FileInputProps) => {
    const [isFocus, setIsFocus] = useState<boolean>(false);

    useEffect(() => {
        console.log(value)
    }, [value]);

    return (
        <div
            className="flex flex-col gap-2 cursor-pointer"
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
        >
            <label
                htmlFor={name}
                className={clsx("text-base transition-all duration-300 cursor-pointer text-secondary")}
            >
                {title || "Upload file"}
            </label>
            <div
                className={clsx(
                    "relative flex items-center border rounded-xl shadow-sm w-full overflow-hidden transition-all duration-300transition-all duration-300",
                    {
                        "border-secondary": (value && value.length > 0) || isFocus,
                        "border-secondary/25": !value && !isFocus || value?.length === 0,
                    }
                )}
            >
                <label
                    htmlFor={name}
                    className={clsx(
                        "cursor-pointer px-4 py-2 text-white text-sm font-medium hover:bg-secondary transition-all duration-300 border-b-2",
                        {
                            "border-secondary bg-secondary": (value && value.length > 0) || isFocus,
                            "border-secondary/10 bg-secondary/50": !value && !isFocus || value?.length === 0,
                        }
                    )}
                >
                    Choose File
                </label>
                <input
                    id={name}
                    name={name}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    className={"hidden"}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={onChange}
                    multiple={isMultiple}
                />
                <div
                    className={clsx("flex-grow px-4 py-2 text-sm border-b-2 transition-all duration-300", {
                        "text-secondary": (value && value.length > 0) || isFocus,
                        "text-secondary/25": !value && !isFocus || value?.length === 0,
                    })}
                >
                    {value && value.length > 0 ? `${value && value.length} files selected` : "No file selected"}
                </div>
            </div>
            {helperText && (
                <p
                    className={clsx("mt-1 text-sm italic transition-all duration-300", {
                        "text-secondary": (value && value.length > 0) || isFocus,
                        "text-secondary/25": !value && !isFocus || value?.length === 0,
                    })}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export default FileInput;
