import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { booksApi } from "../../api/booksApi";

export default function Book(): React.JSX.Element {
	const [bookData, setBookData] = useState({});
	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await booksApi.get(id as string);
			console.log(res);
			setBookData(res);
		}

		fetchData();
	}, []);

	return (
		<div className="grid grid-cols-[max-content_auto] grid-rows-[auto] gap-6 overflow-auto">
			<div className="row-start-1 ">
				<img src={bookData?.coverUrl} alt="Book cover" className="rounded-[6px]" />
			</div>

			<div className="col-start-2 row-start-1 flex flex-col gap-2">
				<h1 className="text-4xl">{bookData.title}</h1>
				<div>
					<p>By {bookData.authors}</p>
					<p className="text-sm">{bookData.publicationDate && bookData.publicationDate}</p>
				</div>
				<p>Description goes here</p>
			</div>
			<div className="  row-start-2">
				<h1>notes here</h1>
			</div>
		</div>
	);
}
