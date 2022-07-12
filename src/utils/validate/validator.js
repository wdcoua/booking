export const required = value => {
    if(value && value.length > 0) {
        //console.log(value.length)
        return null;
    }
    return <div><br/>required field</div>;
}



export const maxLenCreator = (maxLen) => (value) => {
    if(value.length <= maxLen) return undefined;
    return <div><br/>max length {maxLen} symbols</div>;
}

export const minLenCreator = (minLen) => value => {
    if(value.length >= minLen) return undefined;
    return <div><br/>min length {minLen} symbols</div>;
}

export const onlyNumbers = () => value => {
    if(value.match(/[0-9]/)) return undefined;
    return <div><br/>i accept only numbers </div>;
}

