
import React from 'react';
import ThreadList from '../components/ThreadList.jsx';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateThreads } from '../states/threads/action.js';
import { asyncPopulateUsers } from '../states/users/action.js';

function HomePage() {
  const threads = useSelector((state) => state.threads) ?? [];
  const users = useSelector((state) => state.users) ?? [];
  const authUser = useSelector((state) => state.authUser) ?? null;
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = React.useState('all');

  React.useEffect(() => {
    dispatch(asyncPopulateThreads());
    dispatch(asyncPopulateUsers());
  }, [dispatch]);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  if (threads.length === 0) {
    return <div>Loading...</div>;
  }

  const threadList = threads.map((thread) => (
    {
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId)
    }
  ));

  const categoryList = [...new Set(threads.map((thread) => thread.category))];

  const filteredThreads = selectedValue === 'all' ? threadList : threadList.filter((thread) => thread.category.toLowerCase() === selectedValue);

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16'>
      <div className='flex flex-col justify-between md:flex-row md:items-center gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Discussions</h1>
          <p className='text-gray-600'>Join the conversation with the community.</p>
        </div>
        {
          authUser ? (
            <Link to='/threads/new' className='inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm' data-id='element-107'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-plus h-4 w-4' aria-hidden='true' data-id='element-108'>
                <path d='M5 12h14'></path>
                <path d='M12 5v14'></path>
              </svg>
              New Thread
            </Link>
          ) : (
            <Link to='/login' className='inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm'>
              Login to Create New Thread
            </Link>
          )
        }
      </div>
      {/* Filters */}
      <div className='flex items-center justify-between mb-6'>
        <div className='relative inline-block'>
          <div className='relative'>
            <svg
              className='w-4 h-4 text-gray-600 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z'
              />
            </svg>

            <select
              className='appearance-none pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer min-w-[180px]'
              value={selectedValue}
              onChange={handleChange}
            >
              <option value='all'>All Categories</option>
              {categoryList.map((category, index) => (
                <option key={index} value={category.toLowerCase()}>{category}</option>
              ))}
            </select>

            <svg
              className='w-4 h-4 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          </div>
        </div>
        <div className='flex items-center bg-white p-1 rounded-lg border border-slate-200 shadow-sm' data-id='element-164'>
          <button className='relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-slate-900' data-id='element-165'>
            <div className='absolute inset-0 bg-slate-100 rounded-md shadow-sm border border-slate-200/50' data-id='element-166' style={{ opacity: 1 }}></div>
            <span className='relative z-10 flex items-center space-x-2' data-id='element-167'>
              <svg
                xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'
                stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
                className='lucide lucide-flame w-4 h-4 text-blue-500' aria-hidden='true'
                data-id='element-168'><path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'></path>
              </svg>
              <span data-id='element-169'>Hot</span>
            </span>
          </button>
          <button className='relative flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50' data-id='element-165'>
            <span className='relative z-10 flex items-center space-x-2' data-id='element-167'>
              <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-clock w-4 h-4' aria-hidden='true' data-id='element-168'><circle cx='12' cy='12' r='10'></circle><polyline points='12 6 12 12 16 14'></polyline>
              </svg>
              <span data-id='element-169'>New</span>
            </span>
          </button>
        </div>
      </div>

      {/* thread List */}
      <ThreadList threads={filteredThreads}/>

      {/* Load More */}
      {
        filteredThreads.length > 6 && (
          <div className='mt-8 text-center'>
            <button className='px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium'>
              Load more threads
            </button>
          </div>
        )
      }
    </main>
  );
}

export default HomePage;