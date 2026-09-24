-- ============================================
-- Reset (drop in dependency order)
-- ============================================
DROP TABLE IF EXISTS project_categories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS service_project;
DROP TABLE IF EXISTS organization;

-- ============================================
-- Organization Table
-- ============================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO public.organizations (org_name, description, contact_email) VALUES
    ('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org'),
    ('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org'),
    ('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org'),
    ('Riverside Literacy Alliance', 'Provides free tutoring and adult literacy programs across the metro area.', 'info@riversideliteracy.org'),
    ('Hands That Heal Health Corps', 'Organizes free community health screenings and wellness workshops.', 'contact@handsthatheal.org'),
    ('Second Chance Shelter Network', 'Coordinates shelter, meals, and transitional services for unhoused individuals.', 'info@secondchanceshelter.org'),
    ('Coastal Cleanup Coalition', 'Runs beach and waterway cleanup events and marine conservation education.', 'hello@coastalcleanup.org'),
    ('Youth Rise Mentorship', 'Pairs at-risk youth with mentors for academic and career guidance.', 'contact@youthrise.org'),
    ('Golden Years Companionship', 'Connects volunteers with isolated seniors for regular visits and support.', 'info@goldenyears.org'),
    ('Paws & Purpose Animal Rescue', 'Rescues and rehomes abandoned animals while running pet-care education programs.', 'hello@pawsandpurpose.org'),
    ('Bridges to Employment', 'Offers job-readiness training and resume workshops for the underemployed.', 'contact@bridgestoemployment.org'),
    ('Community Harvest Kitchen', 'Prepares and delivers meals to families experiencing food insecurity.', 'info@communityharvest.org'),
    ('Safe Haven Family Services', 'Supports families affected by domestic hardship with counseling and resources.', 'hello@safehavenfamily.org'),
    ('Tech Bridge for Seniors', 'Teaches older adults digital literacy and safe internet use.', 'contact@techbridge.org'),
    ('Green Roots Reforestation', 'Leads tree-planting and habitat restoration projects in urban and rural areas.', 'info@greenroots.org');

-- ============================================
-- Service_Project Table
-- ============================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150) NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES
    (1, 'Community Park Rebuild', 'Volunteers help rebuild playground equipment and repaint fencing at a local park.', 'Riverside Park', '2026-10-03'),
    (2, 'Urban Garden Planting Day', 'A hands-on day planting vegetables and herbs in the neighborhood community garden.', 'Fifth Street Community Garden', '2026-10-17'),
    (3, 'Weekend Food Drive', 'Sort and distribute donated food items to families in need across the city.', 'UnityServe Warehouse', '2026-11-07'),
    (4, 'Weekend Reading Program', 'Read with elementary students at the public library to support early literacy skills.', 'Downtown Public Library', '2026-10-10'),
    (5, 'Free Health Screening Day', 'Assist medical volunteers with blood pressure and glucose screening stations.', 'Community Recreation Center', '2026-10-24'),
    (6, 'Winter Coat Drive', 'Sort and distribute donated winter coats to families in need before the cold season arrives.', 'Second Chance Shelter', '2026-11-14'),
    (7, 'Beach Cleanup Morning', 'Collect litter and debris along the shoreline to protect marine habitats.', 'Sunset Bay Beach', '2026-10-31'),
    (8, 'Career Mentorship Circle', 'Meet weekly with paired youth mentees to discuss goals and career paths.', 'Youth Rise Center', '2026-11-01'),
    (9, 'Senior Center Tech Help', 'Assist seniors with smartphones, video calls, and basic computer skills at the local senior center.', 'Golden Years Senior Center', '2026-11-08'),
    (10, 'Shelter Adoption Fair', 'Help run an adoption event to find homes for rescued cats and dogs.', 'Paws & Purpose Shelter', '2026-10-18'),
    (11, 'Resume Workshop Night', 'Guide job seekers through resume building and mock interviews.', 'Bridges Community Hall', '2026-11-05'),
    (12, 'Community Meal Prep', 'Cook and package meals for delivery to families facing food insecurity.', 'Community Harvest Kitchen', '2026-10-25'),
    (13, 'Family Support Supply Drive', 'Collect and organize hygiene and household supplies for families in crisis.', 'Safe Haven Family Center', '2026-11-12'),
    (14, 'Digital Literacy Class', 'Teach a beginner class on email, video calls, and online safety for older adults.', 'Tech Bridge Learning Lab', '2026-10-29'),
    (15, 'Community Tree Planting', 'Plant native trees along the riverbank to restore local habitat.', 'Green Roots Nursery Site', '2026-11-15');

-- ============================================
-- Categories Table
-- ============================================
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categories (name) VALUES
    ('Education'),
    ('Environment'),
    ('Community Support'),
    ('Health & Wellness'),
    ('Youth Development');

-- ============================================
-- Project-Categories Join Table (many-to-many)
-- ============================================
CREATE TABLE project_categories (
    project_id INT NOT NULL REFERENCES service_project(project_id) ON DELETE CASCADE,
    category_id INT NOT NULL REFERENCES categories(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

-- Category IDs: 1=Education, 2=Environment, 3=Community Support, 4=Health & Wellness, 5=Youth Development
INSERT INTO project_categories (project_id, category_id) VALUES
    (1, 2), (1, 3),
    (2, 2),
    (3, 3),
    (4, 1), (4, 5),
    (5, 4),
    (6, 3),
    (7, 2),
    (8, 5), (8, 1),
    (9, 4), (9, 3),
    (10, 3),
    (11, 5), (11, 1),
    (12, 3), (12, 4),
    (13, 3),
    (14, 1), (14, 4),
    (15, 2);