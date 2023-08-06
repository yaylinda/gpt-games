begin;

-- remove the supabase_realtime publication
drop publication if exists supabase_realtime;

-- re-create the supabase_realtime publication with no tables
create publication supabase_realtime;

commit;

alter publication supabase_realtime add table public.chats;
alter publication supabase_realtime add table public.chat_messages;
alter publication supabase_realtime add table public.friends;
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.purchases;
