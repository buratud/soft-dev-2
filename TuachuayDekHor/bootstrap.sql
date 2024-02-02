--TuachuayDekHor--
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,

  constraint username_length check (char_length(username) >= 3)
);

create table likes (
  "user_id" int references profile_user,
  "post_id" int references "Create_Post",
  primary key (user_id, post_id)
);

create table comments (
  "id" int references profile_user,
  "id_post" int references "Create_Post",
  primary key (id,id_post)
);

