import React, { useCallback, useEffect, useState } from 'react'

const App = () => {
  const [passwordLength, setpasswordLength] = useState(8)
  const [upperCaseAllowed, setupperCaseAllowed] = useState(true)
  const [lowerCaseAllowed, setlowerCaseAllowed] = useState(true)
  const [numbersAllowed, setnumbersAllowed] = useState(true)
  const [symbolsAllowed, setsymbolsAllowed] = useState(true)
  const [password, setpassword] = useState('')
  const [copied, setcopied] = useState(false)

  const handleCheckboxChange = (state, setter) => {
    const totalSelected =
      Number(upperCaseAllowed) +
      Number(lowerCaseAllowed) +
      Number(numbersAllowed) +
      Number(symbolsAllowed)

      generatePassword()
    if (state && totalSelected === 1) return

    setter(prev => !prev)
  }

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    setcopied(true)
    setTimeout(() => {
      setcopied(false)
    }, 2000);
  }

  const generatePassword = useCallback(() => {
    // if (!lowerCaseAllowed && !upperCaseAllowed && !numbersAllowed) return setsymbolsAllowed(prev => !prev)
    // if (!symbolsAllowed && !upperCaseAllowed && !numbersAllowed) return setlowerCaseAllowed(prev => !prev)
    // if (!lowerCaseAllowed && !symbolsAllowed && !numbersAllowed) return setupperCaseAllowed(prev => !prev)
    // if (!lowerCaseAllowed && !upperCaseAllowed && !symbolsAllowed) return setnumbersAllowed(prev => !prev)
    let str = ''
    if (lowerCaseAllowed) str += 'abcdefghijklmnopqrstuvwxyz'
    if (symbolsAllowed) str += '!@#$%^&*()_+'
    if (upperCaseAllowed) str += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numbersAllowed) str += '01234567890123456789'
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * str.length)
      password += str[randomIndex]
    }
    setpassword(password)
  }, [upperCaseAllowed, lowerCaseAllowed, symbolsAllowed, numbersAllowed, passwordLength],
  )


  useEffect(() => {
    generatePassword()
  }, [numbersAllowed, symbolsAllowed, lowerCaseAllowed, upperCaseAllowed, passwordLength, generatePassword])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-700 p-4">

      <div className="w-full max-w-2xl bg-slate-800 rounded-2xl shadow-2xl p-8 text-white space-y-6">

        {/* Input + Buttons */}
        <div className="flex flex-col md:flex-row gap-3 items-center">

          <input type="text" placeholder="Generated Password"
            readOnly
            value={password}
            className="flex-1 w-full text-white rounded-xl px-4 py-3 outline-none border-2 border-transparent focus:border-cyan-400" />

          <button onClick={generatePassword}
            className="bg-cyan-500 hover:bg-cyan-600 transition px-5 py-3 rounded-xl font-semibold">
            <img
              src="https://img.icons8.com/?size=100&id=60634&format=png&color=000000"
              alt="home"
              className="w-auto h-6"
            />
          </button>

          <button
            onClick={copyPassword}
            className={`${!copied ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-950'} transition px-5 py-3 rounded-xl font-semibold `}>
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Password Length */}
        <div className="flex items-center gap-4">

          <p className="font-medium whitespace-nowrap">
            Password Length : {passwordLength}
          </p>

          <input type="range" value={passwordLength} onChange={(event) => setpasswordLength(Number(event.target.value))} min={5} max={50} className="w-full accent-cyan-400 cursor-pointer" />
        </div>

        {/* Options */}
        <div className="flex flex-wrap gap-6 items-center">

          <p className="font-medium">
            Characters Used:
          </p>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox"
              onChange={() => handleCheckboxChange(upperCaseAllowed, setupperCaseAllowed)}
              checked={upperCaseAllowed} />
            <p>Uppercase</p>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox"
              onChange={() => handleCheckboxChange(lowerCaseAllowed, setlowerCaseAllowed)}
              checked={lowerCaseAllowed} />
            <p>Lowercase</p>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox"
              onChange={() => handleCheckboxChange(numbersAllowed, setnumbersAllowed)}
              checked={numbersAllowed} />
            <p>Numbers</p>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox"
              onChange={() => handleCheckboxChange(symbolsAllowed, setsymbolsAllowed)}
              checked={symbolsAllowed} />
            <p>Symbols</p>
          </label>

        </div>

      </div>

    </div>
  )
}

export default App