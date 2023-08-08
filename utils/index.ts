import moment from 'moment';

/**
 *
 * @param list
 */
export const reduceToMapped = <
    T extends {
        id: string;
    },
>(
    list: T[]
): Record<string, T> =>
    list.reduce<Record<string, T>>((prev, curr) => {
        prev[curr.id] = curr;
        return prev;
    }, {});

/**
 *
 * @param e
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorAlert = (e: any) => {
    console.error(`ERROR: ${JSON.stringify(e)}`);
    // TODO - do some sort of notification
};

/**
 *
 */
export const generateDiscriminator = (): string => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
};

/**
 *
 * @param date
 */
export const formatMoment = (date: moment.Moment) => {
    if (Math.abs(date.diff(moment(), 'hour')) < 2) {
        return date.fromNow();
    }
    if (date.isSame(moment(), 'day')) {
        return date.format('h:mm a'); //
    }
    if (date.isSame(moment(), 'year')) {
        return `${date.format('l').slice(0, -5)} ${date.format('h:mm a')}`;
    }
    return `${date.format('l')} ${date.format('h:mm a')}`;
};
