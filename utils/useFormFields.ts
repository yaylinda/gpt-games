import React from 'react';

type Field<K extends keyof T, T> = {
    value: T[K];
    rule?: (value: T[K]) => boolean;
};

type Fields<T> = {
    [K in keyof T]: Field<K, T>;
};

type FieldError<T> = {
    [K in keyof T]: string;
};

const useFormFields = <T extends object>(initial: Fields<T>) => {
    const [fields, setFields] = React.useState<Fields<T>>(initial);

    const updateField = <K extends keyof T>(key: K, value: T[K]) => {
        setFields((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getFields = (): T => fields;

    const validate = (): FieldError<T> => {
        const errors: FieldError<T> = {} as FieldError<T>;

        for (const key of Object.keys(fields)) {
            const field: Field<keyof T, T> = fields[key as keyof T];

            if (!field.rule) {
                continue;
            }

            const hasError = field.rule(field.value);

            if (!hasError) {
                continue;
            }

            errors[key as keyof T] = 'Please fix!';
        }

        return errors;
    };

    const reset = () => {
        console.log(`[useFormFields][reset] resetting fields to: ${JSON.stringify(initial)}`);
        setFields(initial);
    };

    return {
        fields,
        updateField,
        getFields,
        validate,
        reset,
    };
};

export default useFormFields;
