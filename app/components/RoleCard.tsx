import React, { useState } from "react";
import { GiLaurelCrown, GiTemplarShield, GiFist, GiTripleSkulls, GiPlainDagger } from "react-icons/gi";
import { MdQuestionMark } from "react-icons/md";
import { Role } from "../usurper/page";
import { cn } from "../utils";

type PlayerCardProps = { name: string; role: Role | null };

const getIcon = (role: Role | null) => {
  switch (role) {
    case "King":
      return <GiLaurelCrown className="size-28 text-background -mb-1" />;
    case "Guard":
      return <GiTemplarShield className="size-28 text-background py-2" />;
    case "Usurper":
      return <GiFist className="size-28 text-background py-2" />;
    case "Traitor":
      return <GiPlainDagger className="size-28 text-background py-2" />;
    case "Assassin":
      return <GiTripleSkulls className="size-28 text-background py-2" />;
    default:
      return <MdQuestionMark className="size-28 text-background py-2" />;
  }
};

const FlipRoleCard = ({ player }: { player: PlayerCardProps }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-40 h-56 [perspective:1000px]" onClick={() => setIsFlipped((prev) => !prev)}>
      <div
        className={cn("relative w-full h-full transition-all duration-500 [transform-style:preserve-3d]", {
          "[transform:rotateY(180deg)]": isFlipped || player.role === "King",
        })}
      >
        <div className="absolute w-full h-full bg-brass rounded-xl">
          {/*Front side*/}
          <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl">{player.name}</p>
        </div>
        <div
          className={
            "absolute w-full h-full justify-center items-center bg-brass rounded-xl [transform:rotateY(180deg)] [backface-visibility:hidden]"
          }
        >
          {/*Back side*/}
          <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(player.role)}</div>
          <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl">
            {player.role === "King" ? player.name : player.role}
          </p>
        </div>
      </div>
    </div>
  );
};

const RoleCard = ({ player }: { player: PlayerCardProps }) => {
  return (
    <div className="relative w-40 h-56 justify-center items-center bg-brass rounded-xl">
      <div className="absolute flex justify-center left-0 right-0 bottom-1/3">{getIcon(player.role)}</div>
      <p className="absolute left-0 right-0 top-3/4 text-center text-text-black text-xl">{player.name}</p>
    </div>
  );
};

export { RoleCard, FlipRoleCard };
