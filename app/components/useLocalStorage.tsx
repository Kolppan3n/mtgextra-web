import { useState, useEffect } from "react"

const getSavedValue = (key: string, initValue: any) => {
  try {
    if (localStorage.getItem(key) !== null) {
      const savedValue = JSON.parse(localStorage.getItem(key) as string)
      return savedValue
    }
    return initValue
  } catch (error) {
    console.log(error)
    return initValue
  }
}

const useLocalStorage = (key: string, initValue: any) => {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initValue)
  })

  useEffect(() => {
    console.log("!Value Updated!")
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}

export default useLocalStorage
