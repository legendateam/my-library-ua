export const datesNormalize = (dateBirthDay : string, dateDeath: string | null): string | null => {
    const birthDay = [] as string[];
    const deathDay = [] as string[];

    dateBirthDay.split('-').forEach((date) => {
        birthDay.unshift(date);
    });

    if (dateDeath) {
        dateDeath.split('-').forEach((date) => {
            deathDay.unshift(date);
        });
        return `${birthDay.join('.')} — ${deathDay.join('.')}`;
    }
    return birthDay.join('.');
};
