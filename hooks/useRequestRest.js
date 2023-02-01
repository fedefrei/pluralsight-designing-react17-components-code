import { useEffect, useState } from "react";
import axios from "axios";

const restUrl = "/api/speakers";

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
};

function useRequestRest() {
	const [data, setData] = useState();
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState("");

	useEffect(() => {
		async function delayFunc() {
			try {
				const result = await axios.get(restUrl);
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				setData(result.data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE);
				console.log("Failure", e);
				setError(e);
			}
		}

		delayFunc();
	}, []);

	function updateRecord(record, doneCallback) {
		const originalRecords = [...data];

		//map over the data but replace the previous record with the updated one
		const newRecords = data.map(function (rec) {
			return rec.id === record.id ? record : rec;
		});

		//simulate an api call
		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.put(`${restUrl}/${record.id}`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				if (doneCallback) {
					doneCallback();
				}

				setData(originalRecords);
				console.log("Error", error);
			}
		}

		delayFunction();
	}

	function insertRecord(record, doneCallback) {
		const originalRecords = [...data];

		//map over the data but replace the previous record with the updated one
		const newRecords = [record, ...data];

		//simulate an api call
		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.post(`${restUrl}/99999`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				if (doneCallback) {
					doneCallback();
				}

				setData(originalRecords);
				console.log("Error", error);
			}
		}

		delayFunction();
	}

	function deleteRecord(record, doneCallback) {
		const originalRecords = [...data];

		//map over the data but replace the previous record with the updated one
		const newRecords = data.filter(function (rec) {
			return rec.id != record.id;
		});

		//simulate an api call
		async function delayFunction() {
			try {
				setData(newRecords);
				await axios.delete(`${restUrl}/${record.id}`, record);

				if (doneCallback) {
					doneCallback();
				}
			} catch (error) {
				if (doneCallback) {
					doneCallback();
				}

				setData(originalRecords);
				console.log("Error", error);
			}
		}

		delayFunction();
	}

	return {
		data,
		requestStatus,
		error,
		updateRecord,
		insertRecord,
		deleteRecord,
	};
}

export default useRequestRest;
