import { isEmpty } from 'lodash';
import React from 'react';

export type Fields<T> = {
    [K in keyof T]: T[K];
};

export type FieldErrors<T> = {
    [K in keyof T]: string;
};

export type FieldRules<T> = {
    [K in keyof T]: FieldRule<T[K]>[];
};

export type FieldRule<V> = {
    rule: (value: V) => boolean;
    message: string;
};

const useFormFields = <T extends object>(initial: T, rules: FieldRules<T>) => {
    const [fields, setFields] = React.useState<T>(initial);
    const [errors, setErrors] = React.useState<FieldErrors<T>>({} as FieldErrors<T>);

    const updateField = <K extends keyof T>(key: K, value: T[K]) => {
        if (errors[key]) {
            setErrors((state) => ({
                ...state,
                [key]: '',
            }));
        }

        setFields((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const getValues = (): T => fields;

    const validate = (): boolean => {
        const errors: FieldErrors<T> = {} as FieldErrors<T>;

        for (const key of Object.keys(rules)) {
            const fieldKey: keyof T = key as keyof T;
            const fieldValue = fields[fieldKey];

            if (!rules[fieldKey] || isEmpty(rules[fieldKey])) {
                continue;
            }

            const errorMessages = rules[fieldKey]
                .filter(({ rule }) => !rule(fieldValue))
                .map(({ message }) => message)
                .join(', ');

            if (errorMessages) {
                errors[fieldKey] = errorMessages;
            }
        }

        setErrors(errors);

        console.log(`[validate] validation errors: ${JSON.stringify(errors)}`);
        
        return isEmpty(errors);
    };

    const reset = () => {
        console.log(`[useFormFields][reset] resetting fields to: ${JSON.stringify(initial)}`);
        setFields(initial);
    };

    return {
        fields,
        errors,
        updateField,
        getFields: getValues,
        validate,
        reset,
    };
};

export default useFormFields;
