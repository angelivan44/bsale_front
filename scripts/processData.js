function sortedDataFunction (data, filter, pagination) {
    let pag = parseInt(pagination)
    let filterData = []
    switch (filter) {
        case "0":
            filterData = data.sort((a, b) => a.name > b.name && 1 || -1)
            break;
        case "1":
            filterData = data.sort((a, b) => a.price - b.price)
            break;
        case "2":
            filterData = data.sort((a, b) => a.discount - b.discount)
            break;
        case "3":
            filterData = data.sort((a, b) => a.category - b.category)
            break;
        default:
            filterData = data.sort()
    }
    return filterData.slice((pag - 1) * 8, pag * 8)
}


function filterDataFunction(data, category) {
    let filterData = []
    if (category != "0") {
        filterData = data.filter((ele) => ele.category == category)
    }
    else {
        filterData = data
    }
    return filterData
}

export {sortedDataFunction , filterDataFunction}