export const splitID = (id: string) => {
        let splitted = {
            id: '',
            number: 0
        };
        let string = '';

    id.split('').map((char:any ,i) => {
        if (isNaN(char)) {
            string += char;
        }
    });
// ^r\d+
//     c\d+
    splitted.id = string;
    splitted.number = Number(id.match(/\d+/g))
    // splitted.row = Number(id.match(/(?<=r)\d+/g));
    // splitted.column = Number(id.match(/(?<=c)\d+/g));
    return splitted;
};
