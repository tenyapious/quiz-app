const quizData = [
	{
		question:
			"What tag is used to define a container for an external app or plug-in",
		answers: ["<caption>", "<!DOCTYPE>", "<code>", "<embed>"],
	},
	{
		question: "What tag is used to define a standard cell inside a table",
		answers: ["<h1> to <h6>", "<td>", "<button>", "<footer>"],
	},
	{
		question: "What tag is used to define a hyperlink, or link to another page",
		answers: ["<a>", "<em>", "<strong>", "<blockquote>"],
	},
	{
		question: "What tag is used to define a list item (in a bulleted list)",
		answers: ["<s>", "<ul>", "<u>", "<li>"],
	},
	{
		question:
			"What tag is used to define an interactive field where users can enter data?",
		answers: ["<dialog>", "<enterpoint>", "<datalist>", "<input>"],
	},
	{
		question:
			"What element is a container for all the head elements, and may include the document title, scripts, styles, meta information, and more?",
		answers: ["<head></head>", "<br></br>", "<body></body>", "<title></title>"],
	},
	{
		question:
			"What tag is used to specify a section of text that provides an example of computer code?",
		answers: ["<embed>", "<code>", "<caption>", "<!DOCTYPE>"],
	},
	{
		question:
			"What tag is used to specify a section of text that has been quoted from another source?",
		answers: ["<em>", "<strong>", "<blockquote>", "<a>"],
	},
	{
		question:
			"What tag can be used to insert a line break or blank line in an HTML document?",
		answers: ["<br></br>", "<body></body>", "<head></head>", "<title></title>"],
	},

	{
		question: "What tag is used to define a table or image notation (caption)?",
		answers: ["<caption>", "<code>", "<embed>", "<!DOCTYPE>"],
	},
];

const quizAnswersArr = [
	"<embed>",
	"<td>",
	"<a>",
	"<li>",
	"<input>",
	"<head></head>",
	"<code>",
	"<blockquote>",
	"<br></br>",
	"<caption>",
];

const form = document.querySelector("form");
const question = document.querySelector(".question");
const answersItems = document.querySelectorAll(".answer-option-item");
const quizProgress = document.getElementById("quiz-progress");
const quizProgressText = document.querySelector(".progress-text");

let quizCount = 0;
let correctScoreCount = 0;
// let totalScore = 0;
let quizComplete = false;

document.documentElement.style.setProperty(
	"--question-and-answers-container-width",
	form.getBoundingClientRect().width * 0.8 + "px"
);

form.addEventListener("submit", (event) => {
	event.preventDefault();

	const currQuestionAndAnswers = document.querySelector(
		".question-and-answers-container"
	);

	const quizProgressCalc = (quizCount / quizData.length) * 100;

	quizProgress.value = quizProgressCalc;

	quizProgressText.textContent = quizProgressCalc;

	// check for last card
	if (!quizComplete && quizCount >= quizData.length) {
		getAndMarkUserAnswer();
		currQuestionAndAnswers.remove();
		quizComplete = true;
		setFormHeight(0);

		const totalScore = (correctScoreCount / quizData.length) * 100;
		form.prepend(createScoreEle(totalScore));

		document.querySelector("input[type=submit]").value = "Restart";

		return;
	}

	if (quizComplete) {
		window.location.reload();
		return;
	}

	getAndMarkUserAnswer();

	resetAnswerInputs();

	setQuestionAndAnswers();

	function getAndMarkUserAnswer() {
		const userAnswer = currQuestionAndAnswers.querySelector(
			'input[name="answer"]:checked'
		).value;

		if (userAnswer == quizAnswersArr[quizCount - 1]) correctScoreCount++;
	}
});

// called on page load to set the first question and answers
setQuestionAndAnswers();

function setQuestionAndAnswers() {
	question.textContent = quizData[quizCount].question;

	for (let i = 0; i < answersItems.length; i++) {
		const answer = quizData[quizCount].answers[i];
		const answerItem = answersItems[i];
		answerItem.firstElementChild.value = answer;
		const label = answerItem.lastElementChild.firstElementChild;

		label.textContent = answer;
	}

	quizCount++;
}

function resetAnswerInputs() {
	for (let i = 0; i < answersItems.length; i++) {
		const answerItem = answersItems[i];
		answerItem.firstElementChild.checked = false;
	}
}

/**
 *
 * @param {number} questionAndAnswersContainerHeight
 */
function setFormHeight(questionAndAnswersContainerHeight) {
	document.documentElement.style.setProperty(
		"--form-top-padding",
		`${questionAndAnswersContainerHeight}px`
	);
}

/**
 *
 * @param {number} score
 * @returns html element
 */
function createScoreEle(score) {
	const scoreEle = document.createElement("h2");
	const scoreText = document.createTextNode(`Your score is ${score}%`);
	scoreEle.setAttribute("class", "result");
	scoreEle.appendChild(scoreText);
	return scoreEle;
}
