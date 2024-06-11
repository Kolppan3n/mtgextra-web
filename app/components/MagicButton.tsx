import { MdKeyboardBackspace, MdOutlineRestartAlt } from "react-icons/md"
import { TbPin, TbPinnedOff } from "react-icons/tb"
import { GiWantedReward } from "react-icons/gi"
import { BsQuestionCircleFill } from "react-icons/bs"
import { FC } from "react"

export type ButtonType = "back" | "next" | "reset" | "wanted" | "pin" | "unpin" | number

interface ButtonProps {
  className?: string
  btnType: ButtonType
  onClick: () => void
}

const getIconHTML = (btnType: ButtonType) => {
  switch (btnType) {
    case "back":
      return <MdKeyboardBackspace className="size-16 sm:size-24 fill-brass active:fill-black" />
    case "next":
      return <MdKeyboardBackspace className="size-16 sm:size-24 rotate-180 fill-brass active:fill-black" />
    case "reset":
      return <MdOutlineRestartAlt className="size-16 sm:size-24 fill-brass active:fill-black" />
    case "wanted":
      return <GiWantedReward className="size-16 sm:size-24 fill-brass active:fill-black" />
    case "pin":
      return <TbPin className="size-16 sm:size-24 text-brass active:text-black" />
    case "unpin":
      return <TbPinnedOff className="size-16 sm:size-24 text-brass active:text-black" />
    default:
      return <BsQuestionCircleFill className="size-16 sm:size-24 text-red-300" />
  }
}

const MagicButton: FC<ButtonProps> = ({ className, btnType, onClick }) => {
  if (typeof btnType == "string") {
    return (
      <button
        onClick={onClick}
        className={"rounded-full bg-gradient-radial from-black active:from-brass active:to-brass " + className}
      >
        {getIconHTML(btnType)}
      </button>
    )
  }
  return (
    <button
      className="size-16 sm:size-24 rounded-full bg-gradient-radial from-black active:from-brass active:to-brass"
      onClick={onClick}
    >
      <p className="text-brass text-6xl sm:text-8xl active:fill-black">{btnType}</p>
    </button>
  )
}

export default MagicButton
