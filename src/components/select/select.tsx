import { useEffect } from "react";

interface SelectProps {
	name: string;
	label?: string;
	items: { key: string | number; value: string }[];
	value?: string | number;
	className: string;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ name, label, items, value, placeholder, className, onChange }: SelectProps) => {
	return (
		<form className={className}>
			{label && (
				<label
					htmlFor={name}
					className="block text-sm font-medium text-dark"
				>
					{label}
				</label>
			)}
			<select
				id={name}
				className={
					" outline-none bg-white border-2 border-secondary-50 text-dark text-sm rounded-lg block w-full p-2.5"
				}
				onChange={onChange}
			>
				<option value={""}>{placeholder || "Chọn một"}</option>
				{items.map((item) => (
					<option
						value={item.key}
						selected={value === item.key}
					>
						{item.value}
					</option>
				))}
			</select>
		</form>
	);
};

export default Select;
