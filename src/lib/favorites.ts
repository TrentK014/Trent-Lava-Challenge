import { supabase } from './supabase';

/**
 * Check if a shoe is favorited by the current user
 */
export async function isShoeFavorited(userId: string, shoeId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .select('id')
    .eq('user_id', userId)
    .eq('shoe_id', shoeId)
    .single();

  if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
    console.error('Error checking favorite:', error);
    return false;
  }

  return !!data;
}

/**
 * Add a shoe to favorites
 */
export async function addToFavorites(userId: string, shoeId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('favorites')
    .insert({
      user_id: userId,
      shoe_id: shoeId,
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }

  return !!data;
}

/**
 * Remove a shoe from favorites
 */
export async function removeFromFavorites(userId: string, shoeId: string): Promise<boolean> {
  const { error } = await supabase
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('shoe_id', shoeId);

  if (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }

  return true;
}

/**
 * Toggle favorite status for a shoe
 */
export async function toggleFavorite(userId: string, shoeId: string, isCurrentlyFavorited: boolean): Promise<boolean> {
  if (isCurrentlyFavorited) {
    return await removeFromFavorites(userId, shoeId);
  } else {
    return await addToFavorites(userId, shoeId);
  }
}
