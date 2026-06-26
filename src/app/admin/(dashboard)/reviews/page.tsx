import { ReviewsManager } from "@/components/admin/ReviewsManager";
import { getAllReviews } from "@/lib/queries";

export default function AdminReviewsPage() {
  const reviews = getAllReviews();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Отзывы 2ГИС</h1>
      <p className="mt-1 text-zinc-500">
        Управление отзывами на главной странице
      </p>
      <div className="mt-8">
        <ReviewsManager reviews={reviews} />
      </div>
    </div>
  );
}
