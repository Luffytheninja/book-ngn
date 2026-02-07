-- Book-NGN Expansion: Core Database Schema
-- Enable UUID extension
create extension if not exists "uuid-ossp";
-- PROFILES TABLE
-- Extends Supabase Auth users with custom application settings
create table if not exists public.profiles (
    id uuid references auth.users on delete cascade primary key,
    username text unique,
    full_name text,
    avatar_url text,
    currency text default 'NGN',
    monthly_income_target numeric(15, 2) default 0,
    user_category text default 'Professional',
    updated_at timestamp with time zone default now()
);
-- ACCOUNTS / WALLETS TABLE
-- Track different financial accounts (Cash, Bank, Mobile Money)
create table if not exists public.accounts (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    name text not null,
    type text not null,
    -- 'Bank', 'Cash', 'Savings', 'Wallet'
    balance numeric(15, 2) default 0,
    currency text default 'NGN',
    color_code text,
    -- For UI representation
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);
-- CATEGORIES TABLE
-- System and custom categories for transactions
create table if not exists public.categories (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade,
    -- Null if system default
    name text not null,
    type text not null,
    -- 'Income', 'Expense'
    icon text,
    color text,
    is_system boolean default false,
    created_at timestamp with time zone default now()
);
-- TRANSACTIONS TABLE
-- Core financial records
create table if not exists public.transactions (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    account_id uuid references public.accounts on delete cascade not null,
    category_id uuid references public.categories on delete
    set null,
        type text not null,
        -- 'Income', 'Expense', 'Transfer'
        amount numeric(15, 2) not null,
        date timestamp with time zone default now() not null,
        description text,
        receipt_url text,
        is_deductible boolean default false,
        -- For tax engine integration
        created_at timestamp with time zone default now()
);
-- BUDGETS TABLE
-- Track spending limits per category
create table if not exists public.budgets (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users on delete cascade not null,
    category_id uuid references public.categories on delete cascade not null,
    amount_limit numeric(15, 2) not null,
    period text default 'Monthly',
    -- 'Weekly', 'Monthly', 'Yearly'
    start_date date not null,
    end_date date,
    created_at timestamp with time zone default now()
);
-- RLS POLICIES (Row Level Security)
-- Ensure users only access their own data
alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
-- Profiles Policies
create policy "Users can view their own profile" on public.profiles for
select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for
update using (auth.uid() = id);
-- Accounts Policies
create policy "Users can manage their own accounts" on public.accounts for all using (auth.uid() = user_id);
-- Categories Policies
create policy "Users can view system and their own categories" on public.categories for
select using (
        user_id is null
        or auth.uid() = user_id
    );
create policy "Users can manage their own categories" on public.categories for all using (auth.uid() = user_id);
-- Transactions Policies
create policy "Users can manage their own transactions" on public.transactions for all using (auth.uid() = user_id);
-- Budgets Policies
create policy "Users can manage their own budgets" on public.budgets for all using (auth.uid() = user_id);
-- FUNCTIONS & TRIGGERS
-- Auto-update balance on transaction
create or replace function public.handle_transaction_change() returns trigger as $$ begin if (tg_op = 'INSERT') then if (new.type = 'Income') then
update public.accounts
set balance = balance + new.amount
where id = new.account_id;
elsif (new.type = 'Expense') then
update public.accounts
set balance = balance - new.amount
where id = new.account_id;
end if;
elsif (tg_op = 'DELETE') then if (old.type = 'Income') then
update public.accounts
set balance = balance - old.amount
where id = old.account_id;
elsif (old.type = 'Expense') then
update public.accounts
set balance = balance + old.amount
where id = old.account_id;
end if;
end if;
return null;
end;
$$ language plpgsql;
create trigger on_transaction_change
after
insert
    or delete on public.transactions for each row execute function public.handle_transaction_change();
