import React from "react";

interface PropsButtonLike {
    realizarLike: () => {};
}

const ButtonLike: React.FC<PropsButtonLike> = ({realizarLike}) => {

    return (
        <>
            <br/>
            <button onClick={realizarLike}>
                <img
                    src="https://uxwing.com/wp-content/themes/uxwing/download/hand-gestures/like-button-icon.png"
                    alt="Like"
                    width={30}
                    height={30}
                />
            </button>

        </>
    );
}

export default ButtonLike;