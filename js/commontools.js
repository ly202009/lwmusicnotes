"use strict";

async function readlocalfile(thefileobj, callback_whendoneDosomething) {
    var newreaderinstance = new FileReader();
    newreaderinstance.readAsText(thefileobj);
    newreaderinstance.onload = callback_whendoneDosomething;
}

function setheldtofalse() {
    held = false
    console.log(held)
        // console.log('TURN OFF MOUSE')
    }

async function MakeDomEle(data) {
    let theNewEle = document.createElement(data.nodetype)
    data.parent.append(theNewEle)

    if (data.attrs) {
        $(theNewEle).attr(data.attrs)
    }
    if (data.styles) {
        $(theNewEle).css(data.styles)
    }
    if (data.events) {
        for (let i = 0; i < Object.keys(data.events).length; i++) {
            let thekey = Object.keys(data.events)[i]
            let theaction = data.events[thekey]
            $(theNewEle).on(thekey, theaction)
        }
    }
    if (data.children) {
        data.children.forEach(d => {
            d.parent = theNewEle
            MakeDomEle(d)
        })
    }
    if (data.properties) {
        $(theNewEle).prop(data.properties)
    }
    return theNewEle
}

async function MakeModelTemplate(modeltemplatedata, notclose) {
    await MakeDomEle(modeltemplatedata)

    $('div#model-title').on('mousedown', function () {
        $('div#model-dialoguebox').draggable({ disabled: false })
    })
    $('div#model-title').on('mouseup', function () {
        
        $('div#model-dialoguebox').draggable({ disabled: true })
    })

    $(document).on('keyup', function (event) {
        event.preventDefault();
        if (event.key === 'Enter') {
            if (document.getElementById("modelsubmitbutton")) {
                document.getElementById("modelsubmitbutton").click();
            } else if (document.getElementsByClassName("submit")) {
                document.getElementsByClassName("submit")[0].click();
            }
        } else if (event.key === 'Escape') {
            if (document.getElementById("model-close-button")) {
                document.getElementById("model-close-button").click();
            }
        }
    });

    if (!notclose) {
        $('model-close-button').on('click', closemodel)
    }

}

async function closemodel() {
    $('#model-background').remove()
}



async function removenodes(parent) {
    removeAllChildNodes(parent)
    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

function confirmDelete() {
    let del = confirm("Confirm to delete!")
    return del;
}

function getmousekey(ev) {
    let mousekey = '';
    switch (ev.sourceEvent.button) {
        case 0: mousekey = 'primary(left) click'; break;
        case 1: mousekey = 'secondary(right) click'; break;
    };

    let ctrlkey = '', altkey = '', shiftkey = '';
    if (ev.sourceEvent.ctrlKey === true) { ctrlkey = 'ctrl ' }
    if (ev.sourceEvent.altKey === true) { altkey = 'alt ' }
    if (ev.sourceEvent.shiftKey === true) { shiftkey = 'shift ' }
    let presskeys = ctrlkey + altkey + shiftkey;

    let combinedkeys = presskeys + mousekey

    return combinedkeys
}

function getDistinctValue(srcArray) {
    let ta_dom = document.createElement('textarea')
    document.body.append(ta_dom)
    ta_dom.setAttribute('id', 'copyta')
    ta_dom.innerText = text

    ta_dom.select()

    document.execCommand("copy")

    ta_dom.remove()
}

async function clipboardpaste(text) {
    var newpromise = new Promise(
        (resolve) => {
            navigator.clipboard.readText().then(d => {
                resolve(d)
            })
        }
    )
    var resolved = await newpromise.then(d => {
        return d
    })
    return resolved
}