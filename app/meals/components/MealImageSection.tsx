import Image from "next/image";

type Props = { pictureUrl: string | null; onUpload: (file: File) => Promise<void> };

export function MealImageSection({ pictureUrl, onUpload }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <>
      {pictureUrl && (
        <div className="image-wrapper">
          <Image src={pictureUrl} alt="Náhled" width={500} height={400} className="image" />
        </div>
      )}
      <div className="form-group">
        <label htmlFor="meal-image">Obrázek (volitelné)</label>
        <input id="meal-image" type="file" accept="image/*" onChange={handleChange} className="app-input" />
      </div>
    </>
  );
}
