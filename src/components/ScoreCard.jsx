import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import getCertificate from './Certificate';
function ScoreCard({ correctAnswers, incorrectAnswers, unattempted, noq }) {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const obtainedPoints = correctAnswers * 10 - incorrectAnswers * 2;
  const obtainedPercentage = obtainedPoints / (0.1 * noq);

  return (
    <>
      <span className='score-percentage mb-4 w-full text-center text-5xl font-bold text-darkViolet drop-shadow-xl dark:text-brightViolet xl:text-6xl'>
        SCORE {obtainedPercentage}%
      </span>
      <div className='score-card frame-BG flex flex-col rounded-xl lg:w-[500px]'>
        <span className='score-card-heading mb-2 w-full text-center text-4xl font-semibold uppercase tracking-wider text-darkText drop-shadow-xl dark:text-dullWhite lg:text-5xl'>
          Score Card
        </span>
        <hr className='mb-6 h-px border-0 bg-gray-400 dark:bg-gray-600' />

        <div className='[&>*]:text-lg [&>*]:lg:text-2xl'>
          <div className='score-row [&>*]:text-darkViolet [&>*]:dark:text-brightViolet'>
            <p className='text-left'>Answers</p>
            <p>No.</p>
            <p>Points</p>
          </div>

          <div className='score-row [&>*]:text-activeGreen'>
            <p className='text-left'>Correct</p>
            <p>{correctAnswers}</p>
            <p>+{correctAnswers * 10}</p>
          </div>

          <div className='score-row [&>*]:text-failureRed'>
            <p className='text-left'>Incorrect</p>
            <p>{incorrectAnswers}</p>
            <p>-{incorrectAnswers * 2}</p>
          </div>
          <div className='score-row [&>*]:text-slate-700 [&>*]:dark:text-slate-400'>
            <p className='text-left'>Unattempted</p>
            <p>{unattempted}</p>
            <p>+0</p>
          </div>
        </div>
        <hr className='mt-4 mb-3 h-px border-0 bg-gray-400 dark:bg-gray-600' />
        <span className='mr-9 flex justify-between text-lg font-semibold uppercase lg:text-2xl'>
          Obtained Points <span>{obtainedPoints}</span>
        </span>
        <span className='mr-9 flex justify-between text-lg font-semibold uppercase lg:text-2xl'>
          No of Questions <span>{noq}</span>
        </span>
        <span className='mr-9 flex justify-between text-lg font-semibold uppercase lg:text-2xl'>
          Total Points <span>{noq * 10}</span>
        </span>
        {obtainedPercentage >= 60 ? (
          <button
            type='button'
            className='border-button mt-6 rounded-2xl border border-darkViolet px-4 py-2'
            title='Get Certificate'
            onClick={() =>
              getCertificate(currentUser.displayName, id, obtainedPercentage)
            }
          >
            <span className='text uppercase'>Get Certificate</span>
          </button>
        ) : (
          <p className='mt-6 text-center text-lg font-medium uppercase '>
            Score at least 60% to get Certificate
          </p>
        )}
      </div>
    </>
  );
}

export default ScoreCard;
