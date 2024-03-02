const submitButton = document.querySelector("#submit")

submitButton.addEventListener("click", ()=> {
	event.preventDefault()
	
	const inputDate = fetchData()
	const inputYear = inputDate[0]
	const inputMonth = inputDate[1] - 1
	const inputDay = inputDate[2]
	
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth();
	const currentDay = currentDate.getDate();

	console.log(currentDay)
	// Calculate age
	let yearsOld = currentYear - inputYear;
	let monthsOld = currentMonth - inputMonth;
	let daysOld = currentDay - inputDay;

	// Adjust age if necessary
	if (daysOld < 0) {
		monthsOld--; // Decrease the month count
		const lastMonth = new Date(currentYear, currentMonth, 0).getDate(); // Number of days in the last month
		daysOld += lastMonth; // Add days from the last month
	}
	
	if (monthsOld < 0) {
		yearsOld--; // Decrease the year count if the current month is earlier than the input month
		monthsOld = 12 - inputMonth + currentMonth;
	}


	// activate or desactivate the error if the date is valid or not
	toggleError(isValidDate(inputYear, inputMonth, inputDay))

	const spanYear = document.querySelector(".years-span");
	const spanMonth = document.querySelector(".month-span");
	const spanDay = document.querySelector(".day-span");
	
	if (isValidDate(inputYear, inputMonth, inputDay)){
		animate(yearsOld, spanYear)
		animate(monthsOld, spanMonth)
		animate(daysOld, spanDay)
	}

})

function animate(num, targetSpan) {

	// duration of the animation in miliseconds
	const animationDuration = 3000;

	// interval between each step in the animation in miliseconds
	const stepInterval = 20

	// calculate the step value
	const stepValue = num / (animationDuration / stepInterval);
	

	// function to update the span content with the current value
	function updateSpanValue(value) {
		targetSpan.textContent = Math.ceil(value);
	}

	function countUpAnimation() {
		let currentValue = 0;
		const intevalId = setInterval(function() {
			currentValue += stepValue;
			updateSpanValue(currentValue);
			if (currentValue >= num) {
				clearInterval(intevalId);
				updateSpanValue(num)
			}
		}, stepInterval);
	}
	
	countUpAnimation()
}

function isLeapYear(year) {
	return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function isValidDate(year, month, day) {
	// Check if year is within a reasonable range
	const currentDate = new Date()
	const inputDate = new Date(`${year}-${month}-${day}`)

	// check if all the inputs are filled
	if (!year || !month || !day) return false;

	// check if the date is in the past
	if (inputDate > currentDate) return false;

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


    // Construct and return the Date object using the provided year
    return [data[2].years, data[1].month, data[0].days];
}
