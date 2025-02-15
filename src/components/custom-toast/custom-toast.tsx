import { useEffect } from "react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";

// interface CustomToastProps {}

const CustomToast = () => {
	function useMaxToasts(max: number) {
		const { toasts } = useToasterStore();

		useEffect(() => {
			toasts
				.filter((t) => t.visible) // Only consider visible toasts
				.filter((_, i) => i >= max) // Is toast index over limit?
				.forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
		}, [toasts, max]);
	}

	useMaxToasts(3);

	return (
		<Toaster
			position="top-center"
			reverseOrder={false}
			gutter={8}
			toastOptions={{
				duration: 2000,
				style: {
					color: "#1f2937",
				},
				loading: {
					duration: 5000,
					style: {
						backgroundColor: "#406D96",
						color: "#FCFAFA",
					},
				},
				success: {
					iconTheme: {
						primary: "#ffffff",
						secondary: "#53DD6C",
					},
					style: {
						backgroundColor: "#53DD6C",
						color: "#FCFAFA",
					},
				},
				error: {
					iconTheme: {
						primary: "#ffffff",
						secondary: "#C1292E",
					},
					style: {
						backgroundColor: "#C1292E",
						color: "#FCFAFA",
					},
				},
			}}
		/>
	);
};

export default CustomToast;
