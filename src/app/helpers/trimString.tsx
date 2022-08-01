const trimString = (message:string,length:number, tbd:string) => {
    return `${message.slice(0,length)}${tbd}`;
}

export default trimString;