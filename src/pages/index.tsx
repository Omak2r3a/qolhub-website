/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';
import {
  FaDiscord,
  FaGlobe,
  FaGithub,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useState } from 'react';
import mods from '../data/mods.json';
import cheats from '../data/cheats.json';

export default function Home() {
  const [enableCheats, setCheats] = useState(false);
  const [enablePaid, setPaid] = useState(true);
  let paidText, hoverPaidColor, borderPaidColor;
  let cheatText, hoverCheatColor, borderCheatColor;
  const [filter, setFilter] = useState('');

  if (enableCheats) {
    cheatText = 'Show Cheats: Enabled';
    hoverCheatColor = 'hover:bg-green-600';
    borderCheatColor = 'border-green-600';
  } else {
    cheatText = 'Show Cheats: Disabled'
    hoverCheatColor = 'hover:bg-red-500';
    borderCheatColor = 'border-red-500';
  }

  if (enablePaid) {
    paidText = 'Show Paid: Enabled';
    hoverPaidColor = 'hover:bg-green-600';
    borderPaidColor = 'border-green-600';
  } else {
    paidText = 'Show Paid: Disabled';
    hoverPaidColor = 'hover:bg-red-500';
    borderPaidColor = 'border-red-500';
  }

  const modsFiltered = mods.filter((mod) =>
    mod.name.toLowerCase().includes(filter.toLowerCase())
  );

  modsFiltered.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const cheatsFiltered: any = enableCheats
    ? cheats.filter((cheat) =>
      cheat.name.toLowerCase().includes(filter.toLowerCase())
    )
    : [];

  cheatsFiltered.sort((a: any, b: any) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const allMods = modsFiltered.concat(cheatsFiltered).sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  const paidFiltered: any = enablePaid
    ? allMods
    : allMods.filter((mod) => {
      if (!mod.tags.includes("paid")) {
        return mod
      }
    });

  const modList = paidFiltered.map((mod: any, i: any) => (
    <div key={mod.id} className=''>
      <div
        className={`${mod.tags.includes('cheats')
          ? 'bg-gradient-to-r from-red-600 to-yellow-500'
          : 'bg-gradient-to-r from-green-600 to-blue-700 '
          } p-4 lg:px-6 lg:pt-6 lg:pb-4 rounded-t-3xl flex justify-evenly text-center`}
      >
        <div className=''>
          <img
            src={mod.icon}
            alt={`${mod.name} Image`}
            className={`w-16 h-16 rounded-3xl mr-4`}
          />
        </div>
        <div className='text-lg max-w-xss sm:max-w-none sm:text-2xl align-center h-full my-auto text-left'>
          {mod.name}
        </div>
      </div>
      <div className='bg-black px-8 py-4 rounded-b-3xl shadow-2xl shadow-black min-h-64'>
        <div className='mb-4 min-h-12'>
          <div>
            Developer{mod.developers.split(', ').length > 1 ? 's' : ''}:{' '}
            {mod.developers}{' '}
          </div>
          {mod.paid ? (
            <div className='text-red-500'>Price: ${mod.price}</div>
          ) : (
            ''
          )}
        </div>
        <div className='min-h-16'>
          <div className='grid grid-cols-2 gap-x-6 gap-y-2'>
            {mod.website ? (
              <a href={mod.website} className='flex hover:opacity-70'>
                <FaGlobe className='translate-y-1 mr-2' /> Website
              </a>
            ) : (
              ''
            )}
            {mod.discord ? (
              <a href={mod.discord} className='flex hover:opacity-70'>
                <FaDiscord className='translate-y-1 mr-2' /> Discord
              </a>
            ) : (
              ''
            )}
            {mod.github ? (
              <a href={mod.github} className='flex hover:opacity-70'>
                <FaGithub className='translate-y-1 mr-2' /> Github
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='mt-5'>
          {mod.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className='inline-block bg-gray-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-400 mr-2 mb-2'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  ));

  return (
    <div className='h-screen scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-blue-600 dark:scrollbar-track-gray-900'>
      <Head>
        <title>QOL Hub</title>
        <meta name='description' content='Official Quality of Life Website' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <main className='my-10 mx-5 h-screen'>
        <div className='text-xl text-center'>
          A Safe Place To Find Unratted & Useful Hypixel Mods
        </div>
        <div className='text-sm text-center bg-gray-800 outline-gray-900 outline-4 shadow-sm rounded-md my-4 sm:w-3/5 lg:w-1/2 xl:w-1/3 2xl:w-1/4 mx-auto'>
          <div className='flex justify-center'>
            <FaExclamationTriangle className='text-yellow-600 translate-y-1 h-14 text-xl' />{' '}
            <div className='m-2 max-w-xss xs:max-w-xs'>
              {' '}
              We do not support cheating, please use at your own risk. These
              mods are here so people don't get ratted from unreliable sources
            </div>{' '}
            <FaExclamationTriangle className='text-yellow-600 translate-y-1 h-14 text-xl' />
          </div>
        </div>
        <div className='justify-center md:flex text-xs sm:text-lg'>
          <div className='text-center mt-4 grid-cols-2 gap-x-4'>
            <a href='https://discord.gg/qolhub'>
              <button className='bg-blue-700 py-3 px-6 rounded-lg h-full my-auto opacity-80 hover:opacity-100 shadow-lg'>
                <FaDiscord className='inline-block mr-3 w-6 translate-y-[-3px]' />
                Join our Discord
              </button>
            </a>
            <button
              className={`py-3 px-6 ml-8 border ${borderCheatColor} rounded-lg shadow-lg ${hoverCheatColor}`}
              onClick={(_e) => {
                setCheats(!enableCheats);
              }}
            >
              {cheatText}
            </button>
            <button
              className={`py-3 px-6 ml-8 border ${borderPaidColor} rounded-lg shadow-lg ${hoverPaidColor}`}
              onClick={(_e) => {
                setPaid(!enablePaid);
              }}
            >
              {paidText}
            </button>
          </div>
        </div>
        <div className='relative mx-auto my-10 w-11/12 lg:w-1/2 '>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            type='search'
            id='default-search'
            className='block p-4 pl-10 w-full text-sm rounded-lg border border-gray-400 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search for Mods'
            required
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          />
        </div>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mx-auto md:w-11/12 lg:w-5/6 mb-20'>
          {modList}
        </div>
        <Footer />
      </main>
    </div>
  );
}
