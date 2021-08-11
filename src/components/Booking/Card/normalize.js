export function normalizeCard(value) {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 4) {
        return onlyNums
    }
    if (onlyNums.length <= 8) {
        return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4)}`
    }
    if (onlyNums.length <= 12) {
        return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(8)}`
    }
    return `${onlyNums.slice(0, 4)} ${onlyNums.slice(4, 8)} ${onlyNums.slice(
        8,
        12
    )} ${onlyNums.slice(12, 16)}`
}

export function normalizeMonth(value) {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 2) {
        return onlyNums
    }
}

export function normalizeYear(value) {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 4) {
        return onlyNums
    }
}

export function normalizeCVV(value) {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 4) {
        return onlyNums
    }
}
