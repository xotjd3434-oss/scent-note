import { Minus, Plus } from "lucide-react";
function QuantityControl({ value, onChange, label }) {
  return (
    <div className="quantity-control" role="group" aria-label={`${label} 수량`}>
      <button
        type="button"
        aria-label={`${label} 수량 줄이기`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={15} />
      </button>
      <output aria-label={`${label} 선택 수량`}>{value}</output>
      <button
        type="button"
        aria-label={`${label} 수량 늘리기`}
        disabled={value >= 99}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
export default QuantityControl;
