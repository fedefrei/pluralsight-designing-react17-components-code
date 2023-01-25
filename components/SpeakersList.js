import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import Speaker from "./Speaker";
import { data } from "../SpeakerData";

function SpeakersList({ showSessions }) {
	const {
		data: speakersData,
		requestStatus,
		error,
		updateRecord,
	} = useRequestDelay(2000, data);

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
			<div className="row">
				{speakersData.map((speaker) => (
					<Speaker
						key={speaker.id}
						speaker={speaker}
						showSessions={showSessions}
						onFavoriteToggle={(doneCallback) =>
							updateRecord(
								{
									...speaker,
									favorite: !speaker.favorite,
								},
								doneCallback
							)
						}
					/>
				))}
			</div>
		</div>
	);
}

export default SpeakersList;
