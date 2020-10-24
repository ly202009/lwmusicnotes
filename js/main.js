"use strict"

let note_stdobj = datastr_to_stdobj(notesStr_charge);

var allnotes = getMusicNotes(note_stdobj);

var notes;

var statusdiv = d3.select('div#statusdiv')
var astr

(async () => {
    await makeBigDivs()

    notes = getNotesToDisplay(allnotes, 0, allnotes.length)

    await makeNoteDivs(notes)

    await buildPianoWrappers()

    await buildPianoKeys()
})()