import type { Size } from "@/interfaces"
import clsx from "clsx";

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];
    onSizeSelector: ( size:Size ) => void
}


const SizeSelector = ({ selectedSize, availableSizes, onSizeSelector}:Props) => {
  return (
    <div className="my-">
        <h3 className="font-bold mb-4">Talles disponibles</h3>

        <div className="flex">
        {
            availableSizes?.map( size =>
            <button key={size}
                    className={
                        clsx("mx-2 hover:underline text-lg",
                            {
                            'underline': size === selectedSize
                            }
                        )
                    }
                    onClick={() => onSizeSelector(size)}
            >
                {size}
            </button>
            )
        }
        </div>
    </div>
  )
}

export default SizeSelector