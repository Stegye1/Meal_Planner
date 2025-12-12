import Image from "next/image";
import Link from "next/link";
import { Id } from "@/convex/_generated/dataModel";
import { useGetImageUrlDB } from "@/lib/db/images/use-get-image-url-db";
import { Meal } from "@/types";

type Props = {
  meal: Meal;
};

export function MealCard({ meal }: Props) {
  const storageId = meal?.pictureStorageId as Id<"_storage">;
  const imageUrl = useGetImageUrlDB(storageId);

  return (
    <Link href={`/meals/${meal._id}`} className="meal-card">
      {imageUrl ? (
        <Image src={imageUrl} alt={meal.name} className="meal-img" width={400} height={300} />
      ) : (
        <div className="meal-img-empty">Chybí obrázek</div>
      )}

      <h3 className="meal-title">{meal.name}</h3>
    </Link>
  );
}
