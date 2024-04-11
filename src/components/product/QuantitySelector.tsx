"use client"
import { IoIosRemoveCircleOutline, IoIosAddCircleOutline } from "react-icons/io";

interface Props {
  quantity: number;
  onQuantitySelector: ( quantity:number ) => void
}

const QuantitySelector = ({ quantity, onQuantitySelector }: Props) => {

  const onQuantityChanged = ( value:number ) => {
    if(quantity + value < 1 ) return;
    onQuantitySelector(quantity + value)
  }

  return (
    <div className="flex mt-3">
      <button>
        <IoIosRemoveCircleOutline size={30} onClick={() => onQuantityChanged(-1)} />
      </button>
      
      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{quantity}</span>
      
      <button>
        <IoIosAddCircleOutline size={30} onClick={() => onQuantityChanged(+1)}/>
      </button>
    </div>
  )
}

export default QuantitySelector