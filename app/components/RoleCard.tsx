import React from "react"
import { GiLaurelCrown, GiTemplarShield, GiFist, GiTripleSkulls, GiPlainDagger } from "react-icons/gi"
import { MdQuestionMark } from "react-icons/md"

type RoleCardProps = {
  title: string
  name: string
}

const getIcon = (title: string) => {
  switch (title) {
    case "King":
      return <GiLaurelCrown className="size-28 text-background -mb-1" />
    case "Guard":
      return <GiTemplarShield className="size-28 text-background py-2" />
    case "Usurper":
      return <GiFist className="size-28 text-background py-2" />
    case "Traitor":
      return <GiPlainDagger className="size-28 text-background py-2" />
    case "Assassin":
      return <GiTripleSkulls className="size-28 text-background py-2" />
    default:
      return <MdQuestionMark className="size-28 text-background py-2" />
  }
}

const FlipRoleCard = ({ role }: { role: RoleCardProps }) => {
  let isFlipped = false
  return (
    <div className="group w-40 h-56 [perspective:1000px]">
      <div className="relative w-full h-full transition-all duration-500 group-hover:[transform:rotateY(180deg)] [transform-style:preserve-3d]">
        <div className="absolute w-full h-full bg-brass rounded-xl">
          {/*Front side*/}
          <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{role.name}</p>
        </div>
        <div className="absolute w-full h-full justify-center items-center bg-brass rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {/*Back side*/}
          <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(role.title)}</div>
          <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{role.title}</p>
        </div>
      </div>
    </div>
  )
}

const RoleCard = ({ role }: { role: RoleCardProps }) => {
  return (
    <div className="relative w-40 h-56 justify-center items-center bg-brass rounded-xl">
      <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(role.title)}</div>
      <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl ">{role.name}</p>
    </div>
  )
}

export { RoleCard, FlipRoleCard }
