async function makeInputDoms() {

    let inputdiv_d3xn = d3.select('body').append('div').attr('id', 'inputdiv').attr('class', 'inputdivs')

    inputdiv_d3xn.append('div').text('start from').attr('class', 'inputdivs')
    inputdiv_d3xn.append('input').attr('id', 'input1').attr('value', 0)
    inputdiv_d3xn.append('div').text('number of notes').attr('class', 'inputdivs')
    inputdiv_d3xn.append('input').attr('id', 'input2').attr('value', 10000)
    inputdiv_d3xn.append('div').attr('class', 'inputdivs')
    inputdiv_d3xn.append('button').attr('id', 'makenote').text('make notes').on('click', async function () { await start(allnotes) }).attr('class', 'inputdivs')

    d3.selectAll('div.inputdivs').style('margin', '10px')

    $(document).on('keypress', ev => {
        if (ev.key === 'Enter') {
            d3.select('button#makenote').node().click()
        }
    })
}

async function makeBigDivs() {
    const bigdiv = d3.select('body').append('div')
        .attrs({ 'id': 'bigdiv', 'name': 'div for notes' })
        .styles({ 'width': '100%', 'height': '40%', 'margin-top': '5%' })
    const bigsvg = bigdiv.append('svg')
        .attrs({ "xmlns": "http://www.w3.org/2000/svg", "version": "1.1", 'id':'bigsvg' })
        .styles({ 'width': '100%', 'height': '400px', 'border': 'solid grey 1px', 'background-color': 'white' })
    
    const bigg = bigsvg.append('g').attr('id', 'bigg')


    
    let zoom = d3.zoom().on('zoom', function (ev) { bigg.attr("transform", ev.transform) })
    bigsvg.call(zoom).on('dblclick.zoom', null) 


} 

function getNotesToDisplay(allnotes, startpos, length) {
    if (!startpos) { startpos = 1 }
    if (!length) (length = allnotes.length)

    let notes = allnotes.slice(startpos - 1, startpos - 1 + length)
    return notes
} 

async function start() {

    let s = document.getElementById('input1')
    let l = document.getElementById('input2')
    notes = getNotesToDisplay(allnotes, parseInt(s.value), parseInt(l.value))
    await makeNoteDivs(notes)

} 




async function makeNotes(notes, startpos, length) {
    
    for (let i = 0; i < notes.length; i++) {
        let thenote = notes[i]
        let left = thenote.left
        if (left) {
            if (!left.finger) { left.finger = '' }
            createNote(left.finger, left.staffpos, 'l', i)
        }
        let right = thenote.right
        if (right) {
            if (!right.finger) { right.finger = '' }
            createNote(right.finger, right.staffpos, 'r', i)
        }
    }
}


async function createNote(finger, staffpos, hand, noteindex) {
    let letternumber = staffpositionToLetterNumber(staffpos, letternumber_for_staffposition1[hand])
    let letter = NumToToneLetter(letternumber, anchor_A, n_tone_letters)
    let imgsrcforpiano;
    if (letter === 'C' || letter === 'D' || letter === 'E') {
        imgsrcforpiano = 'img/Pianokey1.PNG'
    } if (letter === 'F' || letter === 'G' || letter === 'A' || letter === 'B') {
        imgsrcforpiano = 'img/Pianokey2.PNG'
    }
    let parent;
    if (hand === 'l') {
        parent = lnotedivs[noteindex]
    } if (hand === 'r') {
        parent = rnotedivs[noteindex]
    }

    let overlaydivcontainer = await adddiv(parent)
    overlaydivcontainer.setAttribute('class', 'overlaycontain')

    let overlaydiv = document.createElement('div')
    overlaydivcontainer.appendChild(overlaydiv)
    overlaydiv.setAttribute('class', 'overlay')
    overlaydiv.style.display = 'block'

    overlaydiv.innerHTML = letter + '<br/>' + finger

    if (letter == 'C' || letter == 'F') {
        overlaydivcontainer.style.paddingLeft = '1px'
    } if (letter == 'E' || letter == 'A') {
        overlaydivcontainer.style.paddingLeft = '34px'
    } if (letter == 'B') {
        overlaydivcontainer.style.paddingLeft = '51px'
    }

    var pianoimg = document.createElement('IMG')
    pianoimg.setAttribute('src', imgsrcforpiano);

    if (hand === 'l') {
        lnotedivs[noteindex].appendChild(pianoimg);
    }
    if (hand === 'r') {
        rnotedivs[noteindex].appendChild(pianoimg);
    }

    pianoimg.style.height = '100px'

    async function adddiv(parent) {
        let div = document.createElement('div')
        parent.appendChild(div)
        return div
    }

}