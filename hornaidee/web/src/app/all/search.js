function wagner_fischer(base, target) {
    // Get base and target length
    const base_len = base.length
    let target_len = target.length
    let targetFix = target
    // Check if target length is less than base length, if so return.
    if (target_len < base_len) {
        return -1
    }
    // Check if target length is greater than base length, if so slice target so that it have the same length as base.
    if (base_len < target_len) {
        let targetFix = target.slice(0, base_len)
        target_len = base_len
    }
    // Create and calculate Wagner-Fischer algorithm to get edit distance matrix
    let current_row = [...Array(base_len + 1).keys()]
    for (let i = 1; i < target_len + 1; i++) {
        let previous_row = current_row
        current_row = [i].fill(0, 1, 5)
        for (let j = 1; j < base_len + 1; j++) {
            const add = previous_row[j] + 1
            const del = current_row[j-1] + 1
            let change = previous_row[j-1]
            if (base[j-1] != targetFix[i-1]) {
                change++
            }
            current_row[j] = Math.min(add, del, change)
        }
    }

    return current_row[base_len] // Return edit distance between from base to target
}

export default function search(target, database) {
    let suggestions = []
    let notFound = false
    let errorRatio = 0.7
    // Get all edit distance for every product in the database
    for (const dorm of database) {
        const searchTerm = target.toUpperCase()
        const dormName = dorm.name.toUpperCase()
        const edit_distance = wagner_fischer(searchTerm, dormName)
        // Check if edit distance is less than 0 or greater than error ratio, if so continue to the next product
        if (edit_distance < 0 || edit_distance/target.length > errorRatio) {
            continue
        }
        // Check if first character of base is the same as first character of target
        if (searchTerm.charAt(1) != dormName.charAt(1)) {
            continue
        }
        suggestions.push([dorm, edit_distance])
    }
    // Sort product by edit distance from ascending, and get first 10 product
    suggestions.sort(function(a, b){return a[1]-b[1]})
    // Check if there are no matching product names in the database
    if (suggestions.length == 0) {
        notFound = true
    }
    suggestions = suggestions.splice(0, 10)
    suggestions.forEach((item, index, arr) => {arr[index] = item[0]})

    return {"response": suggestions, "notFound": notFound} // Return suggested products
}