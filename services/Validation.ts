export const CorrectUrl = (url:string)=>{
    let newUrl=url.toLowerCase();
    if (url.startsWith("www")){
        newUrl='http://'+newUrl;
    }

    return newUrl;
}