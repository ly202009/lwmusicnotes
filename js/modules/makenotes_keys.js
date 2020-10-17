async function makeNoteDivs(notes) {
    d3.selectAll('g.momentg').remove()
    let n_divs = notes.length

    let displaynotes = notes.splice(0, n_divs)

    await addMomentUnits(displaynotes)
}

async function addMomentUnits(displaynotes) {
    let momentg = d3.select('g#bigg').selectAll('g.momentg').data(displaynotes).enter()
        .append('g')
        .attr('class', 'momentg')
        .attr('transform', (d, i) => {
            let x = momentdivdata.maxwidth * i + 20 * i
            let y = 0
            let translateStr = 'translate(' + x + ',' + y + ')'
            return translateStr
        })

    let momentdivsR = momentg.append('foreignObject')
        .attrs({ 'width': momentdivdata.maxwidth, 'height': momentdivdata.maxwidth * 1.5 })
        .styles({ 'width': momentdivdata.maxwidth + 'px', 'height': momentdivdata.maxwidth * 1.5 + 'px' })
        .append('xhtml:div')
        .styles(momentdivdata.stdstyles)
        .attrs({ 'class': 'momentdivR', 'clef': 'right' })
        .styles({ 'width': momentdivdata.maxwidth + 'px', 'height': (momentdivdata.maxwidth * 1.5) + 'px' })
    let momentdivsL = momentg.append('foreignObject')
        .attrs({ 'width': momentdivdata.maxwidth, 'height': momentdivdata.maxwidth * 1.5 })
        .styles({ 'width': momentdivdata.maxwidth + 'px', 'height': momentdivdata.maxwidth * 1.5 + 'px' })
        .attr('transform', 'translate(0, 350)')
        .append('xhtml:div')
        .styles(momentdivdata.stdstyles)
        .attrs({ 'class': 'momentdivL', 'clef': 'left' })
        .styles({ 'width': momentdivdata.maxwidth + 'px', 'height': (momentdivdata.maxwidth * 1.5) + 'px' })

    let momentsvgR = momentdivsR.append('svg').attrs({ 'class': 'momentsvgR', 'clef': 'right' }).styles({ "width": momentdivdata.maxwidth, 'height': momentdivdata.maxwidth * 1.5, 'background-color': 'white' })
    let inner_momentgR = momentsvgR.append('g').attrs({ 'class': 'inner_momentgR', 'clef': 'right' })

    let momentsvgL = momentdivsL.append('svg').attrs({ 'class': 'momentsvgL', 'clef': 'left' }).styles({ "width": momentdivdata.maxwidth, 'height': momentdivdata.maxwidth * 1.5, 'background-color': 'white' })
    let inner_momentgL = momentsvgL.append('g').attrs({ 'class': 'inner_momentgL', 'clef': 'left' })

    let keysR = inner_momentgR.attr('whatever', (d, i, em) => {
        addpianokeys(d, i, em)
    })
    let keysL = inner_momentgL.attr('whatever', (d, i, em) => {
        addpianokeys(d, i, em)
    })
}

function addpianokeys(d, i, em) {

    let thenotesdata = d[d3.select(em[i]).attr('clef')]
    let minletternum = 9999, maxletternum = 0;
    if (thenotesdata) {
        thenotesdata.forEach(f => {
            if (!isNaN(f.letternum)) {
                minletternum = Math.min(minletternum, f.semi === 'b' ? f.letternum - 1 : f.letternum)
                maxletternum = Math.max(maxletternum, f.semi === '#' ? f.letternum + 1 : f.letternum)
            } else {
                minletternum = 39
                maxletternum = 39
            }
        })
        console.log(thenotesdata, minletternum, maxletternum)
        let keyRange = startEndKeys(thenotesdata, i, em, minletternum, maxletternum)

        drawkeys(keyRange, d, i, em)
    } 
} 

