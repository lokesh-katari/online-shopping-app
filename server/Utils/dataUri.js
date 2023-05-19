const  DataUriParser=require( 'datauri');
const path =require('path')
const getDataUri=(file)=>{
    const parser = new DataUriParser();
    const extName = path.extname(file.originalName).toString()
    console.log(extName);
    return parser.format(extName,file.buffer);


}

module.exports=getDataUri;