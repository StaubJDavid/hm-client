const compareCurrentDate = (time:string) => {
    let currentDate = new Date();
    let compDate = new Date(time);
    console.log(currentDate < compDate)
    return currentDate < compDate;
}

export default compareCurrentDate;