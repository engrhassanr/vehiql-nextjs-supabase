"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase";
import CarCard from "@/components/car-card";

export const dynamic = "force-dynamic";

export default async function SupabaseCarsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("Car")
    .select(
      "id, make, model, year, price, mileage, color, fuel_type:fuelType, transmission, body_type:bodyType, images, description, status, featured"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-2xl font-semibold mb-4">Supabase Cars</h1>
        <p className="text-red-600">Failed to fetch cars: {error.message}</p>
      </div>
    );
  }

  const cars = (data || []).map((c) => ({
    id: c.id,
    make: c.make,
    model: c.model,
    year: c.year,
    price: c.price,
    mileage: c.mileage,
    color: c.color,
    fuelType: c.fuel_type ?? c.fuelType,
    transmission: c.transmission,
    bodyType: c.body_type ?? c.bodyType,
    images: Array.isArray(c.images) ? c.images : [],
    description: c.description,
    status: c.status,
    featured: c.featured,
  }));

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Supabase Cars</h1>
      {cars.length === 0 ? (
        <p className="text-gray-600">No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
