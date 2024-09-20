
Tone.Transport.bpm.value = 76;
const t8n = Tone.Time("8n").toSeconds();
const t4n = t8n*2;

class BGM {
    static #synth = null;
    static #timer1 = 0;
    static #timer2 = 0;
    static #isPlaying = false;
    static get isPlaying() {
        return this.#isPlaying;
    }

    static async start() {
        await Tone.start();
        this.#isPlaying = true;
        this.#playMelody1();
    }

    static stop() {
        this.#isPlaying = false;
        this.#stopMelody();
    }

    static #initSynths() {
        const options = {volume: -5};
        this.#synth = new Tone.PolySynth(options).toDestination();
    }

    static #stopMelody() {
        clearTimeout(this.#timer1);
        clearTimeout(this.#timer2);
        this.#synth?.triggerRelease();
        this.#synth?.dispose();
        this.#synth = null;
    }

    static #playMelody1() {
        this.#stopMelody();
        this.#initSynths();
    
        let time = Tone.now();
        const startTime = time;
    
        this.#synth.triggerAttackRelease("C5", "4n", time); time += t4n;
        this.#synth.triggerAttackRelease("G5", "8n", time); time += t4n;
        this.#synth.triggerAttackRelease("B4", "4n", time); time += t4n;
        this.#synth.triggerAttackRelease("G5", "8n", time); time += t4n;
        this.#synth.triggerAttackRelease("A4", "4n", time); time += t4n;
        this.#synth.triggerAttackRelease("F5", "8n", time); time += t4n;
        this.#synth.triggerAttackRelease("B4", "4n", time); time += t4n;
        this.#synth.triggerAttackRelease("G5", "8n", time); time += t4n;
    
        this.#timer1 = setTimeout(() => {
            this.#playMelody2();
        }, (time - startTime) * 1000);
    }

    static #playMelody2() {
        this.#stopMelody();
        this.#initSynths();
        
        let time = Tone.now();
        const startTime = time;
        
        this.#synth.triggerAttackRelease(["G5", "C3"], "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth.triggerAttackRelease("C3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease("F2", "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["F5", "C3"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["F5", "F3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("A5", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["G5", "C3"], ["4n", "8n"], time);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease("C5", "8n", time + t8n);
        this.#synth.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["F5", "F2"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["E5", "C3"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["D5", "F3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("E5", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["C5", "C3"], ["4n", "8n"], time);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease("G2", "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["F5", "D3"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["B5", "G3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("C6", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["G5", "E3"], ["2n", "8n"], time);
        this.#synth.triggerAttackRelease("C3", "8n", time + t8n);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n*2);
        this.#synth.triggerAttackRelease("G3", "8n", time + t8n*3); time += t4n*2;
    
        this.#synth.triggerAttackRelease("E3", "8n", time); time += t4n;
    
        this.#synth.triggerAttackRelease("D3", "8n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["G5", "C3"], "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth.triggerAttackRelease("C3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["F5", "C3"], "8n", time + t8n);
        this.#synth.triggerAttackRelease("A2", "8n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["F5", "F3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("A5", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["G5", "C3"], ["4n", "8n"], time);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease("C6", "8n", time + t8n);
        this.#synth.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["C6", "A2"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["C6", "C3"], "8n", time); time += t8n;
    
        this.#synth.triggerAttackRelease(["D6", "F3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("E6", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["C6", "C3"], ["4n", "8n"], time);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease("G6", "8n", time + t8n);
        this.#synth.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["F6", "D3"], "8n", time + t8n);
        this.#synth.triggerAttackRelease("B2", "8n", time); time += t4n;
    
        this.#synth.triggerAttackRelease(["D6", "G3"], ["8n", "4n"], time);
        this.#synth.triggerAttackRelease("B5", "8n", time + t8n); time += t4n;
    
        this.#synth.triggerAttackRelease(["C6", "E3"], ["2n", "8n"], time);
        this.#synth.triggerAttackRelease("C3", "8n", time + t8n);
        this.#synth.triggerAttackRelease("E3", "8n", time + t8n*2);
        this.#synth.triggerAttackRelease("G3", "8n", time + t8n*3);
        this.#synth.triggerAttackRelease("C4", "4n", time + t8n*4); time += t8n*8;
    
        this.#timer2 = setTimeout(() => {
            this.#playMelody2();
        }, (time - startTime) * 1000);
    }
}
