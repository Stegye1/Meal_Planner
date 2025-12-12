type Props = React.InputHTMLAttributes<HTMLInputElement> & { 
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export function IngredientNameInput({ value, onChange, error, ...rest }: Props) {
  return (
    <div className="form-group">
      <label htmlFor="ingredient-name">Název ingredience</label>
      <input
        id="ingredient-name"
        type="text"
        required
        value={value || ""}
        onChange={(e) => {
          const normalized = e.target.value.toLowerCase();
          onChange?.(normalized); 
        }}
        className={`app-input ${error ? 'error' : ''}`}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}



// type Props = {
//   value: string;
//   onChange: (value: string) => void;
// };

// export function IngredientNameInput({ value, onChange, ...rest }: Props) {
//   return (
//     <div className="form-group">
//       <label htmlFor="ingredient-name">Název ingredience</label>
//       <input
//         id="ingredient-name"
//         type="text"
//         required
//         value={value}
//         onChange={(e) => {
//           const normalized = e.target.value.toLowerCase();
//           onChange(normalized);
//         }}
//         className="app-input"
//         {...rest}
//       />
//     </div>
//   );
// }
