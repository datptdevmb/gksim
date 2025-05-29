
export default function FormFooterButton({ title = "Xác nhận" }) {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-3 px-4 shadow-lg">
            <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-b from-[#9B000A] to-[#E7202D] text-white font-semibold"
            >
                {title}
            </button>
        </div>
    );
}
