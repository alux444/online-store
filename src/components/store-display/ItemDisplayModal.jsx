import { useRef, useState } from "react";
import { Modal } from "@mui/material";
import useOutsideClick from "../../utils/useOutsideClose";
import useEditCart from "../../utils/useEditCart";
import image from "../../utils/noImage.svg";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ItemDisplayModal = ({ open, close, item }) => {
    const modalRef = useRef(null);
    useOutsideClick(modalRef, close);
    const { addToCart } = useEditCart();

    const [count, setCount] = useState(1);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const addCountToCart = () => {
        addToCart(item, count);
        close();
    };

    const salePrice = item.price - item.discount;
    const overallCost = count * (item.onSale ? salePrice : item.price);

    return (
        <Modal open={open}>
            <div className="w-screen h-screen flex align-center justify-center text-center items-center">
                <div
                    className="border-2 border-blue border-solid h-[min-content] bg-blue-50 p-3 rounded-[40px] max-w-[75vw] max-h-[90vh]  flex text-center items-center flex-col overflow-auto"
                    ref={modalRef}
                >
                    <div className="flex flex-wrap max-w-[100%]">
                        <h2 className="price max-w-[100%] break-words">
                            {item.name}
                        </h2>
                    </div>
                    <div className="align-center flex flex-col justify-center items-center">
                        <img
                            src={item.imageUrl == "" ? image : item.imageUrl}
                            className="max-h-[50vh] max-w-[50vw] min-h-[20vh]"
                        />
                    </div>
                    <h2 className="text-lg price mt-3">
                        ${item.onSale ? salePrice : item.price}/ea
                    </h2>
                    <br />
                    <div className="w-[90%] flex flex-wrap justify-center align-center items-center">
                        <p>{item.description}</p>
                    </div>
                    <br />
                    {item.stock == 0 ? (
                        <p className="price">No Stock Avaliable.</p>
                    ) : (
                        <>
                            <div className="flex gap-3 items-center justify-center">
                                <button
                                    className="altbutton rounded-[50%]"
                                    onClick={decrementCount}
                                >
                                    <RemoveIcon />
                                </button>
                                <p className="price">{count}</p>
                                <button
                                    className="altbutton"
                                    onClick={incrementCount}
                                >
                                    <AddIcon />
                                </button>
                            </div>
                            <br />
                            <h4>
                                {count} {item.name} : ${overallCost}
                            </h4>
                            <br />
                            <button
                                className="altbutton"
                                onClick={addCountToCart}
                            >
                                Add to Cart!
                            </button>
                        </>
                    )}
                </div>{" "}
            </div>
        </Modal>
    );
};

export default ItemDisplayModal;
