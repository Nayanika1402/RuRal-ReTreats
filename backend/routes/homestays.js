const express = require('express');
const router = express.Router();

// Sample homestay data (replace with database in production)
const homestays = [
    {
        id: 1,
        name: "Traditional Haveli in Rajasthan",
        location: "Rajasthan",
        price: 2500,
        bedrooms: 3,
        rating: 4.8,
        status: "available",
        amenities: ["Organic Farm", "Home-Cooked Meals", "WiFi", "Horse Riding", "Free Parking", "Air Conditioning"],
        details: {
            bathrooms: 3,
            sqft: 2000,
            description: "Experience royal luxury in this heritage haveli"
        },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f0/sri-lanka-cultural-triangle.jpg?w=700&h=500&s=1"
    },
    {
        id: 2,
        name: "Cozy Cottage in Kerala",
        location: "Kerala",
        price: 1800,
        bedrooms: 2,
        rating: 4.6,
        status: "available",
        amenities: ["Lake View", "Traditional Food", "WiFi", "Ayurvedic Spa", "Garden", "Air Conditioning"],
        details: {
            bathrooms: 2,
            sqft: 1200,
            description: "Peaceful cottage amidst backwaters"
        },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fe/ac/kerala.jpg?w=700&h=500&s=1"
    },
    {
        id: 3,
        name: "Mountain Retreat in Himachal",
        location: "Himachal Pradesh",
        price: 4000,
        bedrooms: 4,
        rating: 4.9,
        status: "available",
        amenities: ["Mountain View", "Bonfire", "WiFi", "Trekking", "Free Parking", "Heater"],
        details: {
            bathrooms: 4,
            sqft: 2500,
            description: "Luxury retreat with stunning mountain views"
        },
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/98/f7/df/chail-palace-hp.jpg?w=700&h=500&s=1"
    }
];

// GET /api/homestays - Get all homestays
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            data: homestays
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
});

// GET /api/homestays/search - Search homestays with filters
router.get('/search', (req, res) => {
    try {
        const {
            query,
            location,
            minPrice,
            maxPrice,
            bedrooms,
            rating,
            status
        } = req.query;

        let filteredHomestays = [...homestays];

        // Apply filters
        if (query) {
            const searchQuery = query.toLowerCase();
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.name.toLowerCase().includes(searchQuery) ||
                homestay.location.toLowerCase().includes(searchQuery) ||
                homestay.amenities.some(amenity => amenity.toLowerCase().includes(searchQuery))
            );
        }

        if (location && location !== 'all') {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.location === location
            );
        }

        if (minPrice) {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.price >= parseInt(minPrice)
            );
        }

        if (maxPrice) {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.price <= parseInt(maxPrice)
            );
        }

        if (bedrooms && bedrooms !== 'all') {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.bedrooms === parseInt(bedrooms)
            );
        }

        if (rating && rating !== 'all') {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.rating >= parseFloat(rating)
            );
        }

        if (status && status !== 'all') {
            filteredHomestays = filteredHomestays.filter(homestay =>
                homestay.status === status
            );
        }

        res.json({
            success: true,
            data: filteredHomestays
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
});

module.exports = router;