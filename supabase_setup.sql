-- Create purchases table
CREATE TABLE purchases (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  amount numeric NOT NULL,
  cart_snapshot jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on purchases
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own purchases
CREATE POLICY "Users can view own purchases" ON purchases 
  FOR SELECT USING (auth.uid() = user_id);

-- Optional: Create RPC function to increment total_spending atomically
CREATE OR REPLACE FUNCTION increment_total_spending(user_id_param uuid, amount_param numeric)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET total_spending = COALESCE(total_spending, 0) + amount_param
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
