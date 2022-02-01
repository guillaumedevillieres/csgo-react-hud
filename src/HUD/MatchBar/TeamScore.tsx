import React from "react";
import * as I from "csgogsi-socket";
import WinIndicator from "./WinIndicator";
import { Timer } from "./MatchBar";
import TeamLogo from './TeamLogo';
import PlantDefuse from "../Timers/PlantDefuse"
import {Match} from "../../api/interfaces";

interface IProps {
  team: I.Team;
  map: I.Map;
  orientation: "left" | "right";
  timer: Timer | null;
  showWin: boolean;
  match: Match | null;
}

export default class TeamScore extends React.Component<IProps> {
  render() {

    const { match, map } = this.props;
    const { orientation, timer, team, showWin } = this.props;
    const amountOfMaps = (match && Math.floor(Number(match.matchType.substr(-1)) / 2) + 1) || 0;
    const left = map.team_ct.orientation === "left" ? map.team_ct : map.team_t;
    const right = map.team_ct.orientation === "left" ? map.team_t : map.team_ct;
      return (
      <>
        <div className={`team ${orientation} ${team.side}`}>
            <div className={`series_wins ${team.orientation}`}>
                <div className={`wins_box_container`}>
                    {new Array(amountOfMaps).fill(0).map((_, i) => (
                        <div key={i} className={`wins_box ${team.matches_won_this_series > i ? "win" : ""} ${team.side}`} />
                    ))}
                </div>
            </div>
          <div className="team-name">{team.name}</div>
          <TeamLogo team={team} />
          <div className="round-thingy"><div className="inner"></div></div>
        </div>
        <PlantDefuse timer={timer} side={orientation} />
        <WinIndicator team={team} show={showWin}/>
      </>
    );
  }
}
