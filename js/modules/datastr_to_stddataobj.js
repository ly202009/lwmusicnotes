function datastr_to_stdobj(str){
    let result = []

    let momentStrs = getMomentStrs(str);

    console.log(momentStrs)

    momentStrs.forEach(momentStr => {

        let clefs = getclef(momentStr.data);
        let cleftkeys = Object.keys(clefs)
        cleftkeys.forEach(f => {

            let _arr = clefs[f].split(";")

            _arr.forEach((g, i) => {
                let notedata_obj = getNodeData(g)
                notedata_obj.dataline = momentStr.line
                _arr[i] = notedata_obj
            })
            clefs[f] = _arr
        })
        if (clefs) { result.push(clefs) }
    })

    return result
    
}

function getNodeData(d) {
    let tmp = {}
    let e = d.split(',')
    if (e[0] !== null && e[0] !== undefined && e[0].trim().length > 0) {

        if (e[0].trim().substr(e[0].trim().length-1,1) === 's'){
            tmp.semi = '#'
        } 
        if (e[0].trim().substr(e[0].trim().length-1,1) === 'f'){
            tmp.semi = 'b'
        }
        tmp.staffpos = parseFloat(e[0])
    }
    if (e[1] !== null && e[1] !== undefined && e[1].trim().length > 0) {
        tmp.beat = parseFloat(e[1])
    }
    if (e[2] !== null && e[2] !== undefined && e[2].trim().length > 0) {
        tmp.finger = e[2]
    }

    return (tmp)
}

function getclef(d) {    
    d = d.replace('r', '') 

    let left = null, right = null;

    let _arr = d.split('l')

    if (_arr.length === 1) {
        right = _arr[0].trim()
    } else {
        right = _arr[0].trim()
        left = _arr[1].trim()
    }
    let tmp = {}
    if (left !== null && left.length > 0) { tmp.left = left }
    if (right !== null && right.length > 0) { tmp.right = right }

    return tmp
}

// input: text of notes; output: a collection of note strings of the same moment
function getMomentStrs(str) {
    let result = []
    //1. split by line breaker into note segments, each segments containing notes to be played at the same moment
    let _arr = str.split(/\n/)
    // console.log(_arr)
    if (_arr) {
        
        _arr.forEach((d, i) => {
            if (d !== null && d.trim().length > 0){
                let tmp={}
                tmp.line = i+1
            tmp.data=d
                result.push(tmp)
            }            
        })
    }
    return result
} // getMomentStrs
