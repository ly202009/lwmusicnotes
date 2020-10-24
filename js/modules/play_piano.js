const quarternotesperminute = 105 //76 * 1.5

// const synth = new Tone.Synth().toDestination(); // when play samples, do not need to load Synth or polySynth

d3.select('div#bigdiv').append('button').text('play the song').styles({ 'margin-top': '30px' })
    .on('click', async function () {

        //https://tonejs.github.io/
        // const synth = new Tone.PolySynth(Tone.Synth).toDestination();

        // get slices of nodes to play
        notes = getNotesToDisplay(allnotes, 0, 200)
        // console.log(notes)

        let notesToPlay = prepareNotes(notes)
        // console.log(notesToPlay)

        // let note = { toneletter: 'C', semi: '', octave: 4, beat: 1 }
        // await playAnoteAttackRelease(note)
        // await playAnoteAttackThenRelease(note)

        // let notes = [
        //     { toneletter: 'C', semi: '', octave: 4, beat: 1 },
        //     { toneletter: 'E', semi: '', octave: 4, beat: 1 },
        //     { toneletter: 'G', semi: '', octave: 4, beat: 1 },
        //     { toneletter: 'C', semi: '', octave: 5, beat: 1 }
        // ]
        // await playPolyNotes(notes)

        // play an mp3 sample
        // let url = 'data/instruments/piano/c4.mp3'
        // playSample(url)

        // play multipy mp3 samples
        // let urls=['whatever']
        // playPolySample(urls)

        // let urls = ['whatever']
        // myPlayPolySample1(urls)

        // let urls = ['whatever']
        // myPlayPolySample2(urls)

        let urls = ['whatever']
        let baseUrl = 'data/instruments/piano/'
        let samples = {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        }

        // let baseUrl = 'externaltools/tone_instruments/samples/harmonium/'
        // let samples = {
        //     "A3": "A3.mp3",
        //     "A#3": "As3.mp3",
        //     "C4": "C4.mp3",
        //     "E3": "E3.mp3",
        //     "F#2": "Fs2.mp3",
        // }


        myPlayPolySample3(urls, samples, baseUrl, notesToPlay)
    })



function prepareNotes(notes) {
    // left head

    let results = [] // each record is to have: the tone (e.g. C4), duration in seconds, and start time since now()
    let momentStartTime = 0
    notes.forEach((d, i) => {
        // get the clefs
        let clefs = Object.keys(d)
        // loop for each key
        let minDuration = 999
        clefs.forEach((e, j) => {
            // console.log(e) // left, right
            let notesInAClef = d[e]


            notesInAClef.forEach((g, k) => {

                let tmp = {}
                tmp.moment = i
                tmp.staff = g.staffpos
                tmp.tone = g.tone
                tmp.beat = g.beat
                tmp.dataline = g.dataline
                tmp.durationSeconds = parseFloat(g.beat) * (60 / quarternotesperminute)
                minDuration = Math.min(minDuration, tmp.durationSeconds)
                tmp.startTime = momentStartTime
                tmp.clef = e
                tmp.note = k

                if (g.tone !== 'R0') { results.push(tmp) }

            })

        })

        momentStartTime = momentStartTime + minDuration
    })

    return results
}
async function myPlayPolySample3(urls, samples, baseUrl, notesToPlay) {
    const sampler = new Tone.Sampler({
        urls: samples,
        release: 10,
        baseUrl: baseUrl,
    }).toDestination();
    Tone.loaded().then(() => {
        Tone.context.resume().then(() => {
            const now = Tone.now()
            notesToPlay.forEach(h => {
                sampler.triggerAttackRelease([h.tone], h.durationSeconds, now + h.startTime);
            })

        })
    })
}
async function myPlayPolySample2(urls) {
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "data/instruments/piano/",
    }).toDestination();
    Tone.loaded().then(() => {
        Tone.context.resume().then(() => {
            const now = Tone.now()
            sampler.triggerAttackRelease(["E4"], 1, now);
            sampler.triggerAttackRelease(["C5"], 2, now + 1);
            sampler.triggerAttackRelease(["A3"], 0.3, now + 1);
            sampler.triggerAttackRelease(["C4"], 0.3, now + 1 + 0.3);
            sampler.triggerAttackRelease(["A3"], 0.4, now + 1 + 0.6);

            sampler.triggerAttackRelease(["A4"], 1, now + 2);

            sampler.triggerAttackRelease(["D5"], 0.3, now + 3);
            sampler.triggerAttackRelease(["F3", 'A3'], 1, now + 3);
            sampler.triggerAttackRelease(["C5"], 0.3, now + 3 + 0.3);
            sampler.triggerAttackRelease(["B4"], 0.4, now + 3 + 0.3 + 0.3);

            sampler.triggerAttackRelease(["C5"], 1, now + 4);
            sampler.triggerAttackRelease(["E3"], 2, now + 4);

            sampler.triggerAttackRelease(["A4"], 1, now + 5);
        })
    })
}

