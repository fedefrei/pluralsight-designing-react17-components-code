import { useEffect, useState } from "react"
import { data } from "../SpeakerData"

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
}

function useRequestSpeakers(delayTime = 1000) {
	const [speakersData, setSpeakersData] = useState([])
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING)
	const [error, setError] = useState("")

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	useEffect(() => {
		async function delayFunc() {
			try {
				await delay(delayTime)
				setRequestStatus(REQUEST_STATUS.SUCCESS)
				setSpeakersData(data)
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE)
				setError(e)
			}
		}

		delayFunc()
	}, [])

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

	return { speakersData, requestStatus, error, onFavoriteToggle }
}

export default useRequestSpeakers
