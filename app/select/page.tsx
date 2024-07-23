// app/select/page.tsx

"use client";

import React from 'react';
import Link from 'next/link';

import image1 from '@/images/topics/political_ideologies.jpg';
import filler from '@/images/topics/filler_image.jpg';

export default function SelectPage() {
  const items = [
    { id: 1, title: 'Democrats vs. Republicans: Political Ideologies', link: '/option1', image: image1.src },
    { id: 2, title: 'Artificial Intelligence: For or Against?', link: '/option2', image: filler.src },
    { id: 3, title: 'Climate Change: Human-Caused or Natural?', link: '/option3', image: filler.src },
    { id: 4, title: 'Renewable Energy vs. Fossil Fuels', link: '/option4', image: filler.src },
    { id: 5, title: 'Universal Basic Income: For or Against?', link: '/option5', image: filler.src },
    { id: 6, title: 'Gun Control: Stricter Laws or Right to Bear Arms?', link: '/option6', image: filler.src },
    { id: 7, title: 'Healthcare: Universal Healthcare vs. Private Healthcare', link: '/option7', image: filler.src },
    { id: 8, title: 'Immigration: Open Borders vs. Strict Control', link: '/option8', image: filler.src },
    { id: 9, title: 'Big Tech: Regulation or Innovation?', link: '/option9', image: filler.src },
    { id: 10, title: 'Privacy vs. Security in the Digital Age', link: '/option10', image: filler.src },
    { id: 11, title: 'Vaccination: Mandatory or Voluntary?', link: '/option11', image: filler.src },
    { id: 12, title: 'Education: Traditional vs. Online', link: '/option12', image: filler.src },
    // Add more items as needed
  ];

  return (
    <div className="relative grow flex flex-col mx-auto w-full h-screen overflow-y-auto dark:bg-gray-900 bg-[#F4EDD8] p-4 pb-16">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Option</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {items.map(item => (
            <div key={item.id} className="flex flex-col items-center">
              <Link href={item.link} className="block bg-[#D2B48C] text-black p-4 rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1),8px_8px_0px_rgba(0,0,0,0.25)] hover:bg-[#b3c8e3] hover:shadow-[2px_2px_0px_rgba(0,0,0,1),4px_4px_0px_rgba(0,0,0,0.25)] hover:translate-x-1 hover:translate-y-1 dark:bg-[#8B4513] dark:hover:bg-[#90a7c5] font-bold transition-transform duration-150 w-full aspect-square flex items-center justify-center cursor-pointer">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
              </Link>
              <h2 className="text-center text-l mt-4">{item.title}</h2>
            </div>
          ))}
      </div>
    </div>
  );
}
