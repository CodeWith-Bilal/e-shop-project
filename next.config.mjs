/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        MONGO_URL:"mongodb+srv://Next-Project:Next-Project@cluster0.tkq4r79.mongodb.net/Next-Project",
        PUBLISHABLE_KEY:"pk_test_51OdJ8gJCt4TuEQYMEcBl2N4t0YhtecrxTP6gKlNfZc130FQqhxdA7OWcFpvE48B5F1OPkQZ3KMdQQ7S78BFGLdQX00qRUKTW41",
        STRIPE_SECRET_KEY:"sk_test_51OdJ8gJCt4TuEQYMCFD20khX9wz9gUsF4qv4xuLnsaNdMAS3BHTKXab6iaJmXKkWibx1bh8WjnkhqTeFZumZof9M00cyzCCID6",
        API_KEY: "AIzaSyBwEg20StyFt2Q0cKXE2n3EwxUZFRmOy5Y",
        AUTH_DOMAIN: "next-project-fbf0f.firebaseapp.com",
        PROJECT_ID: "next-project-fbf0f",
        STORAGE_BUCKET: "next-project-fbf0f.appspot.com",
        MESSINGING_SENDER_ID: "108052661112",
        APP_ID: "1:108052661112:web:5354a6a9a83099672b3e8d",
        MEASUREMENT_ID: "G-L81Y8WNSKL",
        FIREBASE_STORAGE_URL:"gs://next-project-fbf0f.appspot.com"
    },
    images: {
        domains: ['firebasestorage.googleapis.com','images.unsplash.com'],
      }
};

export default nextConfig;
