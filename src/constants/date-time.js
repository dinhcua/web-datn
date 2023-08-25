const getYear = () => {
    let years = [];
    for(let i = 1900; i <= new Date().getFullYear(); i++) {
        years.push(i);
    }
    return years;
};

export const LIST_YEAR = getYear();

export const LIST_MONTH = [
    'T1',
    'T2',
    'T3',
    'T4',
    'T5',
    'T6',
    'T7',
    'T8',
    'T9',
    'T10',
    'T11',
    'T12',
];
