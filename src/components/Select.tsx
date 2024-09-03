type SelectProps = {
	data: { text: string; value: string }[];
	name?: string;
	className?: string;
	placeholder?: string;
	label?: string;
	onChange?: (e: any) => void;
	value?: string;
	defaultValue?: string;
	disabled?: boolean;
	error?: string;
};

const Select: React.FC<SelectProps> = ({
	className,
	name,
	data,
	placeholder,
	label,
	onChange,
	value,
	defaultValue,
	disabled,
	error,
}) => {
	return (
		<div className="flex flex-col gap-2">
			{label && (
				<label className="flex gap-2 items-center" htmlFor={name && name}>
					{label}
				</label>
			)}
			<select
				name={name}
				disabled={disabled}
				value={value}
				defaultValue={defaultValue}
				onChange={(e) => onChange && onChange(e.target.value)}
				className={`${className} ${
					error ? "border-danger text-danger" : "border-tertiary"
				} bg-transparent font-bold border-b-2 py-2 focus:outline-none focus:ring-4 focus:rounded-lg focus:ring-primary focus:border-none`}
			>
				{placeholder && (
					<option className="bg-bkg" value="">
						{placeholder}
					</option>
				)}
				{data?.map?.((item, index) => (
					<option
						className="text-lg bg-bkg"
						key={item?.value + index}
						value={item?.value}
					>
						{item?.text}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
