import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CostComparison = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    console.log("CostComparison Mounted");
    gsap.registerPlugin(ScrollTrigger);
    
    const bars = chartRef.current.querySelectorAll('.cost-bar');
    bars.forEach((bar, index) => {
      // Clear any previous animations and set initial state
      gsap.set(bar, { scaleY: 0, opacity: 0 });

      gsap.to(bar, { 
        scaleY: 1, 
        opacity: 1,
        duration: 1, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: bar,
          start: "top 95%",
          toggleActions: "restart none none none",
        },
        delay: index * 0.1
      });
    });
  }, []);

  const data = [
    { country: 'Uzbekistan', cost: 20, isBest: true },
    { country: 'Russia', cost: 30 },
    { country: 'Kazakhstan', val: 22, cost: 22 },
    { country: 'Georgia', cost: 28 },
    { country: 'Philippines', cost: 30 },
  ];

  return (
    <div className="py-2 bg-white text-center lg:text-left">
      <div className="max-w-[1200px] mx-auto mb-16">
        <h2 className="text-[1.4rem] lg:text-[1rem] font-bold text-[#222] mb-3 uppercase tracking-[1px]">MBBS Abroad Cost Comparison</h2>
        <div className="w-[50px] h-[3px] bg-primary mb-[15px] mx-auto lg:mx-0"></div>
        <p className="text-[0.95rem] leading-[1.6] text-[#555] mb-2.5 uppercase tracking-widest font-medium">Total estimated 6-year budget in Lakhs</p>
      </div>

      {/* Grid Chart Container - Exact Screenshot UI */}
      <div ref={chartRef} className="w-full bg-white relative overflow-visible max-w-4xl mx-auto px-4 sm:px-10">
        <div className="relative h-[350px] border-l border-b border-gray-300">
          
          {/* Grid Background (Horizontal & Vertical) */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Horizontal Lines (Every 5) */}
            {[...Array(8)].map((_, i) => (
              <div key={`h-${i}`} className="absolute w-full border-t border-gray-100" style={{ bottom: `${(i * 5) / 35 * 100}%` }}></div>
            ))}
            {/* Vertical Lines (Between Bars) */}
            {[...Array(6)].map((_, i) => (
              <div key={`v-${i}`} className="absolute h-full border-l border-gray-50" style={{ left: `${(i * 20)}%` }}></div>
            ))}
          </div>

          {/* Y-Axis Labels (Simple Numbers) */}
          <div className="absolute -left-12 top-0 h-full flex flex-col justify-between text-[11px] font-bold text-gray-500 py-0 pb-0 items-end pr-3">
            <span className="whitespace-nowrap">35 Lakhs</span>
            <span className="whitespace-nowrap">30 Lakhs</span>
            <span className="whitespace-nowrap">25 Lakhs</span>
            <span className="whitespace-nowrap">20 Lakhs</span>
            <span className="whitespace-nowrap">15 Lakhs</span>
            <span className="whitespace-nowrap">10 Lakhs</span>
            <span className="whitespace-nowrap">5 Lakhs</span>
            <span>0</span>
          </div>

          {/* Bars Container */}
          <div className="absolute inset-0 flex items-end justify-around px-2">
            {data.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end max-w-[60px]">
                
                {/* Cost Label / Badge */}
                <div className={`absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 ${item.isBest ? 'bg-primary shadow-lg' : 'bg-gray-400'} text-white text-[10px] py-1 px-2 rounded-sm whitespace-nowrap z-50`}>
                  ₹{item.cost} Lakhs
                </div>

                {item.isBest && (
                  <div className="absolute -top-14 bg-primary text-white text-[4px] font-black py-1 px-3 rounded-full shadow-md animate-bounce">
                    Best Budget
                  </div>
                )}
                
                <div 
                  className={`cost-bar w-[80%] origin-bottom ${item.isBest ? 'bg-primary shadow-[0_0_15px_rgba(47,77,255,0.3)]' : 'bg-[#5573D1]'}`}
                  style={{ 
                    height: `${(item.cost / 35) * 100}%`
                  }}
                ></div>
                
                <span className={`absolute -bottom-10 text-[11px] font-medium tracking-tight whitespace-nowrap ${item.isBest ? 'text-primary font-bold' : 'text-gray-600'}`}>
                  {item.country}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-14 flex justify-center gap-8 border-t border-gray-50 pt-6">
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-primary"></div>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider italic">Best Price Point</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#5573D1]"></div>
             <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Average Costs</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CostComparison;
