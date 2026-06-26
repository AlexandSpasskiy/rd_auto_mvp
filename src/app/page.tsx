import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Pricing } from "@/components/landing/Pricing";
import { BookingForm } from "@/components/landing/BookingForm";
import { ReviewsSlider } from "@/components/landing/ReviewsSlider";
import { Contacts } from "@/components/landing/Contacts";
import { Footer } from "@/components/landing/Footer";
import { getPublicReviews } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const reviews = getPublicReviews();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <BookingForm />
        <ReviewsSlider reviews={reviews} />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
