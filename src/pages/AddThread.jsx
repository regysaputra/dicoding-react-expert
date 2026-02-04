import React from 'react';
import { useNavigate } from 'react-router';
import useInput from '../hooks/useInput.jsx';
import { useDispatch } from 'react-redux';
import { asyncAddThread } from '../states/threads/action.js';

export default function AddThreadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  }

  function handleCancel() {
    navigate('/');
  }

  function handleBackToPrevious() {
    navigate(-1);
  }

  return (
    <main className='min-h-screen bg-gray-50 p-6 mt-16'>
      <div className='max-w-4xl mx-auto'>
        {/* Back button */}
        <button onClick={handleBackToPrevious} className='flex items-center gap-2 bg-transparent border-none p-0 text-gray-600 hover:text-gray-900 underline-offset-4 hover:underline cursor-pointer mb-2'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 19l-7-7 7-7'></path>
          </svg>
          <span>Back to discussions</span>
        </button>

        {/* Main form card */}
        <div className='bg-white rounded-lg shadow-sm p-8'>
          <div className='mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Create a new thread
            </h1>
            <p className='text-gray-600'>
              Start a discussion with the community.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title field */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                value={title}
                onChange={handleTitleChange}
                placeholder='What is on your mind?'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none'
                required
              />
            </div>

            {/* Category */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Category <span className='text-gray-500 text-xs'>(Optional)</span>
              </label>
              <input
                type='text'
                value={category}
                onChange={handleCategoryChange}
                placeholder='e.g. react, hooks, performance'
                className='w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none'
              />
            </div>

            {/* Body field */}
            <div className='mb-6'>
              <label className='block text-sm font-medium text-gray-900 mb-2'>
                Content <span className='text-red-500'>*</span>
              </label>
              <div className='rounded-lg border overflow-hidden transition-all border-gray-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20' data-id='element-83'>
                <div className='bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center gap-2' data-id='element-84'>
                  <button type='button' className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors' data-id='element-85'>
                    <span className='font-bold text-xs serif' data-id='element-86'>B</span>
                  </button>
                  <button type='button' className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors' data-id='element-87'>
                    <span className='italic text-xs serif' data-id='element-88'>I</span>
                  </button>
                  <div className='w-px h-4 bg-gray-300 mx-1' data-id='element-89'></div>
                  <button type='button' className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors' data-id='element-90'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-link h-3.5 w-3.5' aria-hidden='true' data-id='element-91'>
                      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'></path>
                      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'></path>
                    </svg>
                  </button>
                  <button type='button' className='p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors' data-id='element-92'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='lucide lucide-image h-3.5 w-3.5' aria-hidden='true' data-id='element-93'>
                      <rect width='18' height='18' x='3' y='3' rx='2' ry='2'></rect>
                      <circle cx='9' cy='9' r='2'></circle>
                      <path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'></path>
                    </svg>
                  </button>
                </div>
                <textarea value={body} onChange={handleBodyChange} id='content' rows='8' className='w-full p-4 text-gray-900 placeholder-gray-400 focus:outline-none resize-y min-h-[200px]' placeholder='Write your post content here...' data-id='element-94'></textarea>
              </div>
            </div>

            {/* Action buttons */}
            <div className='flex justify-end gap-3'>
              <button onClick={handleCancel} className='px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors'>
                Cancel
              </button>
              <button type='submit' className='px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors'>
                Publish Thread
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}