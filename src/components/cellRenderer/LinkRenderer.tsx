import type { CustomCellRendererProps } from "ag-grid-react";
import { Link } from "react-router";

export default function LinkRenderer(params: CustomCellRendererProps): React.JSX.Element {
	return (
		<div>
			<Link to={`${params.data.userBookId}`} className="text-folly-500 hover:underline">
				{params.data.title}
			</Link>
		</div>
	);
}
