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

export function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        let value = (hash >> (i * 8)) & 0xff;

        // Adjust to ensure colors are not too dark or too light.
        // Here, we make sure each RGB component is between 100 and 200.
        value = Math.min(Math.max(100, value), 200);

        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
