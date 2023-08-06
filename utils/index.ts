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
