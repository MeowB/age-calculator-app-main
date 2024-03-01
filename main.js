const submitButton = document.querySelector("#submit")

submitButton.addEventListener("click", ()=> {
	event.preventDefault()
	
	const inputs = fetchData()
	const day = inputs[0].days
	const month = inputs[1].month
	const years = inputs[2].years
	const date = `${years}-${month}-${day}`

	// activate or desactivate the error if the date is valid or not
	toggleError(isValidDate(years, month, day))

	const currentDate = new Date()
	console.log(currentDate)


	const spanYear = document.querySelector(".years-span");
	spanYear.innerHTML = years

})

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isValidDate(year, month, day) {
	// Check if year is within a reasonable range
	if (year < 0 || year > 9999) return false;

	// Check if month is within a valid range
	if (month < 1 || month > 12) return false;

	// Check if day is within a valid range for the given month and year
	const maxDays = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if (day < 1 || day > maxDays[month - 1]) return false;

	// Date is valid
	return true;
}

// takes a boolean as input to know if it has to show or hide the error
function toggleError(validDate) {
	const errorDiv = document.createElement("div");
	const days = document.querySelector("#days");
	const inputsElements = document.querySelectorAll("input");
	const labels = document.querySelectorAll("label");
	const errorCheck = document.querySelector(".error")

	if (errorCheck) {
		errorCheck.remove()
	}

	if (validDate) {
		
		labels.forEach((label) => {
			label.style.color = "#716f6f"
		})

		inputsElements.forEach((input) => {
			input.style.border = "1px solid #dbdbdb";
		})

		return

	} else {

		labels.forEach((label) => {
			label.style.color = "#ff5757"
		})
	
		inputsElements.forEach((input) => {
			input.style.border = "1px solid #ff5757";
		})

	}


	errorDiv.className = "error";
	errorDiv.innerHTML = "Must be a valid date";

	days.insertAdjacentElement("afterend", errorDiv);
	
}


function fetchData() {
	const myForm = new FormData(document.querySelector("form"))
	const data = [];

	myForm.forEach((value, key) => {
		data.push({ [key]:value });
	})
	
	return data;
}
