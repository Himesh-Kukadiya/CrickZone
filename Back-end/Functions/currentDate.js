const currentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    console.log(`${year}-${month}-${day}`)
}