function drawkeys(keyRange, d, i, em) {

    let theWhiteKeys = setWhiteKeys(keyRange, d)

    makeKeys(theWhiteKeys, d, i, em)
}

function makeKeys(theWhiteKeys, d, i, em) {
    addnoteWhitekeys(theWhiteKeys, em[i])
    addnoteBlackkeys(em[i])
}


function addnoteBlackkeys(em) {


    let note_d3xn = d3.select(em)
    let notedata_d3bh = note_d3xn.datum

    let whitekeys_d3xn = note_d3xn.selectAll('g.notewhitekeyg')

    whitekeys_d3xn.attr('whatever', (d, i, elm) => {

        let whitekeyToneLetter = d.key.substr(0, 1)
        let octaveN = d.key.substr(1, 1)

        if (i === 0 && !['F', 'C'].includes(whitekeyToneLetter)) {
            addABlackKey(em, -1, elm[0])
        }

        if (!(['E', 'B'].includes(whitekeyToneLetter))) {
            addABlackKey(em, i, elm[i])
        }
    })
} 
function addABlackKey(notegdom, whitekeyindex, thiswhitekeygdom) {

    let noteg_d3xn = d3.select(notegdom)

    let theblackkeyg = noteg_d3xn.append('g').attr('class', 'noteblackkeyg')
    let theblackkey = theblackkeyg.append('rect').attrs(notekeydata.black.stdattrs)

    let width_notesvg = $(notegdom.parentNode).width()

    let theWhiteKeys_length = d3.select(notegdom).selectAll('g.notewhitekeyg').nodes().length

    let width_whitenotekey = width_notesvg / theWhiteKeys_length


    let width_blacknotekey = pianokeysize.black.width * width_whitenotekey / pianokeysize.white.width
    let height_blacknotekey = pianokeysize.black.length * width_blacknotekey / pianokeysize.black.width

    theblackkey.attrs({ 'width': width_blacknotekey, 'height': height_blacknotekey })

    theblackkey.attr('transform', d => {

        let x
        if (whitekeyindex < 0) { x = - width_blacknotekey / 2 }
        else {
            x = width_whitenotekey - width_blacknotekey / 2 + width_whitenotekey * whitekeyindex
        }
        return 'translate(' + x + '0)'
    })
 
    theblackkey.attr('data', d => {

        let x, thisblackkeyTone
        if (whitekeyindex < 0) {

            let thiswhitekeyTone = d3.select(thiswhitekeygdom).datum().key
            let thisblackkeyFlatTone = thiswhitekeyTone.substr(0, 1) + "b" + thiswhitekeyTone.substr(1, 1)

            let thisWhitekeyToneLetter = thiswhitekeyTone.substr(0, 1)
            let theoctaveN = thiswhitekeyTone.substr(1, 1)
            let thiswhitekeyCharCode = thisWhitekeyToneLetter.charCodeAt(0)
            let previousWhitekeyCharCode = thiswhitekeyCharCode - 1;
            let previousWhitekeyToneLetter = String.fromCharCode(previousWhitekeyCharCode)
            if (thisWhitekeyToneLetter === 'A') { previousWhitekeyToneLetter = 'G' } 
            if (previousWhitekeyToneLetter === 'B') { theoctaveN = theoctaveN - 1 }
            let thisblackkeySharpTone = previousWhitekeyToneLetter + "#" + theoctaveN
            let tmp = { tone: { sharp: thisblackkeySharpTone, flat: thisblackkeyFlatTone } }
            return JSON.stringify(tmp) 
        }
        else {

            let thiswhitekeyTone = d3.select(thiswhitekeygdom).datum().key
            let thisblackkeySharpTone = thiswhitekeyTone.substr(0, 1) + "#" + thiswhitekeyTone.substr(1, 1)

            let thisWhitekeyToneLetter = thiswhitekeyTone.substr(0, 1)
            let theoctaveN = thiswhitekeyTone.substr(1, 1)
            let thiswhitekeyCharCode = thisWhitekeyToneLetter.charCodeAt(0)
            let nextWhitekeyCharCode = thiswhitekeyCharCode + 1;
            let nextWhitekeyToneLetter = String.fromCharCode(nextWhitekeyCharCode)
            if (thisWhitekeyToneLetter === 'G') { nextWhitekeyToneLetter = 'A' } 
            if (nextWhitekeyToneLetter === 'C') { theoctaveN = theoctaveN + 1 } 
            let thisblackkeyFlatTone = nextWhitekeyToneLetter + "b" + theoctaveN
            let tmp = { tone: { sharp: thisblackkeySharpTone, flat: thisblackkeyFlatTone } }
            return JSON.stringify(tmp)
        } 
    }) 

    let notedata_d3bh = noteg_d3xn.datum()

    let clef = noteg_d3xn.attr('clef').trim()
    let data_notesToPlay = notedata_d3bh[clef]

    data_notesToPlay.forEach(f => {

        theToneToPlay = f.tone.trim()

        if (theblackkey.attr('data')) {
            let datastr = theblackkey.attr('data')
            let presskeydata = JSON.parse(datastr)
            let theblackkeytone = presskeydata.tone

            if (theToneToPlay === theblackkeytone.sharp || theToneToPlay === theblackkeytone.flat) {

                theblackkey.attr('press', 1)

                theblackkey.attr('data', JSON.stringify(f))
                theblackkey.attr('fill', notekeydata.pressedcolor)
            } 
        } 
    }) 
}

