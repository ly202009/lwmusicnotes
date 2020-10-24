var held = false

async function buildPianoWrappers() {
    let pianodiv_d3xn = d3.select('div#bigdiv').append('div')
        .attrs({ 'id': 'pianodiv', 'name': 'pianodiv' })
        .styles({ 'border': 'solid 0px', 'width': '100%', 
                'height': pianokeysize.fullscreen_whitekey.height, 'margin-top': '100px', 'float': 'left'})

    let pianosvg_d3xn = pianodiv_d3xn.append('svg').attrs({ 'id': 'pianosvg' })
        .styles({ 'height': '100%', 'width': '100%', 'background-color': 'white' })
    let pianog_d3xn = pianosvg_d3xn.append('g').attrs({ 'id': 'pianog' })
}

async function buildPianoKeys() {
    let pianog_d3xn = d3.select('g#pianog')

    let pianosvg_d3xn = d3.select('svg#pianosvg')
    let pianosvgsize = pianosvg_d3xn.node().getBoundingClientRect()

    let width_keychamber = pianosvgsize.width / 52

    let width_whitekey = width_keychamber 

    let height_whitekey = width_whitekey * (pianokeysize.white.length / pianokeysize.white.width)
 
    if (height_whitekey > pianosvgsize.height) {
        height_whitekey = pianosvgsize.height
        width_whitekey = height_whitekey / (pianokeysize.white.length / pianokeysize.white.width)
        width_keychamber = width_whitekey
    }

    let wkeys = []
    for (let i = 0; i < 52; i++) {
        wkeys.push(i)
    }

    pianog_d3xn.selectAll('g.whitekeyg')
        .data(wkeys)
        .enter()
        .append('g')
        .attrs({ 'class': 'whitekeyg' })
        .attr('id', (d, i) => {
            
            let letternumber = i
            let anchor_A = 65
            let rng = 7
            let toneletter = NumToToneLetter(letternumber, anchor_A, rng)
            
            let octaveN = 0
            if (i > 1) {
                octaveN = parseInt((i - 2) / 7) + 1
            }
            return 'keyg_' + toneletter + octaveN
        })
        .append('rect')
        .attrs(pianokeydata.stdrectattrs)
        .attrs({ 'fill': 'white' })
        .styles({ 'width': width_whitekey + 'px', 'height': height_whitekey + 'px' })
        .attr('id', (d, i) => {
            
            let letternumber = i
            let anchor_A = 65
            let rng = 7
            let toneletter = NumToToneLetter(letternumber, anchor_A, rng)
           
            let octaveN = 0
            if (i > 1) {
                octaveN = parseInt((i - 2) / 7) + 1
            }
            return 'key_' + toneletter + octaveN
        })

        .on('mousedown', async function (ev) {
            
            held = true
            console.log(held)

            ev.preventDefault()
            ev.stopPropagation()
    
            playPressedKey(ev)
        }) 

        .on('touchstart', async function (ev) {
            
            held = true
            console.log(held)

            ev.preventDefault()
            ev.stopPropagation()
    
            playPressedKey(ev)
        }) 

        .on('mouseenter', async function (ev) {
            if (held === true) {
                
                ev.preventDefault()
                ev.stopPropagation()

                playPressedKey(ev)
            }
        })
       
        
        // .on('mouseover', async function(ev, held){
        //     console.log('mouse is going over')
        //     if (held === true) {
            
        //     ev.preventDefault()
        //     ev.stopPropagation()
    
        //     playPressedKey(ev)
        //     }
        // })

    pianog_d3xn.selectAll('g.whitekeyg')
        .append('text')
        .attrs(pianokeydata.stdtextattrs.white)
        .attr('transform', d => {
            let y = height_whitekey * 7 / 8
            let translateStr = 'translate(' + width_whitekey / 4 + ',' + y + ')'
            return translateStr
        })
        .attr('font-size', d => {
            return pianokeydata.stdtextattrs.white['font-size'] * width_whitekey / pianokeysize.fullscreen_whitekey.width
        })

        .text((d, i) => {

            let letternumber = i
            let anchor_A = 65
            let rng = 7
            let toneletter = NumToToneLetter(letternumber, anchor_A, rng)

            let octaveN = 0
            if (i > 1) {
                octaveN = parseInt((i - 2) / 7) + 1
            }
            return toneletter + octaveN
        })

    d3.selectAll('g.whitekeyg')
        .attr('transform', (d, i) => {

            let x = width_keychamber * i
            let translateStr = 'translate(' + x + ',0)'

            return translateStr
        })

    d3.selectAll('g.whitekeyg').nodes().forEach((em, emi) => {
        let keygidstr = em.id

        let toneletter = keygidstr.substr(5, 1)
        if (!(['B', 'E'].includes(toneletter) || keygidstr === 'keyg_C8')) {
            addBlackKey_wholepiano(em, emi, width_whitekey, height_whitekey)
        }
    })
} 

function addBlackKey_wholepiano(em, emi, width_whitekey, height_whitekey) {

    let height_blackkey = pianokeysize.black.length * (height_whitekey / pianokeysize.fullscreen_whitekey.height)

    let width_blackkey = pianokeysize.black.width * (height_blackkey / pianokeysize.black.length)

    let keygidstr = em.id

    let toneletter = keygidstr.substr(5, 1)
    let octaveN = keygidstr.substr(6, 1)

    let keyg = d3.select('g#pianog')
        .append('g')
        .attrs({ 'class': 'blackkeyg' })
        .attr('id', (d, i) => {
            return 'keyg_' + toneletter + 's' + octaveN
        })

        .attr('transform', d => {
            let x = emi * width_whitekey + width_whitekey / 2 + width_blackkey / 2
            let y = 0
            let translateStr =
                'translate (' + x + ',' + y + ')'
            return translateStr
        })

    keyg
        .append('rect')
        .attrs(pianokeydata.stdrectattrs)
        .attrs({ 'fill': 'black' })
        .styles({ 'width': width_blackkey + 'px', 'height': height_blackkey + 'px' })
        .attr('id', (d, i) => {
            return 'key_' + toneletter + 's' + octaveN
        })

        .on('mousedown', async function (ev) {

            held = true
            console.log(held)
    
            ev.preventDefault()
            ev.stopPropagation()
    
            playPressedKey(ev)
  
        })
        .on('touchstart', async function (ev) {
            
            held = true
            console.log(held)

            ev.preventDefault()
            ev.stopPropagation()
    
            playPressedKey(ev)
        }) 
        .on('mouseenter', async function (ev) {
            if (held === true) {
                
                ev.preventDefault()
                ev.stopPropagation()

                playPressedKey(ev)
            }
        })

    keyg
        .append('text')
        .attrs(pianokeydata.stdtextattrs.black)
        .attr('color', 'white')
        .attr('transform', d => {
            let y = height_blackkey * 5 / 8
            let translateStr = 'translate(' + width_blackkey / 4 + ',' + y + ') rotate(90) '
            return translateStr
        })
        .attr('font-size', d => {
            return pianokeydata.stdtextattrs.black['font-size'] * height_whitekey / pianokeysize.fullscreen_whitekey.height
        })
        .text((d, i) => {
            return '#' + toneletter  + octaveN
        })
} 