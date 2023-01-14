import useRequestSpeakers, { REQUEST_STATUS } from "../hooks/useRequestSpeakers"
import Speaker from "./Speaker"

function SpeakersList({ showSessions }) {
	const { speakersData, requestStatus, error, onFavoriteToggle } =
		useRequestSpeakers(2000)

	if (requestStatus === REQUEST_STATUS.FAILURE) {
		return (
			<div className='text-dange'>
				ERROR: <b>Loading speaker data failed {error}</b>
			</div>
		)
	}

	if ((requestStatus === REQUEST_STATUS.LOADING) === true)
		return <div>Loading...</div>

	return (
		<div className='container speakers-list'>
			<div className='row'>
				{speakersData.map((speaker) => (
					<Speaker
						key={speaker.id}
						speaker={speaker}
						showSessions={showSessions}
						onFavoriteToggle={() => onFavoriteToggle(speaker.id)}
					/>
				))}
			</div>
		</div>
	)
}

export default SpeakersList
