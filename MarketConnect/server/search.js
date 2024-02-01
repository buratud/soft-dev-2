function wagner_fischer(base, target) {
    base_len = base.length
    target_len = target.length
    if (target_len < base_len) {
        return -1
    }

    if (base_len < target_len) {
        target = target.slice(0, base_len)
        target_len = base_len
    }

    current_row = [...Array(base_len + 1).keys()]
    for (let i = 1; i < target_len + 1; i++) {
        previous_row = current_row
        current_row = [i].fill(0, 1, 5)
        for (let j = 1; j < base_len + 1; j++) {
            add = previous_row[j] + 1
            del = current_row[j-1] + 1
            change = previous_row[j-1]
            if (base[j-1] != target[i-1]) {
                change++
            }
            current_row[j] = Math.min(add, del, change)
        }
    }

    return current_row[base_len]
}

function search(target, database) {
    suggestions = []
    for (const product of database) {
        edit_distance = wagner_fischer(" "+target.toUpperCase(), " "+product.name)
        if (edit_distance < 0) {
            continue
        }
        suggestions.push([product, edit_distance])
    }
    suggestions.sort(function(a, b){return a[1]-b[1]})
    suggestions = suggestions.splice(0, 10)
    suggestions.forEach((item, index, arr) => {arr[index] = item[0]})
    
    return suggestions
}