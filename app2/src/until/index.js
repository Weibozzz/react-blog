
export const updateHtml=str=>{
    return str.replace(/'|"|:|\.|\[|\]|\\/g,function(str){

        if(str==='"'){
            return '@quot;'
        }else if(str==="'") {
            return '@apos;'
        }else if(str===':') {
            return  '&#58;'
        }else if(str==='[') {
            return  '&#91;'
        }else if(str==='[') {
            return  '&#93;'
        }else if(str==='\\') {//自定义的 找不到
            return  '&#43;'
        }else {
            return '&#183;'
        }
    });
}
export const spaceAdd = str=>str&&str.replace(/\+/g,'&nbsp;')
export const NbspToSpace = str=>str&&str.replace(/&nbsp;/g,'　')