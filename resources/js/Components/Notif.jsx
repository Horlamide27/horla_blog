import {toast as toastFn} from "react-hot-toast" ;

export default function Notif({toast, msg}) {
    return (
        <div
            className={`${
                toast.visible ? 'animate-enter' : 'animate-leave'
            } flex max-w-md w-full pointer-events-auto bg-green-200 shadow-lg text-black rounded-lg`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="ml-3 flex-1">
                        <p className="mt-1 text-sm">
                            {msg}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toastFn.dismiss(toast.id)}
                >
                    Close
                </button>
            </div>
        </div>
    )
}
