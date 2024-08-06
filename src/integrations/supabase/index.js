import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### items

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |
| name       | text                     | string | false    |

*/

// Hooks for items table

export const useItems = () => useQuery({
    queryKey: ['items'],
    queryFn: () => fromSupabase(supabase.from('items').select('*'))
});

export const useItem = (id) => useQuery({
    queryKey: ['items', id],
    queryFn: () => fromSupabase(supabase.from('items').select('*').eq('id', id).single())
});

export const useAddItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('items').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};

export const useUpdateItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('items').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};

export const useDeleteItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('items').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('items');
        },
    });
};