const calculateMaxPage = (total:number,limit:number) => {
    if(total % 5 === 0){
        return Math.trunc(total/limit)
    }else{
        return Math.trunc(total/limit) + 1
    }
}

export default calculateMaxPage;