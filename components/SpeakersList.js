import Speaker from "./Speaker"

function SpeakersList({ data, showSessions }) {
	return (
		<div className='container speakers-list'>
			<div className='row'>
				{data.map((speaker) => (
					<Speaker
						speaker={speaker}
						showSessions={showSessions}
						key={speaker.id}
					/>
				))}
			</div>
		</div>
	)
}

export default SpeakersList
