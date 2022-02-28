const inputTimeFormat = (time:any) => {
    if(time === ''){
        return time
    }else{
        return time.slice(0, 16).replace('T', ' ')+":00";
    }
}

export default inputTimeFormat;