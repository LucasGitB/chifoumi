import "./ActionGameButton.css";

const background = "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNDIybXp5amZoMjN0dWgyamRqYTY0amZpZ215cHFpMTFhZXd3M3dmciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fSRQtBAzrPokPCItuu/giphy.gif";

function ActionGameButton({ image, altText, color }) {
  return (
    <>
      <div className="flex">
        <div
          className="flex flex-col items-center justify-center bg-blue-200 py-25 px-5 rounded-2xl border-5 border-white shadow-lg w-40 h-65 relative overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("${background}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          ></div>

          <div
            className="absolute inset-0"
            style={{
              backgroundColor: color,
              zIndex: 1,
            }}
          ></div>

          <img
            className="scale-50 object-contain relative z-10"
            src={image}
            alt={altText}
          />
        </div>
      </div>
    </>
  );
}

export default ActionGameButton;
