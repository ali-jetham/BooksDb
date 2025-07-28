export function getIsoDate(): string {
	const date = new Date();
	const [year, month, day] = [
		date.getFullYear(),
		String(date.getMonth() + 1).padStart(2, "0"),
		String(date.getDate()).padStart(2, "0"),
	];
	const regionalIso = `${year}-${month}-${day}`;
	console.log(regionalIso);
	return regionalIso;
}
