export function formatDate(date: Date) {

    const result = date.toISOString().split('T')[0]
    console.log(result)
    return result

}