function addnoteWhitekeys(theWhiteKeys, em) {
    let thenodegs_d3xn = d3.select(em)
    let whitekeyg = thenodegs_d3xn.selectAll('g.notewhitekeyg').data(theWhiteKeys).enter().append('g').attr('class', 'notewhitekeyg')
    let whitekeys = whitekeyg
        .append('rect')
        .attrs(notekeydata.white.stdattrs)
        .attr('width', () => {

            let size_thenotesvg_dom = { width: $(em.parentNode).width(), height: $(em.parentNode).height() }

            let width_noteg = size_thenotesvg_dom.width
            let width_whitenotekey = width_noteg / theWhiteKeys.length

            return width_whitenotekey
        })
        .attr('height', (d, i, elm) => {
            let thisdom = elm[i]

            let width_notesvg = $(em.parentNode).width()

            let width_whitenotekey = width_notesvg / theWhiteKeys.length

            let height_whitenoteky = pianokeysize.white.length * width_whitenotekey / pianokeysize.white.width

            return height_whitenoteky
        })
        .attr('transform', (d, i, elm) => {
            let thisdom = elm[i]

            let width_notesvg = $(em.parentNode).width()

            let width_whitenotekey = width_notesvg / theWhiteKeys.length

            let x = width_whitenotekey * i

            let translateStr = 'translate(' + x + ', 0)'

            return translateStr
        })

        .attr('fill', d => {

            let fill = d.press ? notekeydata.pressedcolor : 'white'
            return fill
        })

    thenodegs_d3xn.selectAll('g.notewhitekeyg').append('text')
        .attrs(pianokeydata.stdtextattrs.white)
        .attr('transform', (d, i, elm) => {

            let whitekeyg = elm[i].parentNode

            let width_notesvg = $(em.parentNode).width()

            let width_whitenotekey = width_notesvg / theWhiteKeys.length

            let height_whitenotekey = width_whitenotekey * pianokeysize.white.length / pianokeysize.white.width

            let x = width_whitenotekey / 8 + width_whitenotekey * i
            let y = height_whitenotekey * 7 / 8
            let translateStr = 'translate(' + x + ', ' + y + ')'
            return translateStr
        })
        .text(d => { return d.key })

    thenodegs_d3xn.selectAll('g.notewhitekeyg').append('text')
        .attrs(pianokeydata.stdtextattrs.white)
        .attr('transform', (d, i, elm) => {

            let whitekeyg = elm[i].parentNode

            let width_notesvg = $(em.parentNode).width()

            let width_whitenotekey = width_notesvg / theWhiteKeys.length

            let height_whitenotekey = width_whitenotekey * pianokeysize.white.length / pianokeysize.white.width

            let x = width_whitenotekey / 8 + width_whitenotekey * i
            let y = height_whitenotekey * 1.1
            let translateStr = 'translate(' + x + ', ' + y + ')'
            return translateStr
        })
        .text(d => { return (d.press && d.presskeydata.finger) ? d.presskeydata.finger : '' })
}

