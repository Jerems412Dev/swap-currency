import { ChevronDown } from 'lucide-react'
import './App.css'
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Ch, Gb, Jp, Us } from 'react-flags-select';
import NumberFlow from '@number-flow/react';

function App() {
  const currencies = [
    {name: 'USD', value: 1.0484, flag: <Us fontSize={28} />},
    {name: 'EUR', value: 0.9999, flag: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 640 480"><defs><g id="flagEu4x30"><g id="flagEu4x31"><path id="flagEu4x32" d="m0-1l-.3 1l.5.1z"/><use href="#flagEu4x32" transform="scale(-1 1)"/></g><g id="flagEu4x33"><use href="#flagEu4x31" transform="rotate(72)"/><use href="#flagEu4x31" transform="rotate(144)"/></g><use href="#flagEu4x33" transform="scale(-1 1)"/></g></defs><path fill="#039" d="M0 0h640v480H0z"/><g fill="#fc0" transform="translate(320 242.3)scale(23.7037)"><use width="100%" height="100%" y="-6" href="#flagEu4x30"/><use width="100%" height="100%" y="6" href="#flagEu4x30"/><g id="flagEu4x34"><use width="100%" height="100%" x="-6" href="#flagEu4x30"/><use width="100%" height="100%" href="#flagEu4x30" transform="rotate(-144 -2.3 -2.1)"/><use width="100%" height="100%" href="#flagEu4x30" transform="rotate(144 -2.1 -2.3)"/><use width="100%" height="100%" href="#flagEu4x30" transform="rotate(72 -4.7 -2)"/><use width="100%" height="100%" href="#flagEu4x30" transform="rotate(72 -5 .5)"/></g><use width="100%" height="100%" href="#flagEu4x34" transform="scale(-1 1)"/></g></svg>},
    {name: 'GBP', value: 0.8272, flag: <Gb fontSize={28} />},
    {name: 'JPY', value: 156.2525, flag: <Jp fontSize={28} />},
    {name: 'CHF', value: 0.9377, flag: <Ch fontSize={28} />},
    //{name: 'XOF', value: 666.6026}
  ]
  const [inputOne, setInputOne] = useState("");
  const [inputTwo, setInputTwo] = useState("");
  const [focusOne, setFocusOne] = useState(false);
  const [focusTwo, setFocusTwo] = useState(false);

  const handleInputOne = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputOne(event.target.value);
    setInputTwo(convert(Number(event.target.value), currencies[fromCurrency].value, currencies[toCurrency].value).toFixed(2));
  };

  const handleInputTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTwo(event.target.value);
    setInputOne(convert(Number(event.target.value), currencies[toCurrency].value, currencies[fromCurrency].value).toFixed(2));
  };

  const [showDropdownOne, setShowDropdownOne] = useState(false);
  const [showDropdownTwo, setShowDropdownTwo] = useState(false);

  const [fromCurrency, setFromCurrency] = useState(0);
  const [toCurrency, setToCurrency] = useState(1);

  const handleFromCurrency = (index: number) => {
    setFromCurrency(index);
    setShowDropdownOne(false);
    setInputTwo(convert(Number(inputOne), currencies[index].value, currencies[toCurrency].value).toFixed(2));
  };

  const handleToCurrency = (index: number) => {
    setToCurrency(index);
    setShowDropdownTwo(false);
    setInputTwo(convert(Number(inputOne), currencies[fromCurrency].value, currencies[index].value).toFixed(2));
  };

  const convert = (amount:number, sourceRate: number, targetRate: number) => {
    return amount * (targetRate / sourceRate);
  };

  return (
    <>
      <div className="w-full h-screen flex flex-row items-center justify-center bg-[#fefefe]">
        <div className="max-lg:w-[80%] w-[25%] h-fit flex flex-col items-center justify-between rounded-3xl border-1 border-[#aeaeb6] bg-[#fefefe] p-4 gap-y-3">
          <div className="w-full flex flex-row items-center justify-start ">
            <h1 className="text-[#8a898f] text-[1.3rem] font-[550]">Swap Currency</h1>
          </div>
          <div className="w-full flex flex-col items-center justify-center rounded-3xl gap-y-1">
            <div className="relative w-full flex flex-row items-center justify-between bg-[#f6f5fa] p-3  rounded-tr-2xl rounded-tl-2xl">
              <div className="relative flex flex-row w-[50%] bg-transparent outline-none text-2xl font-[550] text-black items-center justify-start">
                <input
                  onChange={handleInputOne}
                  value={inputOne}
                  type="text" 
                  inputMode="numeric"
                  placeholder="From"
                  onFocus={() => setFocusOne(true)}
                  onBlur={() => setFocusOne(false)}
                  className={"absolute z-1 w-full outline-none text-[1.5rem] font-[550]" + (focusOne ? "  text-black" : inputOne === '' ? " bg-[#f6f5fa] placeholder:text-[#8a898f]" : " text-transparent")} 
                />
                {!focusOne && 
                  <NumberFlow 
                    opacityTiming={{ duration: 50, easing: 'ease-out' }}
                    locales="en-US"
                    format={{ style: 'decimal', maximumFractionDigits: 8 }}
                    value={Number(inputOne)} 
                    className="absolute z-0 w-full overflow-hidden text-black text-[1.5rem]" />}
              </div>
              <button
                onClick={() => setShowDropdownOne(!showDropdownOne)}
                className="flex flex-row items-center justify-between bg-white px-3 py-2 rounded-3xl gap-x-2 border-1 border-[#aeaeb6]"
              >
                <div className="flex flex-row items-center justify-between gap-x-1">
                  {currencies[fromCurrency].flag}
                  <div className="flex flex-row items-center justify-center overflow-hidden">
                    <motion.span
                      key={fromCurrency}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-[0.9rem] font-[550] text-black">
                        {currencies[fromCurrency].name}
                    </motion.span>
                  </div>
                </div>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: showDropdownOne ? 180 : 0 }}
                  className="flex flex-row items-center justify-center bg-transparent"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence mode="wait">
                {showDropdownOne && 
                  <motion.div
                    key={1} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ 
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0.4
                    }}
                    className="absolute z-10 self-start mt-12 right-3 w-[70%] h-fit flex flex-col items-center justify-start rounded-xl border-1 border-[#aeaeb6] bg-[#fefefe]"
                  >
                    {
                      currencies.map((currency, index) => (
                        <button
                          key={index}
                          onClick={() => handleFromCurrency(index)}
                          className="w-full flex flex-row items-center justify-start hover:bg-[#f6f5fa] rounded-xl gap-x-2 py-2 px-2"
                        >
                          {currency.flag}
                          <span className="text-[0.9rem] font-[550] text-black">{currency.name}</span>
                          {fromCurrency === index && <span className="text-[0.9rem] font-bold text-[#aeaeb6]">✓</span>}
                        </button>
                      ))
                    }
                    
                  </motion.div>
                }
              </AnimatePresence>
            </div>
            <div className="relative w-full flex flex-row items-center justify-between bg-[#f6f5fa] p-3 rounded-br-2xl rounded-bl-2xl">
              <div className="relative flex flex-row w-[50%] bg-transparent outline-none text-2xl font-[550] text-black items-center justify-start">
                <input
                    onChange={handleInputTwo}
                    value={inputTwo}
                    type="text" 
                    inputMode="numeric"
                    placeholder="To"
                    onFocus={() => setFocusTwo(true)}
                    onBlur={() => setFocusTwo(false)}
                    className={"absolute z-1 w-full outline-none text-[1.5rem] font-[550]" + (focusTwo ? "  text-black" : inputTwo === '' ? " bg-[#f6f5fa] placeholder:text-[#8a898f]" : " text-transparent")} 
                  />
                  {!focusTwo && 
                    <NumberFlow 
                      opacityTiming={{ duration: 50, easing: 'ease-out' }}
                      locales="en-US"
                      format={{ style: 'decimal', maximumFractionDigits: 8 }}
                      value={Number(inputTwo)} 
                      className="absolute z-0 w-full overflow-hidden text-black text-[1.5rem]" />}
              </div>
              <button
                onClick={() => setShowDropdownTwo(!showDropdownTwo)}
                className="flex flex-row items-center justify-between bg-white px-3 py-2 rounded-3xl gap-x-2 border-1 border-[#aeaeb6]"
              >
                <div className="flex flex-row items-center justify-between gap-x-1">
                  {currencies[toCurrency].flag}
                  <div className="flex flex-row items-center justify-center overflow-hidden">
                    <motion.span
                      key={toCurrency}
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      className="text-[0.9rem] font-[550] text-black">
                        {currencies[toCurrency].name}
                    </motion.span>
                  </div>
                </div>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: showDropdownTwo ? 180 : 0 }}
                  className="flex flex-row items-center justify-center bg-transparent"
                >
                  <ChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence mode="wait">
                {showDropdownTwo && 
                  <motion.div 
                    key={2}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ 
                      duration: 0.5,
                      type: 'spring',
                      bounce: 0.4
                    }}
                    className="absolute z-10 self-start mt-12 right-3 w-[70%] h-fit flex flex-col items-center justify-start rounded-xl border-1 border-[#aeaeb6] bg-[#fefefe]"
                  >
                    {
                      currencies.map((currency, index) => (
                        <button
                          key={index}
                          onClick={() => handleToCurrency(index)}
                          className="w-full flex flex-row items-center justify-start hover:bg-[#f6f5fa] rounded-xl gap-x-2 py-2 px-2"
                        >
                          {currency.flag}
                          <span className="text-[0.9rem] font-[550] text-black">{currency.name}</span>
                          {fromCurrency === index && <span className="text-[0.9rem] font-bold text-[#aeaeb6]">✓</span>}
                        </button>
                      ))
                    }
                    
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center rounded-[1.1rem] p-3 bg-black text-white text-[1.3rem] font-[550]">
            Proceed
          </div>
          <div className="w-full flex flex-row items-center justify-center text-[1rem] text-[#8a898f] font-[500]">
            {"1 " + currencies[fromCurrency].name + " ≈ " + convert(1, currencies[fromCurrency].value, currencies[toCurrency].value).toFixed(2) +" " + currencies[toCurrency].name}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
