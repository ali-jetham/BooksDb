import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { booksApi } from "../../api/booksApi";
import type { BookRowData } from "../../utils/types";

export default function Book(): React.JSX.Element {
	const [bookData, setBookData] = useState<Partial<BookRowData>>({});
	const [notes, setNotes] = useState<string>("");

	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			const res = await booksApi.get(id as string);
			console.log(res);
			setBookData(res);
			setNotes(res.notes);
		}
		if (id) fetchData();
	}, []);

	useEffect(() => {
		if (!bookData.userBookId) {
			return;
		}

		const timer = setTimeout(() => {
			if (notes !== bookData.notes) {
				const bookUpdate = {
					notes: notes,
				};

				const updateUserBook = async () => {
					const res = await booksApi.update(bookData.userBookId, bookUpdate);
					setBookData((prev) => ({ ...prev, notes: res.notes }));
					console.log("updated successfully:", res);
				};

				updateUserBook();
			}
		}, 2000);

		return () => {
			clearTimeout(timer);
		};
	}, [notes, bookData]);

	return (
		<div className="grid h-full grid-cols-[max-content_auto] grid-rows-[max-content_auto] gap-6 overflow-auto">
			<div className="row-start-1 ">
				<img src={bookData?.coverUrl} alt="Book cover" className="rounded-[6px]" />
			</div>

			<div className="col-start-2 row-start-1 flex flex-col gap-2 overflow-auto">
				<h1 className="text-4xl">{bookData.title}</h1>
				<div>
					<p>By {bookData.authors}</p>
					<p className="text-sm">{bookData.publicationDate && bookData.publicationDate}</p>
					<p className="text-sm">{bookData.publisher && bookData.publisher}</p>
				</div>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, laudantium facilis?
					Ducimus ipsum repellendus accusantium ipsam est odit possimus officia? Autem officia
					accusantium vero nulla aut nostrum voluptate maiores esse.
				</p>
			</div>
			<div className="col-span-2">
				<h1 className="pb-2 text-2xl">Notes</h1>
				<textarea
					name="notes"
					id="notes"
					value={notes || ""}
					onChange={(e) => {
						setNotes(e.currentTarget.value);
						console.log(notes);
					}}
					className="scrollbar-thin min-h-20 min-w-[100%] rounded bg-neutral-700 p-2 focus:outline-none md:max-h-80"
				/>
			</div>
		</div>
	);
}
