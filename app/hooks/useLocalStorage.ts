import { useState, useEffect } from "react"

const getSavedValue = <T>(key: string, initValue: T): T => {
  try {
    if (typeof localStorage !== "undefined" && localStorage.getItem(key) !== null) {
      const savedValue = JSON.parse(localStorage.getItem(key) as string)
      return savedValue
    }
    return initValue
  } catch (error) {
    console.log(error)
    return initValue
  }
}

const useLocalStorage = <T>(key: string, initValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    return getSavedValue<T>(key, initValue)
  })

  useEffect(() => {
    console.log("! Value Updated !")
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value])

  return [value, setValue]
}

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  console.log("! The Array has been shuffled !")
  return array
}

export { useLocalStorage, shuffleArray }
