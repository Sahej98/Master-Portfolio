import React from 'react';

const Background = () => {
  return (
    <div className='fixed inset-0 -z-20 h-full w-full transition-colors duration-300'>
      {/* Light mode: Clean, soft gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:hidden 
                     [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#bbf7d0_100%)]">
      </div>
      
      {/* Dark mode: Deep blue with subtle aurora */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950 hidden dark:block">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full 
                      bg-[radial-gradient(circle_farthest-side,rgba(16,185,129,0.15),rgba(255,255,255,0))]">
        </div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full 
                      bg-[radial-gradient(circle_farthest-side,rgba(30,64,175,0.15),rgba(255,255,255,0))]">
        </div>
      </div>
    </div>
  );
};

export default Background;
