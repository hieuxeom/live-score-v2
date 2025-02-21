export const sliceText = (text: string, numsSlice: number = 4): string => {
	try {
		return text.length <= numsSlice ? text : text.slice(0, numsSlice) + "...";
	} catch (error) {
		return "error";
	}
};
