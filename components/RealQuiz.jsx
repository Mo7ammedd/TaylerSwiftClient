'use client'
import { useEffect, useState } from 'react';
import { Next, Previous } from '@/components/globals/Icons';
import CountdownTimer from './CountdownTimer';
import { FormulateQuote } from '@/utils/services';

export default function RealQuiz({ QuizQuestions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(null));

  const [animateScore, setAnimateScore] = useState(false);
  const [BackanimateScore, setBackAnimateScore] = useState(false);

  useEffect(() => {
    if (animateScore) {
      const timeoutId = setTimeout(() => {
        setAnimateScore(false);
      }, 500); // Duration of the animation
      return () => clearTimeout(timeoutId);
    }
  }, [animateScore]);

  const handleAnswer = (answer, correctAnswer, index) => {
    setAnimateScore(true);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answer;
    setSelectedAnswers(newSelectedAnswers);
    console.log('ass');
  
    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 1); // Use functional update form
    }
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < QuizQuestions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 300);
  
    } else {
      setTimeout(() => {
        alert(`Quiz finished! Your score is ${score + (answer === correctAnswer ? 1 : 0)} out of ${QuizQuestions.length}`);
      }, 300);
    }
  };
  
  const handlePrevious = () => {
    setBackAnimateScore(true)

    if (currentQuestionIndex > 0) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }, 300);
    }
  };



  const handleNext = () => {
    setAnimateScore(true);

    if (currentQuestionIndex < QuizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const { question, answers } = QuizQuestions[currentQuestionIndex];
  const ass = FormulateQuote(question);

  return (
    <div className="md:py-4">
      <div className={` ${animateScore ? 'score-animate' : ''} ${BackanimateScore&& 'back-score-animate'} border-l border-[#DEA78C] p-4 shadow-md`}>
        <h2 className=" text-base xs:text-lg sm:text-xl lg:text-2xl font-bold " style={{ whiteSpace: 'pre-line' }}>{ass}</h2>
      </div>
      <ul className='absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col flex-wrap w-full px-4 gap-4 justify-center text-sm'>
       
        <div className={`flex flex-row justify-center flex-wrap w-full gap-2 ${animateScore ? 'score-animate' : ''} ${BackanimateScore&& 'back-score-animate'} `}>
          {answers.map((answer, index) => (
            <li key={index} className="">
              <button className={`transition duration-100 text-black font-bold py-2 px-4 rounded-[1.5rem] ${selectedAnswers[currentQuestionIndex] === answer ? 'bg-[#DEA78C]' : 'bg-[#D0D0D0] hover:bg-[#B7B7B7]'}`} onClick={() => handleAnswer(answer, answers[0], currentQuestionIndex)}>
                {answer}
              </button>
            </li>
          ))}
        </div>

        <div className="flex justify-center gap-4 items-center text-center w-full mt-4 space-x-2">
          <div className='flex flex-row gap-2'>
          <button className={`transition duration-100 text-white font-bold p-2 rounded-full ${currentQuestionIndex === 0 ? 'bg-transparent' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
            <Previous />
          </button>
          <button className={`transition duration-100 text-white font-bold p-2 rounded-full ${currentQuestionIndex === QuizQuestions.length - 1 ? 'bg-transparent' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={handleNext} disabled={currentQuestionIndex === QuizQuestions.length - 1}>
            <Next />
          </button>
          </div>
          <button className={` transition duration-200 rounded-[2rem]  px-2 md:px-4 py-1 text-sm md:text-base md:py-2  font-bold ${currentQuestionIndex != QuizQuestions.length - 1 ? 'bg-gray-800' : 'hover:bg-[#AD7974] bg-[#B2847A]'} `}
           disabled={currentQuestionIndex != QuizQuestions.length - 1}>Submit</button>
        </div>

      </ul>
      <h2 className={`h-14 absolute top-16 right-2 md:top-20 md:right-10 text-base xs:text-lg sm:text-xl lg:text-2xl font-bold `}>
        <span className={`${animateScore ? 'score-animate' : ''}`}>
        {currentQuestionIndex + 1}
        </span>
        /{QuizQuestions.length}
      </h2>
    </div>
  );
}
