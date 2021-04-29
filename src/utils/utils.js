export const cn = obj => {
    const arr = []
    for (let key in obj){
        if (obj[key])
            arr.push(key)
    }
    return arr.join(' ')
}

export const genID = (prev, post) => {
    const arr = []
    if (prev)
        arr.push(prev)
    arr.push(Math.round(Math.random() * 1e9))
    if (post)
        arr.push(post)
    return btoa(arr.join('-'))
}

export default cn
