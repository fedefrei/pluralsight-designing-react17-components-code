import { useEffect, useState } from "react";

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData = []) {
	const [data, setData] = useState(initialData);
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState("");

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		async function delayFunc() {
			try {
				await delay(delayTime);
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				setData(data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE);
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
				await delay(delayTime);

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
				await delay(delayTime);

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
				await delay(delayTime);

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

export default useRequestDelay;