function setWhiteKeys(keyRange, d) {

    let presskeydata = d[keyRange.clef]
    let presskeys = presskeydata.map(x => x.tone)

    let presskeydict = {}
    presskeys.forEach((e, i) => {
        presskeydict[e] = {}
        presskeydict[e].data = presskeydata[i]
    })

    let thekeys = []
    let tmp = {}
    tmp.key = keyRange.start
    tmp.press = presskeydict[keyRange.start] ? 1 : 0
    tmp.presskeydata = presskeydict[keyRange.start] ? presskeydict[keyRange.start].data : undefined
    thekeys.push(tmp)

    let theToneLetter = keyRange.start.substr(0, 1)
    theoctaveN = keyRange.start.substr(1, 1)
    let theEndToneLetter = keyRange.end.substr(0, 1)

    while (theToneLetter !== 'R') { 

        let theCharCode = theToneLetter.charCodeAt(0)
        let nextCharCode = theCharCode + 1;
        theToneLetter = String.fromCharCode(nextCharCode)
        if (theToneLetter === 'H') { theToneLetter = 'A' } 
        if (theToneLetter === 'C') { theoctaveN++ } 
        let thenextkey = theToneLetter + theoctaveN
        let tmp2 = {}
        tmp2.key = thenextkey
        tmp2.press = presskeydict[thenextkey] ? 1 : 0
        tmp2.presskeydata = presskeydict[thenextkey] ? presskeydict[thenextkey].data : undefined
        thekeys.push(tmp2)
        if (theToneLetter === theEndToneLetter) { break } 
    }

    return thekeys
}

function startEndKeys(thenotesdata, i, em, minletternum, maxletternum) {

    let baseN
    if (d3.select(em[i]).attr('clef') === 'left') { baseN = 2 } else { baseN = 4 }

    let toneletter_min = NumToToneLetter(minletternum, anchor_A, n_tone_letters)
    let octaveN_min = parseInt((minletternum - 67) / 7) + baseN

    let toneletter_max = NumToToneLetter(maxletternum, anchor_A, n_tone_letters)
    let octaveN_max = parseInt((maxletternum - 67) / 7) + baseN

    tonekey_min = toneletter_min + octaveN_min
    tonekey_max = toneletter_max + octaveN_max

    let startkey, endkey;
    if (maxletternum - minletternum > 2) {
        startkey = tonekey_min, endkey = tonekey_max
    } else if (['C', 'D', 'E', 'F'].includes(toneletter_min) && ['C', 'D', 'E', 'F'].includes(toneletter_max)) {
        startkey = 'C' + octaveN_min, endkey = 'F' + octaveN_max
    } else if (['G', 'A', 'B', 'C'].includes(toneletter_min) && ['G', 'A', 'B', 'C'].includes(toneletter_max)) {
        startkey = 'G' + octaveN_min, endkey = 'C' + octaveN_max
    } else {
        startkey = tonekey_min

        let letternum_endkey = minletternum + 3
        let toneletter_endkey = NumToToneLetter(letternum_endkey, anchor_A, n_tone_letters)
        let octaveN_endkey = parseInt((letternum_endkey - 67) / 7) + baseN
        endkey = toneletter_endkey + octaveN_endkey
    } 
    return { start: startkey, end: endkey, clef: d3.select(em[i]).attr('clef') }
}