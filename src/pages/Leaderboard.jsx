import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboard } from '../states/leaderboard/action.js';

function LeaderboardPage() {
  const leaderboard = useSelector((state) => state.leaderboard) ?? [];
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(asyncPopulateLeaderboard());
  }, [dispatch]);

  if (leaderboard.length === 0) {
    return <div>Loading...</div>;
  }

  leaderboard.sort((a, b) => b.score - a.score);

  return (
    <main className='pt-16 flex-1' data-id='element-3'>
      <div className='max-w-4xl mx-auto px-4 py-8' data-id='element-182'>
        <div className='text-center mb-12' data-id='element-183'>
          <h1 className='text-3xl font-bold text-slate-900 mb-2' data-id='element-184'>Community Leaderboard</h1>
          <p className='text-slate-500' data-id='element-185'>Top contributors making the community better.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end' data-id='element-186'>
          <div className='bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col items-center order-2 md:order-1 relative' data-id='element-187' style={{ opacity: 1, transform: 'none' }}>
            <div className='absolute -top-4 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 border-4 border-white' data-id='element-188'>2</div>
            <img src={leaderboard[1].user.avatar} alt='' className='w-20 h-20 rounded-full mb-4 border-4 border-slate-100' data-id='element-189'/>
            <h3 className='font-bold text-lg text-slate-900' data-id='element-190'>{leaderboard[1].user.name}</h3>
            <p className='text-slate-500 text-sm mb-2' data-id='element-191'>@{leaderboard[1].user.name.replace(/\s+/g, '').toLowerCase()}</p>
            <div className='flex items-center space-x-1 text-blue-600 font-bold' data-id='element-192'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-trophy w-4 h-4' aria-hidden='true' data-id='element-193'>
                <path d='M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978'></path>
                <path d='M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978'></path>
                <path d='M18 9h1.5a1 1 0 0 0 0-5H18'></path>
                <path d='M4 22h16'></path>
                <path d='M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z'></path>
                <path d='M6 9H4.5a1 1 0 0 1 0-5H6'></path>
              </svg>
              <span data-id='element-194'>{leaderboard[1].score}</span>
            </div>
          </div>
          <div className='bg-white rounded-xl p-8 border border-yellow-200 shadow-md flex flex-col items-center order-1 md:order-2 relative z-10' data-id='element-195' style={{ opacity: 1, transform: 'none' }}>
            <div className='absolute -top-5 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-white border-4 border-white shadow-sm' data-id='element-196'>1</div>
            <img src={leaderboard[0].user.avatar} alt='avatar' className='w-24 h-24 rounded-full mb-4 border-4 border-yellow-100' data-id='element-197'/>
            <h3 className='font-bold text-xl text-slate-900' data-id='element-198'>{leaderboard[0].user.name}</h3>
            <p className='text-slate-500 text-sm mb-3' data-id='element-199'>@{leaderboard[0].user.name.replace(/\s+/g, '').toLowerCase()}</p>
            <div className='flex items-center space-x-1 text-yellow-600 font-bold text-lg bg-yellow-50 px-3 py-1 rounded-full' data-id='element-200'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-trophy w-5 h-5' aria-hidden='true' data-id='element-201'>
                <path d='M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978'></path>
                <path d='M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978'></path>
                <path d='M18 9h1.5a1 1 0 0 0 0-5H18'></path>
                <path d='M4 22h16'></path>
                <path d='M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z'></path>
                <path d='M6 9H4.5a1 1 0 0 1 0-5H6'></path>
              </svg>
              <span data-id='element-202'>{leaderboard[0].score}</span>
            </div>
          </div>
          <div className='bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col items-center order-3 relative z-10' data-id='element-203' style={{ opacity: 1, transform: 'none' }}>
            <div className='absolute -top-4 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center font-bold text-orange-600 border-4 border-white' data-id='element-204'>3</div>
            <img src={leaderboard[2].user.avatar} alt='' className='w-20 h-20 rounded-full mb-4 border-4 border-slate-100' data-id='element-205'/>
            <h3 className='font-bold text-lg text-slate-900' data-id='element-206'>{leaderboard[2].user.name}</h3>
            <p className='text-slate-500 text-sm mb-2' data-id='element-207'>@{leaderboard[2].user.name.replace(/\s+/g, '').toLowerCase()}</p>
            <div className='flex items-center space-x-1 text-blue-600 font-bold' data-id='element-208'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-trophy w-4 h-4' aria-hidden='true' data-id='element-209'>
                <path d='M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978'></path>
                <path d='M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978'></path>
                <path d='M18 9h1.5a1 1 0 0 0 0-5H18'></path>
                <path d='M4 22h16'></path>
                <path d='M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z'></path>
                <path d='M6 9H4.5a1 1 0 0 1 0-5H6'></path>
              </svg>
              <span data-id='element-210'>{leaderboard[2].score}</span>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden' data-id='element-211'>
          <table className='w-full text-left' data-id='element-212'>
            <thead className='bg-slate-50 border-b border-slate-200' data-id='element-213'>
              <tr data-id='element-214'>
                <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider w-16' data-id='element-215'>
                  Rank
                </th>
                <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider' data-id='element-216'>
                  User
                </th>
                <th className='px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right' data-id='element-218'>
                  Reputation
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100' data-id='element-219'>
              {
                leaderboard.slice(3).map((row, index) => (
                  <tr key={row.user.id} className='hover:bg-slate-50 transition-colors' data-id='element-220'>
                    <td className='px-6 py-4 text-slate-500 font-medium' data-id='element-221'>#{index+4}</td>
                    <td className='px-6 py-4' data-id='element-222'>
                      <div className='flex items-center space-x-3' data-id='element-223'>
                        <img src={row.user.avatar} alt='avatar' className='w-8 h-8 rounded-full' data-id='element-224'/>
                        <div data-id='element-225'>
                          <div className='font-medium text-slate-900' data-id='element-226'>{row.user.name}</div>
                          <div className='text-xs text-slate-500' data-id='element-227'>@{row.user.name.replace(/\s+/g, '').toLowerCase()}</div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-right font-bold text-blue-600' data-id='element-229'>{row.score}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default LeaderboardPage;