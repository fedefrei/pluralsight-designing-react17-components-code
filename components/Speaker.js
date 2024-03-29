import React, { useContext, useState, memo } from "react"
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext"
import { SpeakerContext, SpeakerProvider } from "../contexts/SpeakerContext"
import SpeakerDelete from "./SpeakerDelete"
import ErrorBoundary from "./ErrorBoundary"

const Session = ({ title, room }) => (
	<span className='session w-100'>
		{title} <strong>Room: {room.name}</strong>
	</span>
)

const Sessions = () => {
	const { eventYear } = useContext(SpeakerFilterContext)
	const { speaker } = useContext(SpeakerContext)

	const sessions = speaker.sessions

	return (
		<div className='sessionBox card h-250'>
			{sessions
				.filter((session) => session.eventYear === eventYear)
				.map((session) => (
					<div className='session w-100' key={session.id}>
						<Session {...session}></Session>
					</div>
				))}
		</div>
	)
}

function ImageWithFallback({ src, ...props }) {
	const [error, setError] = useState(false)
	const [imgSrc, setImgSrc] = useState(src)

	function onError() {
		if (!error) {
			setImgSrc("/images/speaker-99999.jpg")
			setError(true)
		}
	}

	return <img src={imgSrc} {...props} onError={onError} />
}

function SpeakerImage() {
	const {
		speaker: { id, first, last },
	} = useContext(SpeakerContext)

	return (
		<div className='speaker-img d-flex flex-row justify-content-center align-items-center h-300'>
			<ImageWithFallback
				className='contain-fit'
				src={`/images/speaker-${id}.jpg`}
				width='300'
				alt={`${first} ${last}`}
			/>
		</div>
	)
}

function SpeakerFavorite() {
	const [isLoading, setLoading] = useState(false)
	const { speaker, updateRecord } = useContext(SpeakerContext)

	function doneCallback() {
		setLoading(false)

		console.log(
			`In SpeakerFavorite:doneCallback ${new Date().getMilliseconds()}`
		)
	}

	return (
		<div className='action padB1'>
			<span
				onClick={function () {
					setLoading(true)
					updateRecord(
						{ ...speaker, favorite: !speaker.favorite },
						doneCallback
					)
				}}
			>
				<i
					className={
						speaker.favorite === true
							? "fa fa-star orange"
							: "fa fa-star-o orange"
					}
				></i>
				Favorite &nbsp;
				{isLoading ? (
					<span className='fas fa-circle-notch fa-spin' />
				) : null}
			</span>
		</div>
	)
}

const SpeakerDemographics = () => {
	const { speaker } = useContext(SpeakerContext)
	const { first, last, bio, company, twitterHandle } = speaker

	return (
		<div className='speaker-info'>
			<div className='d-flex justify-content-between mb-3'>
				<h3 className='text-truncate w-200'>
					{first} {last}
				</h3>
			</div>
			<SpeakerFavorite />
			<div>
				<p className='card-description'>{bio.substr(0, 70)}</p>
				<div className='social d-flex flex-row mt-4'>
					<div className='company'>
						<h5>Company</h5>
						<h6>{company}</h6>
					</div>
					<div className='twitter'>
						<h5>Twitter</h5>
						<h6>{twitterHandle}</h6>
					</div>
				</div>
			</div>
		</div>
	)
}

const SpeakerNoErrorBoundary = memo(function Speaker({
	speaker,
	updateRecord,
	insertRecord,
	deleteRecord,
	showErrorCard,
}) {
	const { showSessions } = useContext(SpeakerFilterContext)

	if (showErrorCard) {
		return (
			<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12'>
				<div className='card card-height p-4 mt-4'>
					<img src='/images/speaker-99999.jpg' />
					<div>
						{" "}
						<b>Error showing speaker</b>
					</div>
				</div>
			</div>
		)
	}

	return (
		<SpeakerProvider
			speaker={speaker}
			updateRecord={updateRecord}
			insertRecord={insertRecord}
			deleteRecord={deleteRecord}
		>
			<div className='col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12'>
				<div className='card card-height p-4 mt-4'>
					<SpeakerImage />
					<SpeakerDemographics />
				</div>
				{showSessions === true ? <Sessions /> : null}
				<SpeakerDelete />
			</div>
		</SpeakerProvider>
	)
},
areEqualSpeaker)

function areEqualSpeaker(prevProps, nextProps) {
	return prevProps.speaker.favorite === nextProps.speaker.favorite
}

function Speaker(props) {
	return (
		<ErrorBoundary
			errorUI={<SpeakerNoErrorBoundary showErrorCard={true} />}
		>
			<SpeakerNoErrorBoundary {...props}></SpeakerNoErrorBoundary>
		</ErrorBoundary>
	)
}

export default Speaker
