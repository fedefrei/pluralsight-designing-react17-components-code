import { useEffect, useState } from "react"
import { data } from "../SpeakerData"

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
}

function useRequestDelay(delayTime = 1000, initialData = []) {
	const [data, setData] = useState(initialData)
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING)
	const [error, setError] = useState("")

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

	useEffect(() => {
		async function delayFunc() {
			try {
				await delay(delayTime)
				setRequestStatus(REQUEST_STATUS.SUCCESS)
				setData(data)
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE)
				setError(e)
			}
		}

		delayFunc()
	}, [])

	function updateRecord(recordUpdated) {
		//map over the data but replace the previous record with the updated one
		const newRecords = data.map(function (rec) {
			return rec.id === recordUpdated.id ? recordUpdated : rec
		})

		//simulate an api call
		async function delayFunction() {
			try {
				await delay(delayTime)
				setData(newRecords)
			} catch (error) {
				console.log("Error", error)
			}
		}

		delayFunction()
	}

	function onFavoriteToggle(ID) {
		const recPrevious = data.find((speaker) => speaker.id === ID)

		const recUpdated = {
			...recPrevious,
			favorite: !recPrevious.favorite,
		}

		const recDataNew = data.map((record) =>
			record.id === ID ? recUpdated : record
		)

		setData(recDataNew)
	}

	return { data, requestStatus, error, updateRecord }
}

export default useRequestDelay
