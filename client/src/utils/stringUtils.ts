export const camelCaseToSeparatedWords = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').toUpperCase()
}