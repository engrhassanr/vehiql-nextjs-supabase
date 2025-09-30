const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const sampleCars = [
  {
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: 28500.0,
    mileage: 15000,
    color: "Silver",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Well-maintained Honda Civic with excellent fuel economy and modern features. Perfect for daily commuting and weekend adventures.",
    status: "AVAILABLE",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Toyota",
    model: "Camry",
    year: 2022,
    price: 32000.0,
    mileage: 22000,
    color: "White",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Reliable Toyota Camry with premium interior and advanced safety features. Great family car with excellent resale value.",
    status: "AVAILABLE",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 65000.0,
    mileage: 8500,
    color: "Black",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "SUV",
    seats: 7,
    description:
      "Luxury BMW X5 with premium leather interior, panoramic sunroof, and advanced driver assistance systems. Perfect for both city and highway driving.",
    status: "AVAILABLE",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Ford",
    model: "F-150",
    year: 2022,
    price: 45000.0,
    mileage: 18000,
    color: "Blue",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Truck",
    seats: 5,
    description:
      "Powerful Ford F-150 with towing capacity and off-road capabilities. Ideal for work and recreational activities.",
    status: "AVAILABLE",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Hyundai",
    model: "Elantra",
    year: 2023,
    price: 24500.0,
    mileage: 12000,
    color: "Red",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Stylish Hyundai Elantra with modern design and comprehensive warranty. Great value for money with excellent fuel efficiency.",
    status: "AVAILABLE",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000.0,
    mileage: 8000,
    color: "White",
    fuelType: "Electric",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Electric Tesla Model 3 with autopilot features and supercharging capability. Zero emissions and cutting-edge technology.",
    status: "AVAILABLE",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Mercedes-Benz",
    model: "C-Class",
    year: 2022,
    price: 55000.0,
    mileage: 16000,
    color: "Silver",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Luxury Mercedes-Benz C-Class with premium amenities and superior craftsmanship. Experience German engineering at its finest.",
    status: "AVAILABLE",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Subaru",
    model: "Outback",
    year: 2023,
    price: 38000.0,
    mileage: 10000,
    color: "Green",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "SUV",
    seats: 5,
    description:
      "Adventure-ready Subaru Outback with all-wheel drive and generous cargo space. Perfect for outdoor enthusiasts and families.",
    status: "AVAILABLE",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Audi",
    model: "A4",
    year: 2023,
    price: 48000.0,
    mileage: 7500,
    color: "Black",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Premium Audi A4 with quattro all-wheel drive and advanced infotainment system. Sporty performance meets luxury comfort.",
    status: "AVAILABLE",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop",
    ],
  },
  {
    make: "Nissan",
    model: "Altima",
    year: 2022,
    price: 28000.0,
    mileage: 20000,
    color: "Gray",
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    seats: 5,
    description:
      "Reliable Nissan Altima with comfortable ride and good fuel economy. Well-maintained with service records available.",
    status: "AVAILABLE",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop",
    ],
  },
];

async function seedCars() {
  try {
    console.log("Starting to seed cars...");

    // Clear existing cars (optional - remove this if you want to keep existing data)
    await prisma.car.deleteMany({});
    console.log("Cleared existing cars");

    // Insert sample cars
    for (const carData of sampleCars) {
      await prisma.car.create({
        data: carData,
      });
      console.log(`Added ${carData.year} ${carData.make} ${carData.model}`);
    }

    console.log(`Successfully seeded ${sampleCars.length} cars!`);
  } catch (error) {
    console.error("Error seeding cars:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCars();
