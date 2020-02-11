export const splitID = (id: string) => {
        let splitted = {
            id: '',
            row: 0,
            column:0
        };
        let string = '';
        let numbers = '';
        let count = 0;

    id.split('').map((char:any ,i) => {
        if (isNaN(char)) {
            string += char;
        } else  {
            if(count < 1){
                splitted.row += Number(char)
            }else{
                numbers = char;
            }
            count++
        }
    });

    splitted.id = string;
    splitted.column = Number(numbers);

    return splitted;
};
