function getMusicNotes(d) {
    d.forEach(clefs=> {
        let cleftkeys = Object.keys(clefs)
        cleftkeys.forEach(f =>{
            let notes = clefs[f]
            notes.forEach( g => {
                let staffpos = g.staffpos

                let ln_staffposition1;
                if (f === 'right') {ln_staffposition1 = letternumber_for_staffposition1.r}
                else { ln_staffposition1 = letternumber_for_staffposition1.l }
                let letternum, toneletter, octaveN, semi=''
                if (isNaN(staffpos)) { letternum = staffpos }
                else { letternum = staffpositionToLetterNumber(staffpos, ln_staffposition1) }

                if (isNaN(staffpos)) { toneletter = 'R' } else { toneletter = NumToToneLetter(letternum, anchor_A, n_tone_letters) }
                if (isNaN(staffpos)) { octaveN = 0; semi = '' }
                else {

                    if (g.semi) { semi = g.semi }
                    if (f === 'right') { octaveN = parseInt((letternum - 67) / 7) + 4 }
                    else { octaveN = parseInt((letternum - 67) / 7) + 2 }
                }

                g.tone = toneletter + semi + octaveN
                g.letternum = letternum
            })
        })
    })
    return d
}

function staffpositionToLetterNumber(staffposition, letternumber_for_staffposition1) {
    let skip = (staffposition - 1) * 2
    let letternumber = skip + letternumber_for_staffposition1
    return letternumber
}

function NumToToneLetter(letternumber, anchor_A, rng) {
    let remainder = letternumber % anchor_A;
    let remainder2= remainder % rng;
    let letter = String.fromCharCode(anchor_A + remainder2)
    return letter
}