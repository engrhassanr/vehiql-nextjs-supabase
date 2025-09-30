# Supabase Storage Setup Guide

This guide will help you set up the car-images bucket in Supabase and populate your database with sample car data.

## Step 1: Create the car-images bucket in Supabase

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"New bucket"**
5. Configure the bucket:
   - **Name**: `car-images`
   - **Public bucket**: ✅ **Enable this** (so images can be displayed publicly)
   - **File size limit**: 50MB (or adjust as needed)
   - **Allowed MIME types**: `image/*` (optional, for security)
6. Click **"Create bucket"**

## Step 2: Set up bucket policies

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `scripts/supabase-storage-setup.sql`
3. Click **"Run"** to execute the policies

This will set up:

- Public read access for car images
- Authenticated upload/update/delete permissions
- Optional triggers for upload logging

## Step 3: Populate database with sample car data

1. Make sure your database is set up and migrations are applied:

   ```bash
   npm run db:generate
   npm run db:push
   ```

2. Run the seed script to add sample cars:
   ```bash
   npm run seed
   ```

This will add 10 sample cars with various makes, models, and features to your database.

## Step 4: Verify the setup

1. Check your Supabase Storage dashboard to see the bucket
2. Check your database to see the sample cars
3. Test your application to ensure images are loading correctly

## Sample Cars Included

The seed script includes cars from various manufacturers:

- Honda Civic (2023)
- Toyota Camry (2022)
- BMW X5 (2023)
- Ford F-150 (2022)
- Hyundai Elantra (2023)
- Tesla Model 3 (2023)
- Mercedes-Benz C-Class (2022)
- Subaru Outback (2023)
- Audi A4 (2023)
- Nissan Altima (2022)

Each car includes:

- Complete specifications (make, model, year, price, etc.)
- Multiple high-quality images from Unsplash
- Detailed descriptions
- Proper categorization (featured, status, etc.)

## Troubleshooting

### If bucket creation fails:

- Make sure you have the correct permissions in your Supabase project
- Check if a bucket with the same name already exists

### If policies fail to apply:

- Ensure RLS is enabled on the storage.objects table
- Check that you're running the SQL as a superuser or with appropriate permissions

### If seeding fails:

- Verify your DATABASE_URL is correct in your environment variables
- Make sure Prisma client is generated: `npm run db:generate`
- Check that your database schema is up to date: `npm run db:push`

### If images don't load:

- Verify the bucket is public
- Check that the public read policy is applied correctly
- Ensure your NEXT_PUBLIC_SUPABASE_URL is set correctly

## Next Steps

After setup is complete:

1. Test uploading new cars through your admin interface
2. Verify image display on the frontend
3. Test the search and filter functionality
4. Consider adding more sample data or customizing the existing data

## Security Notes

- The bucket is set to public for easy image display
- Only authenticated users can upload/modify/delete images
- Consider implementing additional security measures for production use
- Monitor storage usage and implement cleanup policies as needed
