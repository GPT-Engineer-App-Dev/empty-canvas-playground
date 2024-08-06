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

### flights

| name               | type                     | format | required |
|--------------------|--------------------------|--------|----------|
| id                 | int8                     | number | true     |
| created_at         | timestamp with time zone | string | true     |
| flight_number      | text                     | string | true     |
| departure_airport  | text                     | string | true     |
| arrival_airport    | text                     | string | true     |
| departure_time     | timestamp with time zone | string | true     |
| arrival_time       | timestamp with time zone | string | true     |
| airline            | text                     | string | true     |
| status             | text                     | string | true     |

*/

// Hooks for flights table

export const useFlights = () => useQuery({
    queryKey: ['flights'],
    queryFn: () => fromSupabase(supabase.from('flights').select('*'))
});

export const useFlightById = (id) => useQuery({
    queryKey: ['flights', id],
    queryFn: () => fromSupabase(supabase.from('flights').select('*').eq('id', id).single()),
    enabled: !!id
});

export const useAddFlight = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFlight) => fromSupabase(supabase.from('flights').insert([newFlight])),
        onSuccess: () => {
            queryClient.invalidateQueries('flights');
        },
    });
};

export const useUpdateFlight = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('flights').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('flights');
        },
    });
};

export const useDeleteFlight = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('flights').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('flights');
        },
    });
};