export default function AnimeShow({anime}) {
    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-lg font-bold text-red-600 sm:text-2xl">
                    {anime.title}
                </h1>
                <div className="mt-6 mb-0 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <div>
                        <img src={anime.cover} alt={anime.title}/>
                    </div>
                    <div>
                        <p>{anime.about}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
