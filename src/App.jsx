import { useCallback, useEffect, useState , useRef} from 'react'

function App() {

  const [length, setLenght] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)
  
  //SAVING PASSWORD IN THE CLIPBOARD USING THE CALLBACK FUNCTION 
    const copyPasswrodToClipboard = useCallback(()=>{
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)
    },[password])


    //useCallback(()=>{},[array]) is a React Hook that lets you cache a function definition between re-renders.
  //GENERATING THE RANDOM NUMBER AND CHANGING THE NUMBER AND CHAR IN THE INPUT UYSING 
  //CALLBACK FUNCTION
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) {
      str += '0123456789'
    }
    if (charAllowed) {
      str += '!@#$%^&*()_+{}[]~`'
    }

    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  
  }, [length, numberAllowed, charAllowed, setPassword])  



  /*THE USEEFFECT HOOK IN REACT IS USED TO HANDLE 
  THE SIDE EFFECTS IN REACT SUCH AS FETCHING DATA, AND UPDATING DOM*/
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 text-center  
    bg-gray-700 py-3'>
        <h1 className='text-3xl text-center my-3 py-3 text-white py\
    '>Password Generator</h1>

        <div className='w-full max-w-md mx-auto shadow-md rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3 rounded-lg'
          placeholder='password' 
          readOnly
          ref={passwordRef} />


        </div>

        <button className='outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0'
        onClick={copyPasswrodToClipboard}>COPY</button>
        <div className='flex test-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer'
              onChange={(e) => { setLenght(e.target.value) }} />
            <label htmlFor="">Length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setnumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
              defaultChecked={charAllowed}
              id='charcterInput'
              onChange={() => {
                setcharAllowed((prev) => !prev) // firing the callback inside the setcharAllowed() to chgnage the value
                //whenever you click the checkbox it will change to its prev state that's itf it is ture then it will be false after that
                //if you directly pass setcharAllowed(ture) it will remain true untill you reloade the web and default will came
              }}
            />
            <label htmlFor='charcterInput'>Charcters</label>
          </div>


        </div>
      </div>
    </>

  )

}

export default App
