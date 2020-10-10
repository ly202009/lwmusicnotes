const body = document.body

const notes = [
    { L: { i: 3, line: 5 } }
    , { L: { i:'' , line: 6 } }
    , { L: { i: '', line: 5 } }
    , { L: { i: '', line: 5 } }
    , { L: { i: '', line: 6 } }
    , { L: { i: '', line: 5 } }
    , { R: { i: 1, line: 1 } }
    , { L: { i: '', line: 5 }, R: { i: 4, line: 3.5 } }
    , { L: { i: '', line: 6 } }
    , { L: { i: '', line: 5 } }
    , { R: { i: '2', line: 2.5 } }

    , { R: { i: '5', line:4 }, L: { i: '2+', line: 4}, }
    , { R: { i: '4', line:3.5 },   }
    , { R: { i: '3', line:3 },  }

    , { R: { i: '4', line:3.5 }, L: { i: '3', line: 3.5}, }
    , { R: { i: '3+', line:2.5 },  }
    , { R: { i: '4', line:3 },  }
    , { L: { i: '2', line: 4}, }

    , { R: { i: '2', line:2 }, L: { i: '3', line: 3.5}, }
    , { R: { i: '1', line:1 }, L: { i: '5', line: 2.5}, }

    // ,{ L: { i: 1, line: 3 }}
]





let clickbutton = document.createElement('button')
clickbutton.onclick = makeNotes

document.body.append(clickbutton)
clickbutton.innerText = 'make notes'
let breakele = document.createElement('br')
document.body.append(breakele)

const lnotedivs = [], tmpdiv = undefined;
const rnotedivs = []

// createNote(1, 2)
// createNote(1, 2.5)
// createNote(1, 1)
// createNote(1, 0)
const bigdivr = document.createElement('div')
body.appendChild(bigdivr)
bigdivr.setAttribute('id', 'bigdivr')
bigdivr.setAttribute('name', 'Right hand div')
bigdivr.style.border="solid 1px"
bigdivr.style.height = '150px'
const bigdivl = document.createElement('div')
body.appendChild(bigdivl)
bigdivl.setAttribute('name', 'Left hand div')
bigdivl.setAttribute('id', 'bigdivl')
bigdivl.style.border="solid 1px"
bigdivl.style.height = '150px'


let notelength = notes.length

for (let z = 0; z <= notelength; z++) {
    let tmpdiv = document.createElement('div')    
    tmpdiv.setAttribute('class', 'notediv')
    tmpdiv.setAttribute('id', 'notediv_' + z)
    bigdivl.appendChild(tmpdiv)
    lnotedivs.push(tmpdiv)

    tmpdiv = document.createElement('div')    
    tmpdiv.setAttribute('class', 'notediv')
    tmpdiv.setAttribute('id', 'notediv_' + z)
    bigdivr.appendChild(tmpdiv)
    rnotedivs.push(tmpdiv)
}

// for (a = 0; a <= 8; a++) {
//     notedivs[a] = document.createElement('div')
//     bigdivr.appendChild(notedivs[a])
//     notedivs[a].setAttribute('class', 'notediv')
//     notedivs.push(tmpdiv)
// }


// var tmpdiv = [i]
// notedivs[i] = document.createElement('div')
// notedivs.push(tmpdiv)

// console.log(notedivs[i])

// let bigdivh
// if (h === 'l') {
//     bigdivh = bigdivl
//     bigdivh.style.top = '200px'
// } if (h === 'r') {
//     bigdivh = bigdivr
// }
// bigdivh.appendChild(notedivs[i])
// notedivs[i].setAttribute('class', 'notediv')

// bigdivh.setAttribute('class', 'bigdiv')



