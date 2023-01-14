import Speaker from "./Speaker"
import { data } from "../SpeakerData"
import { useState } from "react"

function SpeakersList({ showSessions }) {
	const [speakersData, setSpeakersData] = useState(data)

	function onFavoriteToggle(speakerID) {
		const speakerPrevious = speakersData.find(
			(speaker) => speaker.id === speakerID
		)

		const speakerUpdated = {
			...speakerPrevious,
			favorite: !speakerPrevious.favorite,
		}

		const speakerDataNew = speakersData.map((record) =>
			record.id === speakerID ? speakerUpdated : record
		)

		setSpeakersData(speakerDataNew)
	}

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
