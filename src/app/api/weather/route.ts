import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      {message: "City  is required."},
      { status: 400 }
    );
  }

    const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "City not found." },
      { status: 404 }
    );
  }

  const data = await response.json();

  return NextResponse.json(data);

}