async function makeNotes() {
    for (let i = 0; i < notes.length; i++) {
        let thenote = notes[i]
        // get the left hand note
        let left = thenote.L
        if (left) {
            if (!left.i) { left.i = '' }
            createNote(left.i, left.line, 'l', i) //the createNote should be able to descriminate left/right type (a.for define tones (); b. for determine the upper or lower row)
        }
        // get the righ hand note
        let right = thenote.R
        if (right) {
            createNote(right.i, right.line, 'r', i)
        }

    }
}


function createNote(finger, ln, h, noteindex) {

    // if (ln == 'empty') {
    //     return;
    // }

    // var tmpdiv = [i]
    // notedivs[i] = document.createElement('div')
    // notedivs.push(tmpdiv)

    // console.log(notedivs[i])

    // let bigdivh
    // if (h === 'l') {
    //     bigdivh = bigdivl
    //     bigdivh.style.top = '200px'
    // } if (h === 'r') {
    //     bigdivh = bigdivr
    // }
    // bigdivh.appendChild(notedivs[i])
    // notedivs[i].setAttribute('class', 'notediv')

    // bigdivh.setAttribute('class', 'bigdiv')









    let n = 65;
    let anchor_A = 65;
    let rng = 7;
    let theletter = getletter(n, anchor_A, rng)
    // console.log(theletter)
    function getletter(n, anchor_A, rng) {

        let remainder = n % anchor_A;
        let remainder2 = remainder % rng;

        let letter = String.fromCharCode(65 + remainder2)
        return letter
    } // 

    let hand

    if (h === 'l') {
        hand = 71
    } if (h === 'r') {
        hand = 69
    }

    // 1 => 69
    // 1.5 =>70 
    let linenumber = ln
    let anchor = 1
    let anchor2 = hand //this is the base note for right hand, line 1 is E.
    function getthenum(linenumber, anchor, anchor2) {

        let dist = (linenumber - anchor) * 2
        // console.log(dist)
        let thenum = dist + anchor2
        return thenum
    }
    let distcalc = getthenum(linenumber, anchor, anchor2)
    // console.log(distcalc)
    n = distcalc;
    let final = getletter(n, anchor_A, rng)
    // console.log(final)

    let imgsrcforpiano;

    if (final === 'C' || final === 'D' || final === 'E') {
        imgsrcforpiano = 'Pianokey1.PNG'
    } if (final === 'F' || final === 'G' || final === 'A' || final === 'B') {
        imgsrcforpiano = 'Pianokey2.PNG'
    }

    let parent;
    if (h === 'l') {
        parent = lnotedivs[noteindex]
    } if (h === 'r') {
        parent = rnotedivs[noteindex]
    }

    console.log(' =======================', noteindex, parent)

    let overlaydivcontainer = adddiv(parent)
    overlaydivcontainer.setAttribute('class', 'overlaycontain')

    let overlaydiv = document.createElement('div')
    overlaydivcontainer.appendChild(overlaydiv)
    overlaydiv.setAttribute('class', 'overlay')
    overlaydiv.style.display = 'block'

    overlaydiv.innerHTML = final + '<br/>' + finger

    if (final == 'C' || final == 'F') {
        overlaydivcontainer.style.paddingLeft = '1px'
    } if (final == 'E' || final == 'A') {
        overlaydivcontainer.style.paddingLeft = '34px'
    } if (final == 'B') {
        overlaydivcontainer.style.paddingLeft = '51px'
    }

    // let divinside = document.createElement('div')
    // overlaydiv.appendChild(divinside)
    // divinside.setAttribute('class', 'text')
    // divinside.innerText = final

    var pianoimg = document.createElement('IMG')
    pianoimg.setAttribute('src', imgsrcforpiano);

    if (h==='l'){
        lnotedivs[noteindex].appendChild(pianoimg);
    }
    if (h==='r') {
        rnotedivs[noteindex].appendChild(pianoimg);
    }
    
    
    pianoimg.style.height = '100px'
    // pianoimg.style.position = 'absolute'

    clickbutton.onclick = null






    function adddiv(parent) {
        let div = document.createElement('div')
        parent.appendChild(div)
        return div
    }

}
