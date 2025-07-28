import type { CustomCellRendererProps } from "ag-grid-react";

export default function ImgRenderer(params: CustomCellRendererProps): React.JSX.Element {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<img src={params.value} alt="book cover" width={120} className="rounded" />
		</div>
	);
}
