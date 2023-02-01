import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import Speaker from "./Speaker";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
	const {
		data: speakersData,
		requestStatus,
		error,
		updateRecord,
		insertRecord,
		deleteRecord,
	} = useRequestRest();

	const { eventYear } = useContext(SpeakerFilterContext);

	if (requestStatus === REQUEST_STATUS.FAILURE) {
		return (
			<div className="text-dange">
				ERROR: <b>Loading speaker data failed {error}</b>
			</div>
		);
	}

	if ((requestStatus === REQUEST_STATUS.LOADING) === true)
		return <div>Loading...</div>;

	return (
		<div className="container speakers-list">
			<SpeakerAdd
				eventYear={eventYear}
				insertRecord={insertRecord}
			></SpeakerAdd>
			<div className="row">
				{speakersData
					.filter((speaker) =>
						speaker.sessions.find((session) => session.eventYear === eventYear)
					)
					.map((speaker) => (
						<Speaker
							key={speaker.id}
							speaker={speaker}
							updateRecord={updateRecord}
							insertRecord={insertRecord}
							deleteRecord={deleteRecord}
						/>
					))}
			</div>
		</div>
	);
}

export default SpeakersList;
