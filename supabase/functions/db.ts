import { createClient, SupabaseClient, PostgrestError } from '@supabase/supabase-js';
import {APIResponse} from './api.ts';
import {Database} from './gen.ts';

export type TaskRow = Database['public']['Tables']['tasks']['Row'];
export type TaskInsert = Database['public']['Tables']['tasks']['Insert'];

export type PetRow = Database['public']['Tables']['pets']['Row'];
export type PetInsert = Database['public']['Tables']['pets']['Insert'];

export type CompletedTaskRow = Database['public']['Tables']['completed_tasks']['Row'];
export type CompletedTaskInsert = Database['public']['Tables']['completed_tasks']['Insert'];

export type InsertType = TaskInsert | PetInsert | CompletedTaskInsert;

/**
 *
 * @param req
 * @returns
 */
export const getSupabaseClient = (req: Request) =>
    createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_ANON_KEY') ?? '',
        {
            global: {
                headers: { Authorization: req.headers.get('Authorization')! },
            },
            auth: { persistSession: false },
        }
    );

/**
 *
 * @param client
 * @param table
 * @param input
 */
export const insert = async (
    client: SupabaseClient,
    table: string,
    input: InsertType
): Promise<APIResponse<InsertType, PostgrestError>> => {
    const { data, error } = await client
        .from(table)
        .insert(input)
        .select()
        .single();

    if (error || !data) {
        return {
            data: null, error: error!,
        };
    }

    return {
        data: data as InsertType, error: null,
    };
};
