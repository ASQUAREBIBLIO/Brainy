import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../../../../css/app.css';

export default function Quiz() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
		{
			questionText: 'Where the 1960 Olympic games held?',
			answerOptions: [
				{ answerText: 'Barcelona, Spain', isCorrect: false },
				{ answerText: 'Rome, Italy', isCorrect: true },
				{ answerText: 'Rio, Brazil', isCorrect: false },
				{ answerText: 'Athina, Greece', isCorrect: false },
			],
		},
        {
			questionText: "How much did a McDonald's hamburger cost in 1948?",
			answerOptions: [
				{ answerText: '1 USD', isCorrect: false },
				{ answerText: '5 cents', isCorrect: false },
				{ answerText: '50 cents', isCorrect: false },
				{ answerText: '15 cents', isCorrect: true },
			],
		},
        {
			questionText: 'Where was American cheese invented?',
			answerOptions: [
				{ answerText: 'Switzerland', isCorrect: true },
				{ answerText: 'USA', isCorrect: false },
				{ answerText: 'UK', isCorrect: false },
				{ answerText: 'China', isCorrect: false },
			],
		},

	];

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};
	return (
        <div className='body align-items-center text-center'>
            <div>
                <h4>Games</h4>
                <h6>Quiz</h6>
            </div>
            <div className='app-quiz mt-3'>
                {showScore ? (
                    <div className='score-section'>
                        <span>You scored {score} out of {questions.length}</span>
                        <div className='ml-5'>
                            <button className='btn border-0 btn_btn'>Start Again</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>/{questions.length}
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}</div>
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOption) => (
                                <button className='answer_btn' onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
	);
}

if (document.getElementById('quiz')) {
    ReactDOM.render(<Quiz />, document.getElementById('quiz'));
}
