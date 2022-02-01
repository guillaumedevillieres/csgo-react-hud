import React from "react";
import * as I from "csgogsi-socket";
import { Match, Veto } from '../../api/interfaces';
import TeamLogo from "../MatchBar/TeamLogo";
import "./mapseries.scss";
import de_dust2 from "../../assets/map_pool/de_dust2.jpg";
import de_mirage from "../../assets/map_pool/de_mirage.jpg";
import de_inferno from "../../assets/map_pool/de_inferno.jpg";
import de_ancient from "../../assets/map_pool/de_ancient.jpg";
import de_nuke from "../../assets/map_pool/de_nuke.jpg";
import de_overpass from "../../assets/map_pool/de_overpass.jpg";
import de_vertigo from "../../assets/map_pool/de_vertigo.jpg";

interface IProps {
    match: Match | null;
    teams: I.Team[];
    isFreezetime: boolean;
    map: I.Map
}

interface IVetoProps {
    veto: Veto;
    teams: I.Team[];
    active: boolean;
}

class VetoEntry extends React.Component<IVetoProps> {

    render(){
        const { veto, teams, active } = this.props;
        const MapPool = {
            "de_dust2": de_dust2,
            "de_mirage": de_mirage,
            "de_inferno": de_inferno,
            "de_anciant": de_ancient,
            "de_nuke": de_nuke,
            "de_overpass": de_overpass,
            "de_vertigo": de_vertigo,
        }
        let vetoed: string = veto.mapName;
        let flushMapName = veto.mapName.substr(3);
        const style = {
          backgroundImage: 'url(' + MapPool[vetoed] +')',
        }
        return <div className={`veto_container ${active ? 'active' : ''}`}>
            <div className="veto_map_name" style={style}>
                {flushMapName}
            </div>
            <div className="veto_picker">
                <TeamLogo team={teams.filter(team => team.id === veto.teamId)[0]} />
            </div>
            <div className="veto_winner">
                <TeamLogo team={teams.filter(team => team.id === veto.winner)[0]} />
            </div>
            <div className="veto_score">
                {Object.values((veto.score || ['-','-'])).sort().join(":")}
            </div>
            <div className='active_container'>
                <div className='active'>Currently playing</div>
            </div>
        </div>
    }
}

export default class MapSeries extends React.Component<IProps> {

    render() {
        const { match, teams, isFreezetime, map } = this.props;
        if (!match || !match.vetos.length) return null;
        return (
            <div className={`map_series_container ${isFreezetime ? 'show': 'hide'}`}>
                <div className="title_bar">
                    <div className="picked">Picked</div>
                    <div className="winner">Winner</div>
                    <div className="score">Score</div>
                </div>
                {match.vetos.filter(veto => veto.type !== "ban").map(veto => {
                    if(!veto.mapName) return null;
                    return <VetoEntry key={`${match.id}${veto.mapName}${veto.teamId}${veto.side}`} veto={veto} teams={teams} active={map.name.includes(veto.mapName)}/>
                })}
            </div>
        );
    }
}
