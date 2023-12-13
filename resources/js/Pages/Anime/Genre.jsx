export default function Genre({title, deleteGenre}) {
    return (
        <span
            className="inline-flex items-center justify-center rounded-full bg-green-100 px-2.5 py-0.5 text-yellow-700"
        >

  <p className="whitespace-nowrap text-sm">{title}</p>

            {deleteGenre && <button type="button" onClick={() => deleteGenre()}
                               className="-mr-1 ml-1.5 inline-block rounded-full bg-green-200 p-0.5 text-yello-600 transition hover:text-yello-700"
            >
                <span className="sr-only">Delete</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-3 w-3"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>}
</span>
    )
}
