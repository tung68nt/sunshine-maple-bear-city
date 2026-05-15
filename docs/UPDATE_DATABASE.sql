-- SQL Policies for Admin CRUD Operations

-- Admissions
CREATE POLICY "Admins can update admissions" ON admissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete admissions" ON admissions
  FOR DELETE USING (auth.role() = 'authenticated');

-- Tour Bookings
CREATE POLICY "Admins can view all tour bookings" ON tour_bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can update tour bookings" ON tour_bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete tour bookings" ON tour_bookings
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blog Posts
CREATE POLICY "Admins can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update blog posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete blog posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Gallery Items
CREATE POLICY "Admins can insert gallery items" ON gallery_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update gallery items" ON gallery_items
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete gallery items" ON gallery_items
  FOR DELETE USING (auth.role() = 'authenticated');

-- Events
CREATE POLICY "Admins can insert events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins can update events" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can delete events" ON events
  FOR DELETE USING (auth.role() = 'authenticated');
