import {baseAPI} from "../config/config.js";
import Message from "../config/message.js";

export default {
	getFetch: async function (url) {
		try {
			let data = await fetch(`${baseAPI}${url}`).then((response) => response.json());

			if (data.message) {
				data = [];
				alert(data.message);
			}

			if (!data.ok) {
				const errorResult = await res.json();
				throw errorResult;
			}

			return data;

		} catch ({message}) {
			console.log(Message.FETCH_ERROR_MESSAGE, message);
		}
	},

	postFetch: async function (url, obj) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(obj)
			})

			if (!res.ok) {
				const errorResult = await res.json();
				throw errorResult;
			}

		} catch ({message}) {
			console.log(Message.FETCH_ERROR_MESSAGE, message);
		}
	},

	putFetch: async function (url, obj) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(obj)
			})

			if (!res.ok) {
				const errorResult = await res.json();
				throw errorResult;
			}

		} catch ({message}) {
			console.log(Message.FETCH_ERROR_MESSAGE, message);
		}
	},

	deleteFetch: async function (url) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "DELETE"
			})
			.then((response) => response.json());

			res.message && alert(res.message);

		} catch (e) {
			console.log("[err] ", e);
		}
	}

}
