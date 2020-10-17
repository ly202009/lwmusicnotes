const letternumber_for_staffposition1 = {
    l: 71,
    r: 69
};

const anchor_A = 65;

const n_tone_letters = 7;

// standard of a pianokey (measures in mm)
//https://www.reddit.com/r/piano/comments/wkofm/what_are_the_dimension_of_the_piano_keys/
const pianokeysize = {
    white: { width: 23.5, length: 140 },
    black: { width: 13.7, length: 100 },
    fullscreen_whitekey: { width: 20, height: 150 } // in full screen the white key width is about 20px. This is used to reset font size
}
const pianokeydata = {
    stdrectattrs: { 'class': 'keyrect', 'stroke': 'black', 'stroke-width': 1 },
    stdtextattrs: {
        white: { 'fill': 'black', 'font-family': 'sans-serif', 'font-size': 10, 'font-weight': 'bold', 'text-align': 'center' },
        black: { 'fill': 'white', 'font-family': 'sans-serif', 'font-size': 10, 'font-weight': 'bold', 'text-align': 'left', 'padding': '0' }
    }

} //pianokeydata

const maxnotedivs = 10000;

const momentdivdata = {
    maxwidth: 100,
    maxheight: 150,
    stdstyles: { 'border': 'solid 0px', 'background-color': 'yellow'  }
} // notedivdata

const notekeydata = {
    pressedcolor:'lightgrey' ,
    white: { stdattrs: { 'class': 'notewhitekeyrect', 'stroke': 'black', 'stroke-width': 1, 'width': '4', 'height': '4', 'fill': 'white' } },
    black: { stdattrs: { 'class': 'noteblackkeyrect', 'stroke': 'black', 'stroke-width': 1, 'width': '4', 'height': '4', 'fill': 'grey' } }
}
