import Speaker from "./Speaker";

function SpeakersList({ data }) {
	return (
		<div className="container speakers-list">
			<div className="row">
				{data.map((speaker) => (
					<Speaker speaker={speaker} />
				))}
			</div>
		</div>
	);
}

export default SpeakersList;
