import React from "react";
import { connect } from "react-redux";
import * as Tone from "tone";

// Import of functions
import drumNotes from "../../functions/drumNotes";
import getIndexes from "../../functions/getIndexes";

// import of sounds
import kick from "../../assets/Samples/kick.wav";
import snare from "../../assets/Samples/snare.wav";
import rim from "../../assets/Samples/rim.wav";
import hihat from "../../assets/Samples/hihat.wav";
import hit from "../../assets/Samples/hit.wav";

// import of 808
import Height_kick from "../../assets/Samples/808/808kick.wav";
import Height_snare from "../../assets/Samples/808/808snare.wav";
import Height_cowbell from "../../assets/Samples/808/808cowbell.wav";
import Height_hihatC from "../../assets/Samples/808/808hihatC.wav";
import Height_hihatO from "../../assets/Samples/808/808hihatO.wav";
import Height_conga from "../../assets/Samples/808/808conga.wav";
import Height_clap from "../../assets/Samples/808/808clap.wav";

// import of 909

import Nine_kick from "../../assets/Samples/909/bd.wav";
import Nine_snare from "../../assets/Samples/909/snare.wav";
import Nine_snare2 from "../../assets/Samples/909/snare2.wav";
import Nine_ride from "../../assets/Samples/909/ride.wav";
import Nine_hat from "../../assets/Samples/909/hat.wav";
import Nine_clave from "../../assets/Samples/909/clave.wav";
import Nine_clap from "../../assets/Samples/909/clap.wav";

// import of LinnDrum

import Linn_kick from "../../assets/Samples/LinnDrum/bd.wav";
import Linn_snare from "../../assets/Samples/LinnDrum/snare.wav";
import Linn_conga from "../../assets/Samples/LinnDrum/conga.wav";
import Linn_conga2 from "../../assets/Samples/LinnDrum/conga2.wav";
import Linn_hat from "../../assets/Samples/LinnDrum/hat.wav";
import Linn_clave from "../../assets/Samples/LinnDrum/clave.wav";
import Linn_cow from "../../assets/Samples/LinnDrum/cow.wav";

// import of Kraftwerk

import Kraft_kick from "../../assets/Samples/Kraftwek/bd.wav";
import Kraft_snare from "../../assets/Samples/Kraftwek/snare.wav";
import Kraft_tom from "../../assets/Samples/Kraftwek/tom.wav";
import Kraft_tom2 from "../../assets/Samples/Kraftwek/tom2.wav";
import Kraft_noise from "../../assets/Samples/Kraftwek/noise.wav";
import Kraft_clave from "../../assets/Samples/Kraftwek/clave.wav";
import Kraft_clap from "../../assets/Samples/Kraftwek/clap.wav";

// import of Industrial

import Indus_kick from "../../assets/Samples/Industrial/bd.wav";
import Indus_tom from "../../assets/Samples/Industrial/tom.wav";
import Indus_indus from "../../assets/Samples/Industrial/indus.wav";
import Indus_scratch from "../../assets/Samples/Industrial/scratch.wav";
import Indus_hat from "../../assets/Samples/Industrial/hat.wav";
import Indus_clap2 from "../../assets/Samples/Industrial/clap2.wav";
import Indus_clap from "../../assets/Samples/Industrial/clap.wav";

class Drums extends React.Component {
  drums = new Tone.Sampler({
    C2: Height_kick,
    D2: Height_snare,
    "D#2": Height_hihatC,
    F2: Height_hihatO,
    G2: Height_cowbell,
    A2: Height_clap,
    "A#2": Height_conga,
    C3: kick,
    D3: kick,
    "D#3": snare,
    F3: hit,
    G3: rim,
    A3: hihat,
    "A#3": hihat,
    C4: Nine_kick,
    D4: Nine_snare,
    "D#4": Nine_snare2,
    F4: Nine_ride,
    G4: Nine_hat,
    A4: Nine_clap,
    "A#4": Nine_clave,
    C5: Linn_kick,
    D5: Linn_snare,
    "D#5": Linn_conga,
    F5: Linn_conga2,
    G5: Linn_hat,
    A5: Linn_cow,
    "A#5": Linn_clave,
    C6: Kraft_kick,
    D6: Kraft_snare,
    "D#6": Kraft_tom,
    F6: Kraft_tom2,
    G6: Kraft_noise,
    A6: Kraft_clap,
    "A#6": Kraft_clave,
    C7: Indus_kick,
    D7: Indus_tom,
    "D#7": Indus_indus,
    F7: Indus_scratch,
    G7: Indus_hat,
    A7: Indus_clap2,
    "A#7": Indus_clap
  }).toMaster();

  playSound = data => {
    if (!data) {
      return;
    }

    let drumNote = drumNotes(
      data,
      this.props.gridSize.y,
      this.props.gridSize.x,
      this.props.base,
      this.props.octavesRange
    );

    //play a middle 'C' for the duration of an 8th note
    if (drumNote === false) {
      return;
    }

    this.drums.triggerAttackRelease(drumNote, "8n");
  };

  render = () => {
    let cells = this.props.cells;
    let already = false;
    for (let i = 0; i < cells.length; i++) {
      let indexes = getIndexes(cells, { x: cells[i].x, y: cells[i].y });
      if (already === false && indexes.tab.length > 1) {
        if (this.props.synthParameters.drumsOn === true) {
          this.playSound(indexes.tab[0]);
          already = true;
        }
      }
    }
    return null;
  };
}
const mapStateToProps = state => {
  return {
    cells: state.gridManager.cells,
    gridSize: state.gridManager.gridSize,
    scale: state.gridManager.parameters.scale,
    base: state.gridManager.parameters.base,
    octavesRange: state.gridManager.parameters.octavesRange,
    synthParameters: state.synthParameters,
    midi: state.gridManager.midiData
  };
};

export default connect(mapStateToProps)(Drums);
