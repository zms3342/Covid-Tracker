
//sort list by case count
export const sortData = (data) => {
    const sortedData = [...data];
    
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
}