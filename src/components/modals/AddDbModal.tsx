import Modal from "./Modal";

export default function AddDbModal(): React.JSX.Element {
	const items = [
		{ id: 0, label: "Books", action: () => {} },
		{ id: 1, label: "Movies", action: () => {} },
		{ id: 2, label: "Workouts", action: () => {} },
		{ id: 3, label: "Water", action: () => {} },
	];

	return <Modal items={items} />;
}
