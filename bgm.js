
Tone.Transport.bpm.value = 76;
const t8n = Tone.Time("8n").toSeconds();
const t4n = t8n*2;

class BGM {
    static #synth1 = null;
    static #synth2 = null;
    static #timer1 = 0;
    static #timer2 = 0;
    static #isPlaying = false;
    static get isPlaying() {
        return this.#isPlaying;
    }

    static async start() {
        await Tone.start();
        this.#isPlaying = true;

        await this.#loadPiano();
        this.#playMelody1();
    }

    static stop() {
        this.#isPlaying = false;
        this.#stopMelody();
    }

    static #loadPiano() {
        let timer = 0;
        return new Promise(resolve => {
            this.#synth1 = null;
            this.#synth2 = null;
            timer = setTimeout(() => {
                const options = {volume: -5};
                this.#synth1 = new Tone.Synth(options).toDestination();
                this.#synth2 = new Tone.Synth(options).toDestination();
                resolve();
            }, 60 * 1000);
            const urls = {
                C2: "C2.mp3", A2: "A2.mp3", C3: "C3.mp3", A3: "A3.mp3",
                C4: "C4.mp3", A4: "A4.mp3", C5: "C5.mp3", A5: "A5.mp3",
                C6: "C6.mp3", A6: "A6.mp3",
            };
            const baseUrl = "https://tonejs.github.io/audio/salamander/";
            const envelope = {
                attack: 0,
                release: 1
            };
            const piano1 = new Tone.Sampler({
                urls, baseUrl, envelope,
                onload: () => {
                    this.#synth1 = piano1;
                    if (this.#synth2 !== null) {
                        clearTimeout(timer);
                        resolve();
                    }
                }
            }).toDestination();
            const piano2 = new Tone.Sampler({
                urls, baseUrl, envelope, volume: -5,
                onload: () => {
                    this.#synth2 = piano2;
                    if (this.#synth1 !== null) {
                        clearTimeout(timer);
                        resolve();
                    }
                }
            }).toDestination();
        });
    }

    static #stopMelody() {
        clearTimeout(this.#timer1);
        clearTimeout(this.#timer2);
        this.#synth1?.triggerRelease();
        this.#synth2?.triggerRelease();
        this.#synth1?.dispose();
        this.#synth2?.dispose();
        this.#synth1 = null;
        this.#synth2 = null;
    }

    static #playMelody1() {
        let time = Tone.now();
        const startTime = time;
    
        this.#synth1.triggerAttackRelease("C5", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("G5", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("B4", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("G5", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("A4", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("F5", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("B4", "4n", time); time += t4n;
        this.#synth1.triggerAttackRelease("G5", "4n", time); time += t4n;
    
        this.#timer1 = setTimeout(() => {
            this.#playMelody2();
        }, (time - startTime) * 1000);
    }

    static #playMelody2() {
        let time = Tone.now();
        const startTime = time;
        
        this.#synth1.triggerAttackRelease("G5", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "4n", time); time += t4n; 
    
        this.#synth1.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("C3", "4n", time); time += t4n;
    
        this.#synth2.triggerAttackRelease("F2", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time);
        this.#synth1.triggerAttackRelease("A5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("F3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("C5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time);
        this.#synth2.triggerAttackRelease("F2", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("E5", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("D5", "8n", time);
        this.#synth1.triggerAttackRelease("E5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("F3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("C5", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth2.triggerAttackRelease("G2", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time);
        this.#synth2.triggerAttackRelease("D3", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("B5", "8n", time);
        this.#synth1.triggerAttackRelease("C6", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "2n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n*2);
        this.#synth2.triggerAttackRelease("G3", "8n", time + t8n*3); time += t4n*2;
    
        this.#synth2.triggerAttackRelease("E3", "8n", time); time += t4n;
    
        this.#synth2.triggerAttackRelease("D3", "8n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("C3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("A2", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("F5", "8n", time);
        this.#synth1.triggerAttackRelease("A5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("F3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("G5", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("C6", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("C6", "8n", time);
        this.#synth2.triggerAttackRelease("A2", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("C6", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time); time += t8n;
    
        this.#synth1.triggerAttackRelease("D6", "8n", time);
        this.#synth1.triggerAttackRelease("E6", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("F3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("C6", "4n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("G6", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("F6", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("B2", "8n", time);
        this.#synth2.triggerAttackRelease("D3", "8n", time + t8n); time += t4n;
    
        this.#synth1.triggerAttackRelease("D6", "8n", time);
        this.#synth1.triggerAttackRelease("B5", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("G3", "4n", time); time += t4n;
    
        this.#synth1.triggerAttackRelease("C6", "2n", time);
        this.#synth2.triggerAttackRelease("E3", "8n", time);
        this.#synth2.triggerAttackRelease("C3", "8n", time + t8n);
        this.#synth2.triggerAttackRelease("E3", "8n", time + t8n*2);
        this.#synth2.triggerAttackRelease("G3", "8n", time + t8n*3);
        this.#synth2.triggerAttackRelease("C4", "4n", time + t8n*4); time += t8n*8;
    
        this.#timer2 = setTimeout(() => {
            this.#playMelody2();
        }, (time - startTime) * 1000);
    }
}
