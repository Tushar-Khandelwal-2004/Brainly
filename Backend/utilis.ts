export function random(len:number){
    let options:string="qwertyuiopasdfghjklzxcvbnm0123456789";
    let length:number=options.length;
    let ans:string="";
    for(let i=0 ; i<len ; i++){
        ans+=options[Math.floor((Math.random()*length))];
    }
    return ans;
}