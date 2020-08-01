
//sort list by case count
export const sortData = (data) => {
    const sortedData = [...data];
    //a= {country, cases}
    sortedData.sort((a,b) =>{
        if (a.cases > b.cases) {
            return -1;
        }
        else {
            return 1;
        }
    })
    return sortedData;
}