async function myPlayPolySample1(urls) {
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "data/instruments/piano/",
    }).toDestination();
    Tone.loaded().then(() => {
        Tone.context.resume().then(() => {
            const now = Tone.now()
            sampler.triggerAttackRelease(["C2", "G4"], 4, now);
            sampler.triggerAttackRelease(["G4", "C5"], 2, now + 2);

        })
    })
}
async function playPolySample(urls) {
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: "data/instruments/piano/",
    }).toDestination();

    Tone.loaded().then(() => {
        sampler.triggerAttackRelease(["Eb4", "G4", "Bb4"], 4);
    })
}
async function playSample(url) {
    const player = new Tone.Player(url).toDestination();
    Tone.loaded().then(() => {
        player.start();
    });
}

async function playPolyNotes(notes) {
    await Tone.start()
    const now = Tone.now()
    Tone.context.resume().then(() => {

        notes.forEach((d, i) => {
            let keystr = d.toneletter + d.semi + d.octave
            let starttime = now + i * 0.5
            let endtime = now + 4
            synth.triggerAttack(keystr, starttime)
            synth.triggerRelease(keystr, endtime)
        })
    });
}
async function playAnoteAttackRelease(note) {
    let keystr = note.toneletter + note.semi + note.octave
    await Tone.start()
    const now = Tone.now()
    Tone.context.resume().then(() => {

        let seconds = note.beat / quarternotesperminute
        let timestr = seconds + 'n'
        console.log(keystr, timestr)

        synth.triggerAttackRelease(keystr, seconds, now);
    });
}
async function playAnoteAttackThenRelease(note) {
    let keystr = note.toneletter + note.semi + note.octave
    await Tone.start()
    const now = Tone.now()
    Tone.context.resume().then(() => {

        let seconds = note.beat / quarternotesperminute
        synth.triggerAttack(keystr, now);
        synth.triggerRelease(keystr, now + seconds)
    });
}
async function playPressedKey(ev) {

    d3.select(ev.target).attr('fill', 'lightgrey')

    let toneletter, octaveN;
    let semi = ""

    let id = ev.target.id
    let tonestr = id.substr(4, id.length)

    if (tonestr.length === 2) {
        toneletter = tonestr.substr(0, 1)
        octaveN = tonestr.substr(1, 1)
    }
    if (tonestr.length > 2) {
        toneletter = tonestr.substr(0, 1)
        semitoneletter = tonestr.substr(1, 1)
        if (semitoneletter === 's') { semi = '#' }
        octaveN = tonestr.substr(2, 1)
    }
    var key = toneletter + semi + octaveN
    const baseUrl = 'data/instruments/piano/'
    const sampler = new Tone.Sampler({
        urls: {
            "C4": "C4.mp3",
            "D#4": "Ds4.mp3",
            "F#4": "Fs4.mp3",
            "A4": "A4.mp3",
        },
        release: 1,
        baseUrl: baseUrl,
    }).toDestination();
    Tone.loaded().then(async function () {
        await Tone.start()
        const now = Tone.now()
        Tone.context.resume().then(() => {
            sampler.triggerAttack(key, now)

            d3.select(ev.target).on('mouseup', async function () {
                sampler.triggerRelease(key, now)
                d3.select(ev.target).attr('fill', function () {

                    if (key.length > 2) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                })
            }) //d3

            d3.select(ev.target).on('touchend', async function () {
                sampler.triggerRelease(key, now)
                d3.select(ev.target).attr('fill', function () {

                    if (key.length > 2) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                })
            }) //d3

             //d3



            d3.select(ev.target).on('mouseleave', async function () {
                sampler.triggerRelease(key, now)
                d3.select(ev.target).attr('fill', function () {
                    if (key.length > 2) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                })

            }) //d3

            d3.select(ev.target).on('touchmove', async function () {
                sampler.triggerRelease(key, now)
                d3.select(ev.target).attr('fill', function () {
                    if (key.length > 2) {
                        return 'black';
                    } else {
                        return 'white';
                    }
                })

            })

            

            


        });
    })
}