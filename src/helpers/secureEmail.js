export function censorWord(str) {
    if (str) {
        return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
    }
}

export function censorPhone(number) {
    return censorWord(number);
}

export function censorEmail(email) {
    if (email) {
        var arr = email.split("@");
        return censorWord(arr[0]) + "@" + censorWord(arr[1]);
    }
}